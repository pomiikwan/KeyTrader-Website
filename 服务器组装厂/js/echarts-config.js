/**
 * ECharts配置文件 - World Monitor主题
 * 版本：V2.0
 */

const worldMonitorTheme = {
    // 颜色系列 - 使用World Monitor配色
    color: [
        '#3b82f6',  // 信息蓝
        '#44ff88',  // 积极绿
        '#ff8800',  // 高级橙
        '#ff4444',  // 严重红
        '#a855f7',  // 紫色
        '#06b6d4',  // 青色
        '#eab308',  // 黄色
        '#f97316'   // 橙色
    ],

    // 背景色
    backgroundColor: 'rgba(20, 20, 20, 0.95)',

    // 文本样式
    textStyle: {
        fontFamily: 'SF Mono, Monaco, Cascadia Code, monospace',
        fontSize: 13,
        color: '#e8e8e8'
    },

    // 标题样式
    title: {
        textStyle: {
            color: '#e8e8e8',
            fontSize: 16,
            fontWeight: 'bold'
        },
        subtextStyle: {
            color: '#888',
            fontSize: 12
        }
    },

    // 图例样式
    legend: {
        textStyle: {
            color: '#ccc'
        },
        inactiveColor: 'rgba(136, 136, 136, 0.3)'
    },

    // 提示框样式
    tooltip: {
        backgroundColor: 'rgba(20, 20, 20, 0.95)',
        borderColor: '#2a2a2a',
        borderWidth: 1,
        textStyle: {
            color: '#e8e8e8',
            fontSize: 12
        }
    },

    // 坐标轴样式
    categoryAxis: {
        axisLine: {
            lineStyle: {
                color: '#2a2a2a'
            }
        },
        axisTick: {
            lineStyle: {
                color: '#2a2a2a'
            }
        },
        axisLabel: {
            color: '#888',
            fontSize: 11
        },
        splitLine: {
            lineStyle: {
                color: '#1a1a1a'
            }
        }
    },

    valueAxis: {
        axisLine: {
            lineStyle: {
                color: '#2a2a2a'
            }
        },
        axisTick: {
            lineStyle: {
                color: '#2a2a2a'
            }
        },
        axisLabel: {
            color: '#888',
            fontSize: 11
        },
        splitLine: {
            lineStyle: {
                color: '#1a1a1a'
            }
        }
    }
};

// 注册主题
if (typeof echarts !== 'undefined') {
    echarts.registerTheme('worldMonitor', worldMonitorTheme);
    console.log('✓ ECharts World Monitor主题已加载');
}

/**
 * 初始化图表（使用World Monitor主题）
 * @param {string} elementId - 图表容器DOM ID
 * @param {object} option - ECharts配置选项
 * @returns {object} ECharts实例
 */
function initInkGoldChart(elementId, option) {
    const chartDom = document.getElementById(elementId);
    if (!chartDom) {
        console.error(`图表容器未找到: ${elementId}`);
        return null;
    }

    const myChart = echarts.init(chartDom, 'worldMonitor');
    myChart.setOption(option);

    // 响应式调整
    window.addEventListener('resize', function() {
        myChart.resize();
    });

    return myChart;
}

/**
 * 创建收入增长图表配置
 * @param {object} params - {title, xAxis, series}
 * @returns {object} ECharts配置
 */
function createRevenueChart(params) {
    return {
        title: {
            text: params.title,
            left: 'center',
            textStyle: {
                fontSize: 14,
                color: '#e8e8e8'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: params.xAxis,
            axisLabel: {
                color: '#888'
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#888'
            },
            splitLine: {
                lineStyle: {
                    color: '#1a1a1a'
                }
            }
        },
        series: [{
            data: params.series,
            type: 'bar',
            itemStyle: {
                color: '#3b82f6'
            },
            areaStyle: {
                color: 'rgba(59, 130, 246, 0.3)'
            }
        }],
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%',
            top: '20%'
        }
    };
}

/**
 * 创建SWOT雷达图配置
 * @param {object} params - {title, indicator, series}
 * @returns {object} ECharts配置
 */
function createSWOTRadarChart(params) {
    return {
        title: {
            text: params.title,
            left: 'center',
            textStyle: {
                fontSize: 14,
                color: '#e8e8e8'
            }
        },
        tooltip: {},
        legend: {
            data: params.series.map(s => s.name),
            bottom: '5%',
            textStyle: {
                color: '#ccc'
            }
        },
        radar: {
            indicator: params.indicator,
            shape: 'polygon',
            axisName: {
                color: '#888'
            },
            splitLine: {
                lineStyle: {
                    color: '#1a1a1a'
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(42, 42, 42, 0.3)', 'rgba(26, 26, 26, 0.3)']
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#2a2a2a'
                }
            }
        },
        series: [{
            type: 'radar',
            data: params.series
        }]
    };
}

/**
 * 创建市场份额图表配置
 * @param {object} params - {title, xAxis, series}
 * @returns {object} ECharts配置
 */
function createMarketShareChart(params) {
    return {
        title: {
            text: params.title,
            left: 'center',
            textStyle: {
                fontSize: 14,
                color: '#e8e8e8'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '{b}: {c}%'
        },
        xAxis: {
            type: 'category',
            data: params.xAxis,
            axisLabel: {
                color: '#888',
                fontSize: 11,
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#888',
                formatter: '{value}%'
            },
            splitLine: {
                lineStyle: {
                    color: '#1a1a1a'
                }
            }
        },
        series: [{
            data: params.series,
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset: 0, color: '#3b82f6'},
                    {offset: 1, color: '#06b6d4'}
                ])
            },
            barWidth: '50%',
            label: {
                show: true,
                position: 'top',
                formatter: '{c}%',
                color: '#e8e8e8'
            }
        }],
        grid: {
            left: '10%',
            right: '10%',
            bottom: '20%',
            top: '20%'
        }
    };
}

/**
 * 初始化响应式图表（使用World Monitor主题）
 * @param {string} elementId - 图表容器DOM ID
 * @param {object} option - ECharts配置选项
 * @returns {object} ECharts实例
 */
function initInkGoldChartResponsive(elementId, option) {
    const chartDom = document.getElementById(elementId);
    if (!chartDom) {
        console.error(`图表容器未找到: ${elementId}`);
        return null;
    }

    const myChart = echarts.init(chartDom, 'worldMonitor');
    myChart.setOption(option);

    // 响应式调整 - 使用防抖优化性能
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            myChart.resize();
        }, 200);
    });

    return myChart;
}
