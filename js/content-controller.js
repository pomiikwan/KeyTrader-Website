/**
 * 内容控制器
 *
 * 功能：
 * - 控制默认内容和商业计划内容的切换
 * - 监听地图选择事件
 * - 实现平滑过渡动画
 */

class ContentController {
    constructor() {
        this.defaultContent = document.getElementById('default-content');
        this.businessPlanContent = document.getElementById('business-plan-content');
        this.planTitle = document.getElementById('plan-title');
        this.planSubtitle = document.getElementById('plan-subtitle');
        this.businessPlanGrid = document.getElementById('business-plan-grid');
        this.backToDefaultBtn = document.getElementById('back-to-default');

        this.init();
    }

    /**
     * 初始化
     */
    init() {
        // 绑定返回按钮事件
        if (this.backToDefaultBtn) {
            this.backToDefaultBtn.addEventListener('click', () => {
                this.showDefaultContent();
            });
        }

        // 监听地图选择事件
        document.addEventListener('mapProvinceSelected', (e) => {
            this.handleMapSelection(e.detail);
        });

        // 监听地图重置事件
        document.addEventListener('mapReset', () => {
            this.showDefaultContent();
        });

        // 初始化默认内容
        this.showDefaultContent();
    }

    /**
     * 处理地图选择事件
     */
    handleMapSelection(detail) {
        const { province, dimension, dimensionInfo } = detail;

        console.log(`内容切换：省份=${province}, 维度=${dimension}`);

        // 更新标题
        this.updatePlanTitle(province, dimensionInfo);

        // 显示商业计划方案
        this.showBusinessPlanContent(province, dimension);

        // 滚动到内容区域
        this.scrollToContent();
    }

    /**
     * 更新商业计划标题
     */
    updatePlanTitle(province, dimensionInfo) {
        if (this.planTitle && this.planSubtitle) {
            this.planTitle.textContent = `${province} - ${dimensionInfo.name}投资方案`;
            this.planSubtitle.textContent = `基于${province}的${dimensionInfo.name}市场数据`;
        }
    }

    /**
     * 显示默认内容（项目列表）
     */
    showDefaultContent() {
        if (this.defaultContent && this.businessPlanContent) {
            // 隐藏商业计划内容
            this.businessPlanContent.classList.remove('active');

            // 短暂延迟后显示默认内容
            setTimeout(() => {
                this.defaultContent.classList.add('active');
            }, 100);
        }
    }

    /**
     * 显示商业计划内容
     */
    showBusinessPlanContent(province, dimension) {
        if (this.defaultContent && this.businessPlanContent) {
            // 隐藏默认内容
            this.defaultContent.classList.remove('active');

            // 短暂延迟后显示商业计划内容
            setTimeout(() => {
                // 获取商业计划方案
                const plans = getBusinessPlansByDimension(
                    this.getDimensionName(dimension)
                );

                // 渲染商业计划卡片
                this.renderBusinessPlans(plans);

                this.businessPlanContent.classList.add('active');
            }, 100);
        }
    }

    /**
     * 渲染商业计划卡片
     */
    renderBusinessPlans(plans) {
        if (!this.businessPlanGrid) return;

        if (plans.length === 0) {
            this.businessPlanGrid.innerHTML = `
                <div class="no-plans-message">
                    <p>暂无该维度的商业计划方案</p>
                    <p style="color: var(--text-muted); font-size: 14px; margin-top: 10px;">
                        请查看其他维度的数据，或返回项目列表了解更多信息
                    </p>
                </div>
            `;
            return;
        }

        this.businessPlanGrid.innerHTML = plans.map((plan, index) => {
            const projectData = getProjectById(plan.planId);

            return `
                <div class="wm-card">
                    <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: start;">
                        <h3 style="font-size: 16px; font-weight: 700; color: var(--wm-text); margin: 0;">${plan.planName}</h3>
                        <span style="font-size: 11px; padding: 4px 8px; border-radius: 4px; background: var(--wm-overlay-light); border: 1px solid var(--wm-border); color: var(--wm-text-dim); font-weight: 600;">
                            ${plan.priority}
                        </span>
                    </div>
                    <p style="font-size: 12px; color: var(--wm-text-secondary); line-height: 1.6; margin-bottom: 16px;">
                        ${plan.reason}
                    </p>
                    ${this.renderPlanProjectInfo(projectData)}
                    <div style="text-align: center; margin-top: 16px;">
                        ${this.renderPlanAction(projectData)}
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * 渲染项目信息
     */
    renderPlanProjectInfo(projectData) {
        if (!projectData) {
            return `
                <div style="padding: 16px; background: var(--wm-overlay-subtle); border: 1px solid var(--wm-border-subtle); border-radius: 4px; text-align: center;">
                    <p style="color: var(--wm-text-dim); font-style: italic; font-size: 12px; margin: 0;">
                        该项目正在筹备中，敬请期待...
                    </p>
                </div>
            `;
        }

        return `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                <div style="padding: 8px; background: var(--wm-overlay-subtle); border: 1px solid var(--wm-border-subtle); border-radius: 4px;">
                    <div style="font-size: 10px; color: var(--wm-text-dim); margin-bottom: 4px;">可投金额</div>
                    <div style="font-size: 13px; font-weight: 600; color: var(--wm-text);">${projectData.investRange}</div>
                </div>
                <div style="padding: 8px; background: var(--wm-overlay-subtle); border: 1px solid var(--wm-border-subtle); border-radius: 4px;">
                    <div style="font-size: 10px; color: var(--wm-text-dim); margin-bottom: 4px;">建设周期</div>
                    <div style="font-size: 13px; font-weight: 600; color: var(--wm-text);">${projectData.buildPeriod}</div>
                </div>
                <div style="padding: 8px; background: var(--wm-overlay-subtle); border: 1px solid var(--wm-border-subtle); border-radius: 4px;">
                    <div style="font-size: 10px; color: var(--wm-text-dim); margin-bottom: 4px;">回报周期</div>
                    <div style="font-size: 13px; font-weight: 600; color: var(--wm-text);">${projectData.returnPeriod}</div>
                </div>
                <div style="padding: 8px; background: var(--wm-overlay-subtle); border: 1px solid var(--wm-border-subtle); border-radius: 4px;">
                    <div style="font-size: 10px; color: var(--wm-text-dim); margin-bottom: 4px;">年化收益</div>
                    <div style="font-size: 13px; font-weight: 600; color: var(--wm-high);">${projectData.annualReturn}</div>
                </div>
            </div>
        `;
    }

    /**
     * 渲染操作按钮
     */
    renderPlanAction(projectData) {
        if (!projectData || !projectData.hasLaunched) {
            return `
                <button class="wm-btn" disabled style="opacity: 0.5; cursor: not-allowed;">
                    敬请期待
                </button>
            `;
        }

        return `
            <a href="${projectData.link}" class="wm-btn wm-btn-primary" style="display: inline-block;">
                了解详情 →
            </a>
        `;
    }

    /**
     * 获取数据维度的中文名称
     */
    getDimensionName(dimensionKey) {
        const mapping = {
            'ev_ownership': '新能源汽车保有量',
            'charging_stations': '超充站数量',
            'charging_supply_demand': '超充设备供需比',
            'chip_supply_demand': '芯片供需比',
            'server_supply_demand': '服务器供需比',
            'computing_centers': '算力中心数量',
            'huawei_dealers': '华为授权商'
        };
        return mapping[dimensionKey];
    }

    /**
     * 滚动到内容区域
     */
    scrollToContent() {
        const contentSection = document.getElementById('projects');
        if (contentSection) {
            contentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// 初始化内容控制器
document.addEventListener('DOMContentLoaded', () => {
    window.contentController = new ContentController();
});
