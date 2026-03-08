/**
 * 交互式中国地图控制器
 *
 * 功能：
 * - 渲染ECharts中国地图
 * - 处理省份点击事件
 * - 切换数据维度
 * - 切换年份
 */

class ChinaMapController {
    constructor() {
        this.mapChart = null;
        this.currentDimension = 'ev_ownership'; // 默认数据维度
        this.currentYear = '2026'; // 默认年份
        this.selectedProvince = null;

        // 数据维度配置
        this.dimensions = {
            'ev_ownership': { name: '新能源汽车保有量', unit: '万辆', colorStart: '#E3F2FD', colorEnd: '#1565C0' },
            'charging_stations': { name: '超充站数量', unit: '座', colorStart: '#FFF8E1', colorEnd: '#FF8F00' },
            'charging_supply_demand': { name: '超充设备供需比', unit: '%', colorStart: '#FFF3E0', colorEnd: '#FF6F00' },
            'chip_supply_demand': { name: '芯片供需比', unit: '%', colorStart: '#F3E5F5', colorEnd: '#8E24AA' },
            'server_supply_demand': { name: '服务器供需比', unit: '%', colorStart: '#E0F7FA', colorEnd: '#0097A7' },
            'computing_centers': { name: '算力中心数量', unit: '个', colorStart: '#E8F5E9', colorEnd: '#388E3C' },
            'huawei_dealers': { name: '华为授权商', unit: '家', colorStart: '#FFEBEE', colorEnd: '#D32F2F' }
        };

        // 省份名称映射（ECharts使用标准名称）
        this.provinceMapping = {
            '广东': '广东', '江苏': '江苏', '浙江': '浙江', '上海': '上海',
            '北京': '北京', '山东': '山东', '河南': '河南', '四川': '四川',
            '安徽': '安徽', '福建': '福建', '湖南': '湖南', '湖北': '湖北',
            '河北': '河北', '陕西': '陕西', '广西': '广西', '江西': '江西',
            '重庆': '重庆', '云南': '云南', '辽宁': '辽宁', '山西': '山西',
            '贵州': '贵州', '吉林': '吉林', '黑龙江': '黑龙江', '内蒙古': '内蒙古',
            '天津': '天津', '新疆': '新疆', '甘肃': '甘肃', '海南': '海南',
            '宁夏': '宁夏', '青海': '青海', '西藏': '西藏'
        };
    }

    /**
     * 初始化地图
     */
    init() {
        if (typeof echarts === 'undefined') {
            console.error('ECharts库未加载');
            return;
        }

        // 等待中国地图数据加载完成
        if (echarts.getMap('china')) {
            // 地图已注册，直接初始化
            this.initializeMap();
        } else {
            // 监听地图加载完成事件
            console.log('等待中国地图数据加载...');
            document.addEventListener('chinaMapLoaded', () => {
                this.initializeMap();
            });

            // 备用方案：5秒后超时重试
            setTimeout(() => {
                if (!this.mapChart && echarts.getMap('china')) {
                    this.initializeMap();
                }
            }, 5000);
        }
    }

    /**
     * 初始化地图实例
     */
    initializeMap() {
        this.mapChart = echarts.init(document.getElementById('chinaMap'));

        // 绑定事件
        this.bindEvents();

        // 渲染地图
        this.renderMap();

        // 响应式调整
        window.addEventListener('resize', () => {
            this.mapChart && this.mapChart.resize();
        });

        console.log('✓ 地图控制器初始化完成');
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 数据维度切换
        const dimensionSelect = document.getElementById('dimension-select');
        if (dimensionSelect) {
            dimensionSelect.addEventListener('change', (e) => {
                this.switchDimension(e.target.value);
            });
        }

        // 年份切换
        const yearSelect = document.getElementById('year-select');
        if (yearSelect) {
            yearSelect.addEventListener('change', (e) => {
                this.switchYear(e.target.value);
            });
        }

        // 重置按钮
        const resetBtn = document.getElementById('reset-map');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.reset();
            });
        }

        // 监听地图点击事件
        this.mapChart.on('click', (params) => {
            if (params.componentType === 'series' && params.componentSubType === 'map') {
                this.handleProvinceClick(params.name);
            }
        });
    }

    /**
     * 格式化数值显示
     */
    formatValue(value, unit) {
        if (value >= 100000000) {
            return (value / 100000000).toFixed(1) + '亿' + unit;
        } else if (value >= 10000) {
            return (value / 10000).toFixed(1) + '万' + unit;
        } else {
            return value + unit;
        }
    }

    /**
     * 渲染地图
     */
    renderMap() {
        if (!this.mapChart) return;

        const data = this.prepareMapData();
        const dimensionInfo = this.dimensions[this.currentDimension];
        const currentDimension = this.currentDimension;

        // 保存当前维度引用，用于formatter
        const self = this;

        const option = {
            backgroundColor: 'transparent',
            title: {
                show: false
            },
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    if (params.data) {
                        const dimensionName = dimensionInfo.name;
                        const unit = dimensionInfo.unit;
                        const value = params.data.value;
                        return `${params.name}<br/>${dimensionName}：<strong style="color: #D4AF37">${value}</strong> ${unit}`;
                    }
                    return params.name;
                },
                backgroundColor: 'rgba(26, 26, 26, 0.95)',
                borderColor: '#D4AF37',
                borderWidth: 1,
                textStyle: {
                    color: '#F5F0E6',
                    fontSize: 14
                }
            },
            visualMap: {
                min: 0,
                max: this.calculateMaxValue(),
                text: ['高', '低'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: [dimensionInfo.colorStart, dimensionInfo.colorEnd]
                },
                textStyle: {
                    color: '#F5F0E6'
                },
                left: 'left',
                bottom: '5%',
                orient: 'horizontal'
            },
            series: [{
                name: dimensionInfo.name,
                type: 'map',
                map: 'china',
                roam: false, // 禁用缩放和平移
                scaleLimit: { min: 1, max: 1 },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(212, 175, 55, 0.5)',
                        borderWidth: 1
                    },
                    emphasis: {
                        borderColor: '#D4AF37',
                        borderWidth: 2,
                        shadowBlur: 10,
                        shadowColor: 'rgba(212, 175, 55, 0.5)'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        fontSize: 11,
                        color: '#1A1A1A',
                        formatter: function(params) {
                            if (params.data && params.data.value > 0) {
                                const value = params.data.value;
                                const unit = dimensionInfo.unit;
                                const formattedValue = self.formatValue(value, unit);
                                return `${params.name}\n${formattedValue}`;
                            }
                            return params.name;
                        }
                    },
                    emphasis: {
                        show: true,
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: '#D4AF37'
                    }
                },
                data: data,
                emphasis: {
                    itemStyle: {
                        areaColor: '#D4AF37'
                    }
                },
                select: {
                    itemStyle: {
                        areaColor: '#2196F3'
                    }
                }
            }]
        };

        this.mapChart.setOption(option);
    }

    /**
     * 准备地图数据
     */
    prepareMapData() {
        const yearData = chinaMarketData[this.currentYear];
        const dimensionData = yearData[this.getDimensionName()];

        return Object.keys(dimensionData).map(province => ({
            name: province,
            value: dimensionData[province]
        }));
    }

    /**
     * 获取数据维度的中文名称
     */
    getDimensionName() {
        const mapping = {
            'ev_ownership': '新能源汽车保有量',
            'charging_stations': '超充站数量',
            'charging_supply_demand': '超充设备供需比',
            'chip_supply_demand': '芯片供需比',
            'server_supply_demand': '服务器供需比',
            'computing_centers': '算力中心数量',
            'huawei_dealers': '华为授权商'
        };
        return mapping[this.currentDimension];
    }

    /**
     * 计算最大值（用于visualMap）
     */
    calculateMaxValue() {
        const yearData = chinaMarketData[this.currentYear];
        const dimensionData = yearData[this.getDimensionName()];
        const values = Object.values(dimensionData);
        return Math.max(...values);
    }

    /**
     * 处理省份点击事件
     */
    handleProvinceClick(provinceName) {
        this.selectedProvince = provinceName;

        console.log(`选中省份：${provinceName}，数据维度：${this.currentDimension}`);

        // 触发内容切换事件
        this.triggerContentSwitch(provinceName, this.currentDimension);

        // 高亮选中省份
        this.mapChart.dispatchAction({
            type: 'mapSelect',
            name: provinceName
        });
    }

    /**
     * 触发内容切换事件
     */
    triggerContentSwitch(province, dimension) {
        // 创建自定义事件
        const event = new CustomEvent('mapProvinceSelected', {
            detail: {
                province: province,
                dimension: dimension,
                dimensionInfo: this.dimensions[dimension]
            }
        });

        document.dispatchEvent(event);
    }

    /**
     * 切换数据维度
     */
    switchDimension(dimension) {
        this.currentDimension = dimension;
        this.selectedProvince = null;

        console.log(`切换数据维度：${this.dimensions[dimension].name}`);

        this.renderMap();
    }

    /**
     * 切换年份
     */
    switchYear(year) {
        this.currentYear = year;
        this.selectedProvince = null;

        console.log(`切换年份：${year}`);

        this.renderMap();
    }

    /**
     * 重置地图
     */
    reset() {
        this.currentDimension = 'ev_ownership';
        this.currentYear = '2026';
        this.selectedProvince = null;

        // 重置下拉框
        const dimensionSelect = document.getElementById('dimension-select');
        const yearSelect = document.getElementById('year-select');

        if (dimensionSelect) dimensionSelect.value = 'ev_ownership';
        if (yearSelect) yearSelect.value = '2026';

        // 触发返回默认内容事件
        const event = new CustomEvent('mapReset');
        document.dispatchEvent(event);

        this.renderMap();

        console.log('地图已重置');
    }
}

// 初始化地图控制器
document.addEventListener('DOMContentLoaded', () => {
    window.mapController = new ChinaMapController();
    window.mapController.init();
});
