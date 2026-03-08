/**
 * 服务器组装厂项目 - ECharts配置文件
 * 玄金水墨主题定制
 * 版本：V1.0
 * 创建日期：2025年
 */

// 玄金水墨主题配置
const inkGoldTheme = {
    // 颜色系列
    color: [
        '#D4AF37',  // 主金色
        '#1A1A1A',  // 墨黑色
        '#F5F5DC',  // 米白色
        '#8B7355',  // 古铜色
        '#CD853F',  // 秘鲁色
        '#DAA520',  // 金麒麟色
        '#B8860B',  // 暗金色
        '#2C3E50'   // 深蓝灰
    ],

    // 背景色
    backgroundColor: 'rgba(26, 26, 26, 0.95)',

    // 文本样式
    textStyle: {
        fontFamily: 'Arial, "Microsoft YaHei", sans-serif',
        fontSize: 14,
        color: '#F5F5DC'
    },

    // 标题样式
    title: {
        textStyle: {
            color: '#D4AF37',
            fontSize: 24,
            fontWeight: 'bold'
        },
        subtextStyle: {
            color: '#F5F5DC',
            fontSize: 16
        }
    },

    // 图例样式
    legend: {
        textStyle: {
            color: '#F5F5DC'
        },
        inactiveColor: 'rgba(245, 245, 220, 0.3)'
    },

    // 坐标轴样式
    categoryAxis: {
        axisLine: {
            lineStyle: {
                color: '#D4AF37'
            }
        },
        axisTick: {
            lineStyle: {
                color: '#D4AF37'
            }
        },
        axisLabel: {
            color: '#F5F5DC',
            fontSize: 12
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(212, 175, 55, 0.1)',
                type: 'dashed'
            }
        }
    },

    valueAxis: {
        axisLine: {
            lineStyle: {
                color: '#D4AF37'
            }
        },
        axisTick: {
            lineStyle: {
                color: '#D4AF37'
            }
        },
        axisLabel: {
            color: '#F5F5DC',
            fontSize: 12
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(212, 175, 55, 0.1)',
                type: 'dashed'
            }
        }
    },

    // 提示框样式
    tooltip: {
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        borderColor: '#D4AF37',
        borderWidth: 1,
        textStyle: {
            color: '#F5F5DC',
            fontSize: 14
        },
        axisPointer: {
            lineStyle: {
                color: '#D4AF37'
            },
            crossStyle: {
                color: '#D4AF37'
            }
        }
    },

    // 数据系列样式
    series: {
        bar: {
            itemStyle: {
                borderRadius: [4, 4, 0, 0],
                borderColor: '#D4AF37',
                borderWidth: 1
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(212, 175, 55, 0.5)'
                }
            }
        },
        line: {
            smooth: true,
            lineStyle: {
                width: 3,
                shadowColor: 'rgba(212, 175, 55, 0.3)',
                shadowBlur: 10
            },
            itemStyle: {
                borderWidth: 2,
                borderColor: '#D4AF37'
            },
            emphasis: {
                lineStyle: {
                    width: 4
                }
            }
        },
        pie: {
            itemStyle: {
                borderColor: '#1A1A1A',
                borderWidth: 2
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(212, 175, 55, 0.5)'
                }
            }
        }
    }
};

// 存储所有图表实例，用于统一管理响应式
const chartInstances = [];

// ECharts初始化函数（优化版）
function initInkGoldChart(chartId, option) {
    const chartDom = document.getElementById(chartId);
    if (!chartDom) {
        console.error('Chart element not found: ' + chartId);
        return null;
    }

    const myChart = echarts.init(chartDom, inkGoldTheme);
    myChart.setOption(option);

    // 将图表实例添加到数组中
    chartInstances.push(myChart);

    return myChart;
}

// 防抖函数 - 优化性能
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// 统一响应式处理函数（防抖优化）
const resizeCharts = debounce(function() {
    chartInstances.forEach(chart => {
        if (chart) {
            try {
                chart.resize();
            } catch (e) {
                console.error('Chart resize error:', e);
            }
        }
    });
}, 200);

// 监听窗口大小变化
window.addEventListener('resize', resizeCharts);

// 监听设备方向变化（移动端）
window.addEventListener('orientationchange', resizeCharts);

// 移动端适配优化
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 根据屏幕尺寸调整图表配置
function getResponsiveOption(option) {
    const screenWidth = window.innerWidth;

    // 移动端适配
    if (screenWidth < 768) {
        // 调整字体大小
        if (option.textStyle) {
            option.textStyle.fontSize = 12;
        }
        if (option.title) {
            if (option.title.textStyle) {
                option.title.textStyle.fontSize = 18;
            }
            if (option.title.subtextStyle) {
                option.title.subtextStyle.fontSize = 14;
            }
        }
        // 调整图例位置
        if (option.legend) {
            option.legend.orient = 'horizontal';
            option.legend.top = 'bottom';
        }
        // 调整边距
        if (option.grid) {
            option.grid.left = '5%';
            option.grid.right = '5%';
            option.grid.bottom = '15%';
        }
    }

    return option;
}

// 增强版初始化函数（带响应式配置）
function initInkGoldChartResponsive(chartId, option) {
    const chartDom = document.getElementById(chartId);
    if (!chartDom) {
        console.error('Chart element not found: ' + chartId);
        return null;
    }

    // 应用响应式配置
    const responsiveOption = getResponsiveOption(option);

    const myChart = echarts.init(chartDom, inkGoldTheme);
    myChart.setOption(responsiveOption);

    // 将图表实例添加到数组中
    chartInstances.push(myChart);

    return myChart;
}

// 常用图表模板

/**
 * 折线图 - 收入增长趋势
 */
function createRevenueChart(data) {
    return {
        title: {
            text: data.title || '营业收入增长预测',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}年<br/>{a}: {c}万元'
        },
        xAxis: {
            type: 'category',
            data: data.xAxis || ['第1年', '第2年', '第3年', '第4年', '第5年']
        },
        yAxis: {
            type: 'value',
            name: '营业收入（万元）',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [{
            name: '营业收入',
            type: 'line',
            data: data.series || [25000, 80000, 150000, 250000, 400000],
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(212, 175, 55, 0.3)'
                    }, {
                        offset: 1,
                        color: 'rgba(212, 175, 55, 0.05)'
                    }]
                }
            },
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            }
        }],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        }
    };
}

/**
 * 柱状图 - 市场份额对比
 */
function createMarketShareChart(data) {
    return {
        title: {
            text: data.title || '市场份额对比',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: data.xAxis || ['本公司', '浪潮信息', '中科曙光', '华为昇腾', '其他']
        },
        yAxis: {
            type: 'value',
            name: '市场份额（%）',
            max: data.max || 30
        },
        series: [{
            name: '市场份额',
            type: 'bar',
            data: data.series || [5, 22, 17, 12, 44],
            itemStyle: {
                color: function(params) {
                    const colors = ['#D4AF37', '#8B7355', '#CD853F', '#DAA520', '#2C3E50'];
                    return colors[params.dataIndex];
                }
            },
            label: {
                show: true,
                position: 'top',
                formatter: '{c}%'
            }
        }],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        }
    };
}

/**
 * 饼图 - 成本结构分析
 */
function createCostStructureChart(data) {
    return {
        title: {
            text: data.title || '成本结构分析',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}万元 ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 'middle'
        },
        series: [{
            name: '成本构成',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['60%', '50%'],
            data: data.series || [
                {value: 10500, name: 'GPU采购'},
                {value: 3500, name: '光模块'},
                {value: 2000, name: '其他组件'},
                {value: 3000, name: '组装测试'},
                {value: 1000, name: '包装物流'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(212, 175, 55, 0.5)'
                }
            },
            label: {
                formatter: '{b}\n{d}%'
            }
        }]
    };
}

/**
 * 雷达图 - SWOT分析
 */
function createSWOTRadarChart(data) {
    return {
        title: {
            text: data.title || 'SWOT竞争力分析',
            left: 'center'
        },
        tooltip: {},
        legend: {
            data: ['本公司', '行业平均'],
            top: 'bottom'
        },
        radar: {
            indicator: data.indicator || [
                {name: '供应链整合', max: 100},
                {name: '技术研发', max: 100},
                {name: '成本控制', max: 100},
                {name: '客户服务', max: 100},
                {name: '品牌影响力', max: 100},
                {name: '资金实力', max: 100}
            ],
            center: ['50%', '55%'],
            radius: '60%'
        },
        series: [{
            name: '竞争力评估',
            type: 'radar',
            data: data.series || [
                {
                    value: [90, 85, 88, 92, 70, 80],
                    name: '本公司',
                    areaStyle: {
                        color: 'rgba(212, 175, 55, 0.3)'
                    }
                },
                {
                    value: [75, 70, 65, 75, 80, 70],
                    name: '行业平均',
                    areaStyle: {
                        color: 'rgba(139, 115, 85, 0.3)'
                    }
                }
            ]
        }]
    };
}

/**
 * 仪表盘 - KPI指标
 */
function createKPIThreeGauge(data) {
    return {
        title: {
            text: data.title || '关键绩效指标',
            left: 'center'
        },
        series: [
            {
                type: 'gauge',
                center: ['20%', '55%'],
                radius: '60%',
                min: 0,
                max: data.max1 || 100,
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        width: 20,
                        color: [[0.3, '#67e0e3'], [0.7, '#D4AF37'], [1, '#fd666d']]
                    }
                },
                pointer: {
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    distance: -20,
                    length: 5,
                    lineStyle: {
                        color: '#fff',
                        width: 1
                    }
                },
                splitLine: {
                    distance: -20,
                    length: 20,
                    lineStyle: {
                        color: '#fff',
                        width: 2
                    }
                },
                axisLabel: {
                    color: 'auto',
                    distance: 30,
                    fontSize: 10
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}%',
                    color: 'auto',
                    fontSize: 16,
                    offsetCenter: [0, '70%']
                },
                data: [{value: data.value1 || 85, name: data.name1 || '毛利率'}]
            },
            {
                type: 'gauge',
                center: ['50%', '55%'],
                radius: '60%',
                min: 0,
                max: data.max2 || 100,
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        width: 20,
                        color: [[0.3, '#67e0e3'], [0.7, '#D4AF37'], [1, '#fd666d']]
                    }
                },
                pointer: {
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    distance: -20,
                    length: 5,
                    lineStyle: {
                        color: '#fff',
                        width: 1
                    }
                },
                splitLine: {
                    distance: -20,
                    length: 20,
                    lineStyle: {
                        color: '#fff',
                        width: 2
                    }
                },
                axisLabel: {
                    color: 'auto',
                    distance: 30,
                    fontSize: 10
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}%',
                    color: 'auto',
                    fontSize: 16,
                    offsetCenter: [0, '70%']
                },
                data: [{value: data.value2 || 92, name: data.name2 || '客户满意度'}]
            },
            {
                type: 'gauge',
                center: ['80%', '55%'],
                radius: '60%',
                min: 0,
                max: data.max3 || 100,
                splitNumber: 10,
                axisLine: {
                    lineStyle: {
                        width: 20,
                        color: [[0.3, '#67e0e3'], [0.7, '#D4AF37'], [1, '#fd666d']]
                    }
                },
                pointer: {
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    distance: -20,
                    length: 5,
                    lineStyle: {
                        color: '#fff',
                        width: 1
                    }
                },
                splitLine: {
                    distance: -20,
                    length: 20,
                    lineStyle: {
                        color: '#fff',
                        width: 2
                    }
                },
                axisLabel: {
                    color: 'auto',
                    distance: 30,
                    fontSize: 10
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}%',
                    color: 'auto',
                    fontSize: 16,
                    offsetCenter: [0, '70%']
                },
                data: [{value: data.value3 || 95, name: data.name3 || '良品率'}]
            }
        ]
    };
}

/**
 * 漏斗图 - 双轨变现模式
 */
function createFunnelChart(data) {
    return {
        title: {
            text: data.title || '双轨漏斗变现模式',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}万元'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '硬件产品漏斗',
                type: 'funnel',
                left: '10%',
                width: '35%',
                label: {
                    formatter: '{b}: {c}万元'
                },
                labelLine: {
                    show: true
                },
                data: data.series1 || [
                    {value: 150000, name: '全栈AI解决方案'},
                    {value: 100000, name: '核心硬件产品'},
                    {value: 50000, name: '零部件供应'}
                ]
            },
            {
                name: '软件服务漏斗',
                type: 'funnel',
                left: '55%',
                width: '35%',
                label: {
                    formatter: '{b}: {c}万元'
                },
                labelLine: {
                    show: true
                },
                data: data.series2 || [
                    {value: 50000, name: 'AI即服务(AIaaS)'},
                    {value: 33333, name: '软件授权'},
                    {value: 16667, name: '技术服务'}
                ]
            }
        ]
    };
}

console.log('ECharts配置文件已加载 - 玄金水墨主题');
