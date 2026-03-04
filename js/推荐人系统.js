/**
 * =========================================
 * KeyTrader 推荐人系统
 * =========================================
 *
 * 功能说明：
 * 1. URL参数解析：支持 ?ref=CODE 或 ?referrer=CODE
 * 2. 本地存储管理：保存推荐人代码和时间戳
 * 3. 跨页面追踪：在所有页面保持推荐关系
 * 4. 撮合费用记录：预留费用记录接口
 * 5. 推荐人信息显示：在页面显示当前推荐人
 *
 * 使用方法：
 * - 链接格式：https://yourdomain.com/?ref=REFERRER_CODE
 * - 多个推荐人：https://yourdomain.com/?ref=CODE1,CODE2,CODE3
 * - 在HTML中引入：<script src="js/推荐人系统.js"></script>
 *
 * =========================================
 */

(function() {
    'use strict';

    // =========================================
    // 配置常量
    // =========================================
    const CONFIG = {
        STORAGE_KEY_REFERRER: 'keytrader_referrer',           // 推荐人代码存储键
        STORAGE_KEY_TIMESTAMP: 'keytrader_referrer_timestamp', // 时间戳存储键
        STORAGE_KEY_MULTI: 'keytrader_referrer_multi',        // 多推荐人存储键
        STORAGE_KEY_VISITS: 'keytrader_referrer_visits',      // 访问次数统计
        URL_PARAM_NAMES: ['ref', 'referrer', 'recommend'],   // 支持的URL参数名
        SESSION_KEY: 'keytrader_session_id',                  // 会话ID
        COMMISSION_API_ENDPOINT: '/api/commission/record'     // 撮合费用API端点（预留）
    };

    // =========================================
    // 工具函数
    // =========================================

    /**
     * 生成会话ID
     * @returns {string} 会话ID
     */
    function generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * 格式化时间戳
     * @param {number} timestamp - Unix时间戳
     * @returns {string} 格式化的日期时间
     */
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    /**
     * 显示通知消息
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型 (success|error|info)
     */
    function showNotification(message, type = 'info') {
        // 移除已存在的通知
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // 创建新通知
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 5px;">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'} ${type === 'success' ? '成功' : type === 'error' ? '错误' : '提示'}
            </div>
            <div>${message}</div>
        `;
        document.body.appendChild(notification);

        // 5秒后自动移除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // =========================================
    // 核心功能函数
    // =========================================

    /**
     * 从URL获取推荐人代码
     * @returns {string} 推荐人代码，如果不存在则返回空字符串
     */
    function getReferrerFromURL() {
        try {
            const params = new URLSearchParams(window.location.search);

            // 遍历支持的参数名
            for (const paramName of CONFIG.URL_PARAM_NAMES) {
                const referrer = params.get(paramName);
                if (referrer && referrer.trim() !== '') {
                    console.log(`[推荐人系统] 从URL参数 ${paramName} 获取到推荐人:`, referrer);
                    return referrer.trim();
                }
            }

            return '';
        } catch (error) {
            console.error('[推荐人系统] URL解析错误:', error);
            return '';
        }
    }

    /**
     * 解析多个推荐人代码（逗号分隔）
     * @param {string} referrerString - 推荐人字符串
     * @returns {string[]} 推荐人代码数组
     */
    function parseMultipleReferrers(referrerString) {
        if (!referrerString) return [];

        // 支持逗号、分号、空格分隔
        const referrers = referrerString
            .split(/[,\s;]+/)
            .map(r => r.trim())
            .filter(r => r !== '');

        return [...new Set(referrers)]; // 去重
    }

    /**
     * 保存推荐人信息到本地存储
     * @param {string} referrerCode - 推荐人代码
     */
    function saveReferrer(referrerCode) {
        if (!referrerCode) return;

        try {
            // 检查是否已存在推荐人
            const existingReferrer = localStorage.getItem(CONFIG.STORAGE_KEY_REFERRER);

            // 保存主推荐人
            localStorage.setItem(CONFIG.STORAGE_KEY_REFERRER, referrerCode);
            localStorage.setItem(CONFIG.STORAGE_KEY_TIMESTAMP, Date.now().toString());

            // 处理多个推荐人
            const referrers = parseMultipleReferrers(referrerCode);
            if (referrers.length > 0) {
                const multiReferrers = JSON.stringify(referrers);
                localStorage.setItem(CONFIG.STORAGE_KEY_MULTI, multiReferrers);
            }

            // 如果是新的推荐人，显示通知
            if (existingReferrer !== referrerCode) {
                console.log('[推荐人系统] 推荐人信息已保存:', referrerCode);

                // 仅在首次访问时显示通知
                const visitCount = parseInt(localStorage.getItem(CONFIG.STORAGE_KEY_VISITS) || '0');
                if (visitCount <= 1) {
                    setTimeout(() => {
                        showNotification(`欢迎！当前推荐人：${referrerCode}`, 'success');
                    }, 1000);
                }
            }
        } catch (error) {
            console.error('[推荐人系统] 保存推荐人信息失败:', error);
        }
    }

    /**
     * 获取当前推荐人
     * @returns {string} 推荐人代码
     */
    function getCurrentReferrer() {
        try {
            return localStorage.getItem(CONFIG.STORAGE_KEY_REFERRER) || '';
        } catch (error) {
            console.error('[推荐人系统] 获取推荐人信息失败:', error);
            return '';
        }
    }

    /**
     * 获取所有推荐人（多个）
     * @returns {string[]} 推荐人代码数组
     */
    function getAllReferrers() {
        try {
            const multiReferrers = localStorage.getItem(CONFIG.STORAGE_KEY_MULTI);
            if (multiReferrers) {
                return JSON.parse(multiReferrers);
            }
            const referrer = getCurrentReferrer();
            return referrer ? [referrer] : [];
        } catch (error) {
            console.error('[推荐人系统] 获取多个推荐人信息失败:', error);
            return [];
        }
    }

    /**
     * 获取推荐人信息详情
     * @returns {Object} 推荐人信息对象
     */
    function getReferrerInfo() {
        try {
            const referrer = getCurrentReferrer();
            const timestamp = localStorage.getItem(CONFIG.STORAGE_KEY_TIMESTAMP);
            const visits = localStorage.getItem(CONFIG.STORAGE_KEY_VISITS) || '0';

            return {
                referrer: referrer,
                timestamp: timestamp ? parseInt(timestamp) : null,
                formattedTime: timestamp ? formatTimestamp(parseInt(timestamp)) : '',
                visits: parseInt(visits),
                hasReferrer: !!referrer
            };
        } catch (error) {
            console.error('[推荐人系统] 获取推荐人详情失败:', error);
            return {
                referrer: '',
                timestamp: null,
                formattedTime: '',
                visits: 0,
                hasReferrer: false
            };
        }
    }

    /**
     * 显示推荐人信息
     */
    function displayReferrerInfo() {
        const referrerInfo = getReferrerInfo();
        const referrerInfoDiv = document.getElementById('referrerInfo');
        const referrerCodeSpan = document.getElementById('referrerCode');

        if (referrerInfo.hasReferrer && referrerInfoDiv && referrerCodeSpan) {
            referrerCodeSpan.textContent = referrerInfo.referrer;
            referrerInfoDiv.style.display = 'flex';
        }
    }

    /**
     * 更新访问统计
     */
    function updateVisitStats() {
        try {
            let visits = parseInt(localStorage.getItem(CONFIG.STORAGE_KEY_VISITS) || '0');
            visits++;
            localStorage.setItem(CONFIG.STORAGE_KEY_VISITS, visits.toString());
            console.log(`[推荐人系统] 访问统计更新，总访问次数: ${visits}`);
        } catch (error) {
            console.error('[推荐人系统] 更新访问统计失败:', error);
        }
    }

    /**
     * 记录撮合费用（预留接口）
     * @param {string} projectId - 项目ID
     * @param {string} referrer - 推荐人代码
     * @param {number} amount - 金额
     * @param {Object} metadata - 额外元数据
     */
    function recordCommissionFee(projectId, referrer, amount, metadata = {}) {
        const commission = {
            projectId,
            referrer,
            amount,
            timestamp: Date.now(),
            sessionId: getSessionId(),
            status: 'pending',
            metadata: {
                userAgent: navigator.userAgent,
                url: window.location.href,
                ...metadata
            }
        };

        console.log('[推荐人系统] 撮合费用记录:', commission);

        // TODO: 发送到后端API
        // fetch(CONFIG.COMMISSION_API_ENDPOINT, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(commission)
        // }).then(response => {
        //     console.log('撮合费用记录成功:', response);
        // }).catch(error => {
        //     console.error('撮合费用记录失败:', error);
        // });

        // 临时保存到本地存储
        try {
            const commissions = JSON.parse(localStorage.getItem('keytrader_commissions') || '[]');
            commissions.push(commission);
            localStorage.setItem('keytrader_commissions', JSON.stringify(commissions));
        } catch (error) {
            console.error('[推荐人系统] 保存撮合费用记录失败:', error);
        }

        return commission;
    }

    /**
     * 获取会话ID
     * @returns {string} 会话ID
     */
    function getSessionId() {
        let sessionId = sessionStorage.getItem(CONFIG.SESSION_KEY);
        if (!sessionId) {
            sessionId = generateSessionId();
            sessionStorage.setItem(CONFIG.SESSION_KEY, sessionId);
        }
        return sessionId;
    }

    /**
     * 清除推荐人信息（仅供测试使用）
     */
    function clearReferrerInfo() {
        try {
            localStorage.removeItem(CONFIG.STORAGE_KEY_REFERRER);
            localStorage.removeItem(CONFIG.STORAGE_KEY_TIMESTAMP);
            localStorage.removeItem(CONFIG.STORAGE_KEY_MULTI);
            console.log('[推荐人系统] 推荐人信息已清除');
            showNotification('推荐人信息已清除', 'info');
        } catch (error) {
            console.error('[推荐人系统] 清除推荐人信息失败:', error);
        }
    }

    /**
     * 初始化推荐人系统
     */
    function initReferrerSystem() {
        console.log('[推荐人系统] 初始化推荐人系统...');

        // 从URL获取推荐人
        const urlReferrer = getReferrerFromURL();
        if (urlReferrer) {
            saveReferrer(urlReferrer);
        }

        // 更新访问统计
        updateVisitStats();

        // 显示推荐人信息
        displayReferrerInfo();

        // 将系统暴露到全局（方便调试和外部调用）
        window.KeyTraderReferrerSystem = {
            getCurrentReferrer,
            getAllReferrers,
            getReferrerInfo,
            recordCommissionFee,
            clearReferrerInfo,
            getReferrerFromURL,
            CONFIG
        };

        console.log('[推荐人系统] 初始化完成，推荐人:', getCurrentReferrer());
    }

    // =========================================
    // 页面加载完成后初始化
    // =========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReferrerSystem);
    } else {
        initReferrerSystem();
    }

    // =========================================
    // 导出（模块化环境）
    // =========================================
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            getCurrentReferrer,
            getAllReferrers,
            getReferrerInfo,
            recordCommissionFee,
            clearReferrerInfo,
            getReferrerFromURL,
            initReferrerSystem,
            CONFIG
        };
    }

})();
