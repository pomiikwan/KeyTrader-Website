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
            <a href="${project.link || '#'}" class="project-card" ${!project.link ? 'onclick="return false;" style="cursor: not-allowed; opacity: 0.7;"' : ''}>
                <span class="project-status ${statusClass}">${statusEmoji} ${statusText}</span>
                <h3 class="project-name">${project.name}</h3>
                <p class="project-summary">${project.summary}</p>

                <div class="metric-highlight">
                    <div class="metric-label-large">可投金额范围</div>
                    <div class="metric-value-large">${project.investRange}</div>
                </div>

                <div class="metric-grid">
                    <div class="metric-item">
                        <span class="metric-item-label">建设周期</span>
                        <span class="metric-item-value">${project.buildPeriod}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-item-label">回报周期</span>
                        <span class="metric-item-value">${project.returnPeriod}</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-item-label">年化收益</span>
                        <span class="metric-item-value">${project.annualReturn}</span>
                    </div>
                </div>

                ${project.hasLaunched ? `
                    <div style="text-align: center; margin-top: var(--spacing-md);">
                        <span style="color: var(--primary-gold); font-weight: 600;">
                            ↓ 点击查看详情
                        </span>
                    </div>
                ` : `
                    <div style="text-align: center; margin-top: var(--spacing-md);">
                        <span style="color: var(--text-muted); font-size: 14px;">
                            敬请期待
                        </span>
                    </div>
                `}
            </a>
        `;
    }
}

// 初始化项目渲染器
document.addEventListener('DOMContentLoaded', () => {
    window.projectsRenderer = new ProjectsRenderer();
});
