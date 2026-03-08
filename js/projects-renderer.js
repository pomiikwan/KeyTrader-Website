/**
 * 项目卡片渲染器
 *
 * 功能：
 * - 渲染项目卡片（按投资金额排序）
 * - 区分已上线和筹备中项目
 * - 突出显示关键数字
 */

class ProjectsRenderer {
    constructor() {
        this.projectsGrid = document.getElementById('projects-grid');
        this.init();
    }

    /**
     * 初始化
     */
    init() {
        // 渲染项目卡片
        this.renderProjects();

        // 监听窗口大小变化，重新排序（响应式）
        window.addEventListener('resize', () => {
            // 使用防抖优化性能
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.renderProjects();
            }, 300);
        });
    }

    /**
     * 渲染项目卡片
     */
    renderProjects() {
        if (!this.projectsGrid) return;

        // 获取按投资金额排序的项目
        const sortedProjects = getProjectsSortedByInvestment();

        this.projectsGrid.innerHTML = sortedProjects.map(project => {
            return this.renderProjectCard(project);
        }).join('');

        console.log(`已渲染 ${sortedProjects.length} 个项目卡片`);
    }

    /**
     * 渲染单个项目卡片
     */
    renderProjectCard(project) {
        const statusClass = project.hasLaunched ? 'launched' : 'upcoming';
        const statusText = project.hasLaunched ? '已上线' : '筹备中';
        const statusEmoji = project.hasLaunched ? '' : '';

        return `
            <div class="wm-card">
                <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: start;">
                    <h3 style="font-size: 16px; font-weight: 700; color: var(--wm-text); margin: 0;">${project.name}</h3>
                    <span style="font-size: 10px; padding: 4px 8px; border-radius: 4px; background: ${project.hasLaunched ? 'var(--wm-overlay-light)' : 'var(--wm-overlay-medium)'}; border: 1px solid ${project.hasLaunched ? 'var(--wm-border)' : 'var(--wm-border-strong)'}; color: ${project.hasLaunched ? 'var(--wm-text-secondary)' : 'var(--wm-text-dim)'};">
                        ${statusEmoji} ${statusText}
                    </span>
                </div>
                <p style="font-size: 12px; color: var(--wm-text-secondary); line-height: 1.6; margin-bottom: 16px;">
                    ${project.summary}
                </p>
                <div class="wm-metric" style="margin-bottom: 12px;">
                    <div class="wm-metric-label">可投金额范围</div>
                    <div class="wm-metric-value ${project.investMax >= 5000 ? 'critical' : project.investMax >= 1000 ? 'high' : 'normal'}">${project.investRange}</div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;">
                    <div style="text-align: center; padding: 8px; background: var(--wm-overlay-subtle); border: 1px solid var(--wm-border-subtle); border-radius: 4px;">
                        <div style="font-size: 10px; color: var(--wm-text-dim); margin-bottom: 4px;">建设周期</div>
                        <div style="font-size: 13px; font-weight: 600; color: var(--wm-text);">${project.buildPeriod}</div>
                    </div>
                    <div style="text-align: center; padding: 8px; background: var(--wm-overlay-subtle); border: 1px solid var(--wm-border-subtle); border-radius: 4px;">
                        <div style="font-size: 10px; color: var(--wm-text-dim); margin-bottom: 4px;">回报周期</div>
                        <div style="font-size: 13px; font-weight: 600; color: var(--wm-text);">${project.returnPeriod}</div>
                    </div>
                    <div style="text-align: center; padding: 8px; background: var(--wm-overlay-subtle); border: 1px solid var(--wm-border-subtle); border-radius: 4px;">
                        <div style="font-size: 10px; color: var(--wm-text-dim); margin-bottom: 4px;">年化收益</div>
                        <div style="font-size: 13px; font-weight: 600; color: var(--wm-high);">${project.annualReturn}</div>
                    </div>
                </div>
                ${project.hasLaunched ? `
                    <a href="${project.link}" class="wm-btn wm-btn-primary" style="width: 100%; text-align: center;">
                        查看详情 →
                    </a>
                ` : `
                    <button class="wm-btn" disabled style="width: 100%; text-align: center; opacity: 0.5; cursor: not-allowed;">
                        敬请期待
                    </button>
                `}
            </div>
        `;
    }
}

// 初始化项目渲染器
document.addEventListener('DOMContentLoaded', () => {
    window.projectsRenderer = new ProjectsRenderer();
});
