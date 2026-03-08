/**
 * 中国地图数据注册
 *
 * 从本地 GeoJSON 文件加载并注册中国地图到 ECharts
 */

(function() {
    'use strict';

    /**
     * 加载并注册中国地图
     */
    async function registerChinaMap() {
        try {
            // 加载 GeoJSON 数据
            const response = await fetch('js/lib/china.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const chinaGeoJSON = await response.json();

            // 注册地图到 ECharts
            echarts.registerMap('china', chinaGeoJSON);

            console.log('✓ 中国地图数据注册成功');

            // 触发自定义事件，通知地图数据已加载
            document.dispatchEvent(new CustomEvent('chinaMapLoaded'));

        } catch (error) {
            console.error('✗ 中国地图数据加载失败:', error);

            // 降级方案：使用 CDN
            console.warn('尝试使用备用 CDN 加载地图...');
            loadChinaMapFromCDN();
        }
    }

    /**
     * 备用方案：从 CDN 加载
     */
    function loadChinaMapFromCDN() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/map/js/china.js';
        script.onerror = () => {
            console.error('✗ CDN 地图加载也失败了，地图功能将不可用');
        };
        document.head.appendChild(script);
    }

    // 页面加载时注册地图
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerChinaMap);
    } else {
        registerChinaMap();
    }

})();
