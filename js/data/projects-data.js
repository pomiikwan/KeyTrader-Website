/**
 * KeyTrader 项目数据配置
 *
 * 项目说明：
 * - 部分项目已上线（hasLaunched: true）
 * - 部分项目筹备中（hasLaunched: false）
 * - 投资金额范围用于排序显示
 */

const projectsData = [
    // ========== 已上线项目 ==========

    {
        id: 'thousand-station-charging',
        name: '千站液冷超充项目',
        englishName: 'Thousand Station Liquid Cooling Super Charging Project',
        summary: '全国1000座华为600kW全液冷超充站建设，"一秒一公里"极致体验',
        investRange: '28亿',
        investMin: 280000, // 万
        investMax: 280000, // 万
        buildPeriod: '5年（2025-2029）',
        returnPeriod: '4.5年',
        annualReturn: '42.8%',
        hasLaunched: true,
        link: '超充项目网站/index.html',
        priority: 1,
        tags: ['超充站', '新能源', '基础设施', '华为技术'],
        description: '千站液冷超充项目是由KeyTrade主导的新能源汽车充电基础设施建设工程，计划在全国范围内建设1000座采用华为600kW全液冷超充技术的充电站。项目依托华为数字能源的先进技术，提供"一秒一公里"的极致充电体验。'
    },

    {
        id: 'ev-charging-factory',
        name: '液冷超充设备厂',
        englishName: 'Liquid-Cooled Ultra-Fast Charging Equipment Factory',
        summary: '新能源汽车兆瓦级超充设备研发制造，全产业链布局',
        investRange: '5000-8000万',
        investMin: 5000, // 万
        investMax: 8000, // 万
        buildPeriod: '18个月',
        returnPeriod: '3-5年',
        annualReturn: '28.5%',
        hasLaunched: true,
        link: '超充设备厂/index.html',
        priority: 2,
        tags: ['新能源', '超充设备', '制造业'],
        description: '专注新能源汽车充电基础设施核心部件研发制造，依托华为数字能源生态，提供600kW全液冷超充设备及整体解决方案。'
    },

    {
        id: 'server-assembly-factory',
        name: '服务器组装厂',
        englishName: 'AI Server Assembly & Computing Infrastructure Factory',
        summary: 'AI算力基础设施建设，让AI算力触手可及',
        investRange: '1.5-2.5亿',
        investMin: 15000, // 万
        investMax: 25000, // 万
        buildPeriod: '24个月',
        returnPeriod: '2-3年',
        annualReturn: '49.8%',
        hasLaunched: true,
        link: '服务器组装厂/index.html',
        priority: 2,
        tags: ['AI算力', '服务器', '基础设施'],
        description: '专注AI算力基础设施建设，基于国产大模型，提供高性能服务器、算力中心整体解决方案，立足国家"东数西算"战略。'
    },

    // ========== 筹备中项目 ==========

    {
        id: 'semiconductor-industry-chain',
        name: '半导体产业链投资项目',
        englishName: 'Semiconductor Industry Chain Investment',
        summary: '聚焦半导体核心材料与设备，打通产业链关键环节',
        investRange: '2-3亿',
        investMin: 20000, // 万
        investMax: 30000, // 万
        buildPeriod: '30个月',
        returnPeriod: '4-6年',
        annualReturn: '35-45%',
        hasLaunched: false,
        link: null,
        priority: 3,
        tags: ['半导体', '产业链', '投资'],
        description: '投资半导体产业链关键环节，包括晶圆制造、封装测试、设备材料等，把握国产替代机遇，打造完整产业生态。'
    },

    {
        id: 'chip-authorized-distribution',
        name: '芯片授权贸易',
        englishName: 'Chip Authorized Distribution',
        summary: '原厂授权芯片产品全球分销，提供技术支持服务',
        investRange: '3000-5000万',
        investMin: 3000, // 万
        investMax: 5000, // 万
        buildPeriod: '12个月',
        returnPeriod: '2-3年',
        annualReturn: '22-28%',
        hasLaunched: false,
        link: '业务板块/芯片分销.html',
        priority: 4,
        tags: ['芯片', '分销', '贸易'],
        description: '作为多家知名芯片原厂的授权分销商，提供UFS闪存、SSD、GPU、DRAM等芯片产品，配备专业FAE团队提供技术支持。'
    },

    {
        id: 'computing-center-operation',
        name: '算力中心运营部署',
        englishName: 'Computing Center Operation & Deployment',
        summary: 'AI算力中心整体解决方案，从建设到运营一站式服务',
        investRange: '8000-1.5亿',
        investMin: 8000, // 万
        investMax: 15000, // 万
        buildPeriod: '18-24个月',
        returnPeriod: '3-5年',
        annualReturn: '30-40%',
        hasLaunched: false,
        link: null,
        priority: 5,
        tags: ['算力中心', '运营', 'AI基础设施'],
        description: '提供AI算力中心从规划设计、设备供应、建设实施到运营维护的一站式服务，支持多种算力需求场景。'
    },

    {
        id: 'server-trading',
        name: '服务器贸易',
        englishName: 'Server Trading Business',
        summary: '企业级服务器产品全球贸易，供应链一体化服务',
        investRange: '2000-4000万',
        investMin: 2000, // 万
        investMax: 4000, // 万
        buildPeriod: '8-12个月',
        returnPeriod: '1-2年',
        annualReturn: '18-25%',
        hasLaunched: false,
        link: '业务板块/服务器算力.html',
        priority: 6,
        tags: ['服务器', '贸易', '供应链'],
        description: '专业的企业级服务器产品贸易服务，提供全球采购、物流配送、技术支持等一体化供应链服务。'
    },

    {
        id: 'brand-operation',
        name: '品牌运营',
        englishName: 'Brand Operation',
        summary: '品牌全案运营，从策划到执行打造行业影响力',
        investRange: '1000-2000万',
        investMin: 1000, // 万
        investMax: 2000, // 万
        buildPeriod: '6-12个月',
        returnPeriod: '1-2年',
        annualReturn: '40-60%',
        hasLaunched: false,
        link: null,
        priority: 7,
        tags: ['品牌', '运营', '营销'],
        description: '提供品牌战略规划、视觉设计、数字营销、公关传播等全案运营服务，帮助企业快速建立品牌影响力和市场地位。'
    }
];

/**
 * 按投资金额排序项目（从大到小）
 */
function getProjectsSortedByInvestment() {
    return [...projectsData].sort((a, b) => {
        // 按最小投资金额排序
        return b.investMin - a.investMin;
    });
}

/**
 * 获取已上线项目
 */
function getLaunchedProjects() {
    return projectsData.filter(p => p.hasLaunched);
}

/**
 * 获取筹备中项目
 */
function getUpcomingProjects() {
    return projectsData.filter(p => !p.hasLaunched);
}

/**
 * 根据标签筛选项目
 */
function getProjectsByTag(tag) {
    return projectsData.filter(p => p.tags.includes(tag));
}

/**
 * 根据ID获取项目
 */
function getProjectById(id) {
    return projectsData.find(p => p.id === id);
}

// 导出数据和方法
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        projectsData,
        getProjectsSortedByInvestment,
        getLaunchedProjects,
        getUpcomingProjects,
        getProjectsByTag,
        getProjectById
    };
}
