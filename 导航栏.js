/**
 * ========================================
 * 侧边导航栏JavaScript控制
 * KeyTrader Website - 2026年3月8日优化
 * ========================================
 */

(function() {
    'use strict';

    // 等待DOM完全加载
    document.addEventListener('DOMContentLoaded', function() {
        initSideNav();
    });

    /**
     * 初始化侧边导航栏
     */
    function initSideNav() {
        // 获取DOM元素
        const menuToggle = document.getElementById('menuToggle');
        const closeNav = document.getElementById('closeNav');
        const sideNav = document.getElementById('sideNav');
        const overlay = document.getElementById('overlay');

        // 如果元素不存在，直接返回
        if (!menuToggle || !sideNav) {
            console.warn('侧边导航栏元素未找到');
            return;
        }

        // 打开导航菜单
        function openNav() {
            if (sideNav) {
                sideNav.classList.add('active');
            }
            if (overlay) {
                overlay.classList.add('active');
            }
            if (menuToggle) {
                menuToggle.classList.add('active');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
            // 禁止背景滚动
            document.body.style.overflow = 'hidden';
        }

        // 关闭导航菜单
        function closeNavMenu() {
            if (sideNav) {
                sideNav.classList.remove('active');
            }
            if (overlay) {
                overlay.classList.remove('active');
            }
            if (menuToggle) {
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            // 恢复背景滚动
            document.body.style.overflow = '';
        }

        // 汉堡菜单按钮点击事件
        if (menuToggle) {
            menuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                if (sideNav.classList.contains('active')) {
                    closeNavMenu();
                } else {
                    openNav();
                }
            });
        }

        // 关闭按钮点击事件
        if (closeNav) {
            closeNav.addEventListener('click', function(e) {
                e.preventDefault();
                closeNavMenu();
            });
        }

        // 遮罩层点击事件
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                e.preventDefault();
                closeNavMenu();
            });
        }

        // 点击导航链接后关闭菜单
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeNavMenu();
            });
        });

        // ESC键关闭菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sideNav.classList.contains('active')) {
                closeNavMenu();
            }
        });

        // 触摸滑动关闭（移动端优化）
        let touchStartX = 0;
        let touchEndX = 0;

        if (sideNav) {
            sideNav.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, false);

            sideNav.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
        }

        function handleSwipe() {
            const swipeThreshold = 50; // 滑动阈值

            // 从左向右滑动打开
            if (touchEndX - touchStartX > swipeThreshold && !sideNav.classList.contains('active')) {
                openNav();
            }

            // 从右向左滑动关闭
            if (touchStartX - touchEndX > swipeThreshold && sideNav.classList.contains('active')) {
                closeNavMenu();
            }
        }

        // 防止菜单内容滚动时关闭
        if (sideNav) {
            sideNav.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }

        console.log('侧边导航栏初始化完成');
    }

    /**
     * 公开API：手动打开/关闭导航
     */
    window.SideNavAPI = {
        open: function() {
            const sideNav = document.getElementById('sideNav');
            const overlay = document.getElementById('overlay');
            const menuToggle = document.getElementById('menuToggle');

            if (sideNav) sideNav.classList.add('active');
            if (overlay) overlay.classList.add('active');
            if (menuToggle) {
                menuToggle.classList.add('active');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
            document.body.style.overflow = 'hidden';
        },

        close: function() {
            const sideNav = document.getElementById('sideNav');
            const overlay = document.getElementById('overlay');
            const menuToggle = document.getElementById('menuToggle');

            if (sideNav) sideNav.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        },

        toggle: function() {
            const sideNav = document.getElementById('sideNav');
            if (sideNav && sideNav.classList.contains('active')) {
                this.close();
            } else {
                this.open();
            }
        }
    };

})();
