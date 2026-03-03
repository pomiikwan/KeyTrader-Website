# KeyTrader 多项目网站

> 资金·项目·贸易专业对接平台

## 项目介绍

KeyTrader 是一个专业的资金、项目、贸易业务对接网站，采用**幻境·流金（玄金水墨）**设计风格，
为合作伙伴提供高效、可靠的商业合作机会展示平台。

### 核心业务

1. **⚡ 新能源汽车超级充电基础设施** - 超充站投资建设与运营服务
2. **💎 芯片授权分销业务** - 专业芯片产品全球市场推广与销售
3. **🖥️ 服务器与算力中心设备** - 完整的服务器与算力中心解决方案
4. **🚀 新增业务（预告）** - 超充建站金融方案、超充设备厂、服务器组装厂等

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 玄金水墨主题样式
- **JavaScript (ES6+)** - 居间人系统和表单处理
- **响应式设计** - 支持桌面端和移动端
- **无依赖** - 纯原生实现，无需第三方库

## 文件结构

```
KeyTrader_多项目网站/
├── index.html                        # 首页：KeyTrader介绍 + 三大业务导航
├── 玄金水墨主题.css                   # 玄金水墨主题样式文件
├── 业务板块/
│   ├── 超充基础设施.html             # 新能源超充基础设施业务页面
│   ├── 芯片分销.html                 # 芯片授权分销业务页面
│   ├── 服务器算力.html               # 服务器与算力中心设备页面
│   └── 业务拓展中.html               # 新增业务预告页面
├── js/
│   ├── 居间人推荐系统.js             # 居间人推荐管理系统
│   └── 联系表单处理.js               # 联系表单验证和提交处理
├── 联系合作.html                      # 联系与合作页面
├── LOGO-K.png                        # 公司Logo
├── README.md                         # 项目说明文档（本文件）
└── .claude/
    └── plan/
        └── KeyTrader多项目网站开发计划.md  # 开发计划文档
```

## 主题设计

### 玄金水墨主题配色

```css
--primary-gold: #D4AF37;      /* 主金色 */
--ink-black: #1A1A1A;         /* 墨黑色 */
--paper-beige: #F5F0E6;       /* 宣纸色 */
--seal-red: #C53D13;          /* 朱砂红 */
--shadow-soft: rgba(0,0,0,0.25); /* 柔和阴影 */
```

### 设计特点

- ✨ 宣纸纹理背景效果
- 🎨 金色与墨黑的优雅搭配
- 🌟 平滑的悬停动画效果
- 📱 完美的响应式设计
- 🎯 专业的商务风格

## 功能特性

### 1. 居间人推荐系统

**功能说明：**
- 支持URL参数传递推荐人代码
- 本地存储管理推荐关系
- 跨页面保持推荐关系
- 预留撮合费用记录接口

**使用方法：**

链接格式：
```
https://yourdomain.com/?ref=REFERRER_CODE
```

或：
```
https://yourdomain.com/?referrer=REFERRER_CODE
```

多个居间人：
```
https://yourdomain.com/?ref=CODE1,CODE2,CODE3
```

**API接口：**

```javascript
// 获取当前推荐人
const referrer = KeyTraderReferrerSystem.getCurrentReferrer();

// 获取推荐人详情
const info = KeyTraderReferrerSystem.getReferrerInfo();

// 记录撮合费用
KeyTraderReferrerSystem.recordCommissionFee(
    projectId,      // 项目ID
    referrer,       // 推荐人代码
    amount,         // 金额
    metadata        // 额外元数据
);
```

### 2. 联系表单系统

**功能说明：**
- 表单字段验证（邮箱、手机号等）
- 自动填充推荐人信息
- 表单提交处理
- 用户反馈提示

**表单字段：**
- 姓名（必填）
- 邮箱（必填）
- 联系电话（选填）
- 公司名称（选填）
- 业务类型（必填）
- 留言内容（必填）
- 推荐人代码（自动填充，隐藏字段）

### 3. 响应式设计

支持设备：
- 🖥️ 桌面电脑（1200px+）
- 💻 笔记本电脑（768px - 1199px）
- 📱 平板电脑（481px - 767px）
- 📱 手机（≤480px）

## 本地预览

### 方法1：直接打开HTML文件

直接在浏览器中打开 `index.html` 文件即可预览。

### 方法2：使用本地HTTP服务器

推荐使用本地HTTP服务器以获得更好的体验：

```bash
# 使用 Python 3
python3 -m http.server 8000

# 使用 Python 2
python -m SimpleHTTPServer 8000

# 使用 Node.js (http-server)
npx http-server -p 8000

# 使用 PHP
php -S localhost:8000
```

然后在浏览器中访问：`http://localhost:8000`

## 部署到生产环境

### 方式1：静态网站托管

可以将整个项目文件夹部署到任何静态网站托管服务：

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- 阿里云OSS + CDN
- 腾讯云COS + CDN

### 方式2：传统Web服务器

部署到Apache/Nginx等传统Web服务器：

```bash
# 复制文件到服务器目录
cp -r KeyTrader_多项目网站/* /var/www/html/
```

### 方式3：Docker容器

创建 `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

构建和运行：

```bash
docker build -t keytrader-website .
docker run -d -p 80:80 keytrader-website
```

## 后续开发计划

### 待实现功能

1. **后端API对接**
   - [ ] 表单提交后端API
   - [ ] 居间人撮合费用管理API
   - [ ] 项目信息管理API

2. **功能增强**
   - [ ] 在线客服系统
   - [ ] 项目案例展示
   - [ ] 新闻资讯模块
   - [ ] 多语言支持（英文版）

3. **性能优化**
   - [ ] 图片懒加载
   - [ ] CSS/JS压缩合并
   - [ ] CDN加速
   - [ ] 浏览器缓存策略

4. **SEO优化**
   - [ ] 添加meta标签
   - [ ] 生成sitemap.xml
   - [ ] 结构化数据（JSON-LD）
   - [ ] Google Analytics集成

## 浏览器兼容性

| 浏览器 | 版本 | 支持情况 |
|--------|------|----------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |
| Opera | 76+ | ✅ 完全支持 |
| IE 11 | - | ❌ 不支持 |

## 开发说明

### 修改主题颜色

编辑 `玄金水墨主题.css` 文件中的CSS变量：

```css
:root {
  --primary-gold: #D4AF37;      /* 修改主金色 */
  --ink-black: #1A1A1A;         /* 修改墨黑色 */
  --paper-beige: #F5F0E6;       /* 修改宣纸色 */
  --seal-red: #C53D13;          /* 修改朱砂红 */
}
```

### 添加新业务页面

1. 在 `业务板块/` 目录下创建新的HTML文件
2. 复制现有页面结构作为模板
3. 修改页面内容和标题
4. 在首页 `index.html` 中添加链接

### 自定义表单处理

编辑 `js/联系表单处理.js` 文件：

```javascript
// 修改API端点
const CONFIG = {
    API_ENDPOINT: '/your-api-endpoint'  // 修改为实际API地址
};
```

## 维护和更新

### 日常维护

1. **内容更新**：直接编辑对应的HTML文件
2. **样式调整**：修改 `玄金水墨主题.css`
3. **功能增强**：修改或新增JavaScript文件

### 版本更新

建议使用Git进行版本管理：

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 推送到远程仓库
git remote add origin <repository-url>
git push -u origin master
```

## 常见问题

### Q: 如何修改联系邮箱？

A: 编辑 `联系合作.html` 文件，搜索邮箱地址并替换。

### Q: 居间人系统如何测试？

A: 在浏览器中访问：`index.html?ref=TEST001`，查看页面顶部是否显示推荐人信息。

### Q: 表单提交失败怎么办？

A: 检查浏览器控制台错误信息，确认 `js/联系表单处理.js` 文件是否正确加载。

### Q: 如何添加Google Analytics？

A: 在 `</head>` 标签前添加Google Analytics跟踪代码。

## 联系方式

- **项目维护**：KeyTrader技术团队
- **问题反馈**：通过网站联系表单提交
- **技术支持**：support@keytrader.com

## 许可证

Copyright © 2025 KeyTrader. All rights reserved.

---

**项目创建时间**：2025-03-03
**最后更新时间**：2025-03-03
**开发团队**：哈雷酱（傲娇大小姐工程师）✨
