/**
 * =========================================
 * KeyTrader 联系表单处理脚本
 * =========================================
 *
 * 功能说明：
 * 1. 表单验证
 * 2. 自动添加推荐人信息
 * 3. 表单提交处理
 * 4. 用户反馈提示
 *
 * 使用方法：
 * - 在HTML表单中引入：<script src="js/联系表单处理.js"></script>
 * - 表单ID：contactForm
 *
 * =========================================
 */

(function() {
    'use strict';

    // =========================================
    // 配置
    // =========================================
    const CONFIG = {
        FORM_ID: 'contactForm',
        SUBMIT_BUTTON_CLASS: 'btn-primary',
        SUCCESS_MESSAGE: '提交成功！我们会尽快与您联系。',
        ERROR_MESSAGE: '提交失败，请稍后重试或直接通过其他方式联系我们。',
        // TODO: 替换为实际的API端点
        API_ENDPOINT: '/api/contact/submit'
    };

    // =========================================
    // 表单验证函数
    // =========================================

    /**
     * 验证邮箱地址
     * @param {string} email - 邮箱地址
     * @returns {boolean} 是否有效
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * 验证手机号（中国大陆）
     * @param {string} phone - 手机号
     * @returns {boolean} 是否有效
     */
    function isValidPhone(phone) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        return phoneRegex.test(phone);
    }

    /**
     * 验证表单数据
     * @param {FormData} formData - 表单数据
     * @returns {Object} 验证结果 {valid: boolean, errors: string[]}
     */
    function validateForm(formData) {
        const errors = [];

        // 必填字段检查
        const requiredFields = ['name', 'email', 'message'];
        for (const field of requiredFields) {
            const value = formData.get(field);
            if (!value || value.trim() === '') {
                const fieldNames = {
                    name: '姓名',
                    email: '邮箱',
                    message: '留言内容'
                };
                errors.push(`${fieldNames[field]}不能为空`);
            }
        }

        // 邮箱格式验证
        const email = formData.get('email');
        if (email && !isValidEmail(email)) {
            errors.push('邮箱格式不正确');
        }

        // 手机号格式验证（如果填写了）
        const phone = formData.get('phone');
        if (phone && !isValidPhone(phone)) {
            errors.push('手机号格式不正确');
        }

        // 留言内容长度检查
        const message = formData.get('message');
        if (message && message.length < 10) {
            errors.push('留言内容至少需要10个字符');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    // =========================================
    // 通知显示函数
    // =========================================

    /**
     * 显示通知消息
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型 (success|error)
     */
    function showNotification(message, type = 'success') {
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
                ${type === 'success' ? '✓ 提交成功' : '✗ 提交失败'}
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
    // 表单提交处理
    // =========================================

    /**
     * 处理表单提交
     * @param {Event} event - 表单提交事件
     */
    async function handleFormSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector(`.${CONFIG.SUBMIT_BUTTON_CLASS}`);

        try {
            // 禁用提交按钮
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = '提交中...';
            }

            // 获取推荐人信息
            const referrer = localStorage.getItem('keytrader_referrer') || '';
            if (referrer) {
                formData.append('referrer', referrer);
                formData.append('referrer_timestamp',
                    localStorage.getItem('keytrader_referrer_timestamp') || '');
            }

            // 添加额外信息
            formData.append('submit_time', new Date().toISOString());
            formData.append('page_url', window.location.href);
            formData.append('user_agent', navigator.userAgent);

            // 验证表单
            const validation = validateForm(formData);
            if (!validation.valid) {
                showNotification('验证失败：\n' + validation.errors.join('\n'), 'error');
                return;
            }

            // TODO: 发送到后端API
            // const response = await fetch(CONFIG.API_ENDPOINT, {
            //     method: 'POST',
            //     body: formData
            // });
            // if (!response.ok) throw new Error('提交失败');

            // 模拟API调用（临时）
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 提交成功
            console.log('[联系表单] 表单数据:', Object.fromEntries(formData));
            showNotification(CONFIG.SUCCESS_MESSAGE, 'success');

            // 重置表单
            form.reset();

            // 清除推荐人隐藏字段
            const referrerInput = document.getElementById('referrerInput');
            if (referrerInput) {
                referrerInput.value = '';
            }

        } catch (error) {
            console.error('[联系表单] 提交失败:', error);
            showNotification(CONFIG.ERROR_MESSAGE, 'error');
        } finally {
            // 恢复提交按钮
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = '提交';
            }
        }
    }

    /**
     * 初始化表单处理
     */
    function initFormHandler() {
        const form = document.getElementById(CONFIG.FORM_ID);

        if (!form) {
            console.log('[联系表单] 未找到表单，跳过初始化');
            return;
        }

        console.log('[联系表单] 初始化表单处理...');

        // 设置推荐人隐藏字段
        const referrer = localStorage.getItem('keytrader_referrer') || '';
        const referrerInput = document.getElementById('referrerInput');
        if (referrerInput && referrer) {
            referrerInput.value = referrer;
            console.log('[联系表单] 自动填充推荐人:', referrer);
        }

        // 绑定表单提交事件
        form.addEventListener('submit', handleFormSubmit);

        // 实时验证（可选）
        const emailInput = form.querySelector('input[name="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value && !isValidEmail(value)) {
                    this.style.borderColor = 'var(--seal-red)';
                } else {
                    this.style.borderColor = '';
                }
            });
        }

        const phoneInput = form.querySelector('input[name="phone"]');
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                const value = this.value.trim();
                if (value && !isValidPhone(value)) {
                    this.style.borderColor = 'var(--seal-red)';
                } else {
                    this.style.borderColor = '';
                }
            });
        }

        console.log('[联系表单] 初始化完成');
    }

    // =========================================
    // 页面加载完成后初始化
    // =========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFormHandler);
    } else {
        initFormHandler();
    }

})();
