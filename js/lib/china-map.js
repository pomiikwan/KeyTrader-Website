/**
 * 中国地图数据注册
 *
 * 直接使用嵌入的 GeoJSON 数据注册中国地图到 ECharts
 * 无需 fetch，避免 file:// 协议的 CORS 限制
 */

(function() {
    'use strict';

    /**
     * 注册中国地图
     */
    function registerChinaMap() {
        try {
            // 检查地图数据是否已加载
            if (typeof chinaGeoJSON === 'undefined') {
                throw new Error('chinaGeoJSON 数据未定义，请确保 china-data.js 已加载');
            }

            // 注册地图到 ECharts
            echarts.registerMap('china', chinaGeoJSON);

            console.log('✓ 中国地图数据注册成功');

            // 触发自定义事件，通知地图数据已加载
            document.dispatchEvent(new CustomEvent('chinaMapLoaded'));

        } catch (error) {
            console.error('✗ 中国地图数据注册失败:', error);
        }
    }

    // 页面加载时注册地图（需要等待 ECharts 和地图数据都加载完成）
    function waitForDependencies() {
        if (typeof echarts !== 'undefined' && typeof chinaGeoJSON !== 'undefined') {
            registerChinaMap();
        } else {
            // 等待100ms后重试
            setTimeout(waitForDependencies, 100);
        }
    }

    // 开始等待依赖
    waitForDependencies();

})();
