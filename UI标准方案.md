# 后台管理系统 UI 设计标准方案

## 1. 设计原则

### 1.1 核心原则
- **一致性**: 统一的视觉语言和交互模式
- **效率性**: 提高运维人员的操作效率
- **专业性**: 体现企业级网络管理系统的专业性
- **可扩展性**: 支持未来功能模块的扩展

### 1.2 设计理念
- 以数据为中心的信息架构
- 响应式设计，适配多种设备
- 深色主题优先，减少视觉疲劳
- 信息层次清晰，关键信息突出

## 2. 颜色系统

### 2.1 主色调 (Primary Colors)
```css
/* 主品牌色 - 蓝色系 */
--primary-50: #eff6ff;   /* 极浅蓝 - 背景提示 */
--primary-100: #dbeafe;  /* 浅蓝 - 悬停背景 */
--primary-200: #bfdbfe;  /* 中浅蓝 - 禁用状态 */
--primary-300: #93c5fd;  /* 中蓝 - 次要元素 */
--primary-400: #60a5fa;  /* 较深蓝 - 辅助按钮 */
--primary-500: #3b82f6;  /* 标准蓝 - 主要按钮 */
--primary-600: #2563eb;  /* 深蓝 - 激活状态 */
--primary-700: #1d4ed8;  /* 较深蓝 - 按下状态 */
--primary-800: #1e40af;  /* 深蓝 - 重要文本 */
--primary-900: #1e3a8a;  /* 最深蓝 - 标题文本 */
```

### 2.2 功能色 (Functional Colors)
```css
/* 成功状态 - 绿色系 */
--success-light: #ecfdf5;
--success-base: #10b981;
--success-dark: #065f46;

/* 警告状态 - 橙色系 */
--warning-light: #fffbeb;
--warning-base: #f59e0b;
--warning-dark: #92400e;

/* 错误状态 - 红色系 */
--error-light: #fef2f2;
--error-base: #ef4444;
--error-dark: #991b1b;

/* 信息状态 - 青色系 */
--info-light: #f0fdfa;
--info-base: #06b6d4;
--info-dark: #0e7490;
```

### 2.3 中性色 (Neutral Colors)
```css
/* 深色主题 */
--neutral-900: #111827;  /* 主背景 */
--neutral-800: #1f2937;  /* 卡片背景 */
--neutral-700: #374151;  /* 分割线 */
--neutral-600: #4b5563;  /* 次要文本 */
--neutral-500: #6b7280;  /* 占位文本 */
--neutral-400: #9ca3af;  /* 禁用文本 */
--neutral-300: #d1d5db;  /* 边框 */
--neutral-200: #e5e7eb;  /* 浅色边框 */
--neutral-100: #f3f4f6;  /* 浅色背景 */
--neutral-50: #f9fafb;   /* 最浅背景 */

/* 文本颜色 */
--text-primary: #f9fafb;    /* 主要文本 */
--text-secondary: #d1d5db;  /* 次要文本 */
--text-tertiary: #9ca3af;   /* 三级文本 */
--text-disabled: #6b7280;   /* 禁用文本 */
```

### 2.4 模块专属色 (Module Colors)
```css
/* 仪表板 - 蓝色 */
--dashboard-color: #3b82f6;
--dashboard-bg: rgba(59, 130, 246, 0.1);

/* 基础设施 - 紫色 */
--infrastructure-color: #8b5cf6;
--infrastructure-bg: rgba(139, 92, 246, 0.1);

/* 配置管理 - 绿色 */
--configuration-color: #10b981;
--configuration-bg: rgba(16, 185, 129, 0.1);

/* 运维监控 - 橙色 */
--operations-color: #f59e0b;
--operations-bg: rgba(245, 158, 11, 0.1);

/* 网络安全 - 红色 */
--security-color: #ef4444;
--security-bg: rgba(239, 68, 68, 0.1);

/* 网络服务 - 青色 */
--services-color: #06b6d4;
--services-bg: rgba(6, 182, 212, 0.1);

/* 系统管理 - 灰色 */
--system-color: #6b7280;
--system-bg: rgba(107, 114, 128, 0.1);
```

## 3. 字体系统

### 3.1 字体族
```css
/* 主字体 - 系统字体栈 */
--font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* 等宽字体 - 代码和数据 */
--font-family-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;

/* 数字字体 - 数据展示 */
--font-family-numeric: 'SF Pro Display', -apple-system, sans-serif;
```

### 3.2 字体大小
```css
/* 标题层级 */
--text-4xl: 2.25rem;  /* 36px - 页面主标题 */
--text-3xl: 1.875rem; /* 30px - 区块标题 */
--text-2xl: 1.5rem;   /* 24px - 卡片标题 */
--text-xl: 1.25rem;   /* 20px - 子标题 */
--text-lg: 1.125rem;  /* 18px - 重要内容 */

/* 内容层级 */
--text-base: 1rem;    /* 16px - 正文内容 */
--text-sm: 0.875rem;  /* 14px - 次要内容 */
--text-xs: 0.75rem;   /* 12px - 辅助信息 */
--text-2xs: 0.625rem; /* 10px - 极小文本 */
```

### 3.3 字体权重
```css
--font-thin: 100;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### 3.4 行高
```css
--leading-tight: 1.25;   /* 紧密行高 - 标题 */
--leading-normal: 1.5;   /* 标准行高 - 正文 */
--leading-relaxed: 1.75; /* 宽松行高 - 长文本 */
```

## 4. 间距系统

### 4.1 标准间距
```css
/* 基础间距单位 4px */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### 4.2 组件间距规范
```css
/* 页面级间距 */
--page-padding-x: var(--space-6);  /* 页面水平内边距 */
--page-padding-y: var(--space-6);  /* 页面垂直内边距 */

/* 卡片间距 */
--card-padding: var(--space-6);    /* 卡片内边距 */
--card-gap: var(--space-4);        /* 卡片间距 */

/* 表单间距 */
--form-item-gap: var(--space-4);   /* 表单项间距 */
--form-group-gap: var(--space-6);  /* 表单组间距 */

/* 列表间距 */
--list-item-padding: var(--space-3); /* 列表项内边距 */
--list-gap: var(--space-2);          /* 列表项间距 */
```

## 5. 组件标准

### 5.1 按钮规范
```css
/* 按钮大小 */
.btn-large {
  height: 48px;
  padding: 0 24px;
  font-size: var(--text-base);
  border-radius: 8px;
}

.btn-medium {
  height: 40px;
  padding: 0 20px;
  font-size: var(--text-sm);
  border-radius: 6px;
}

.btn-small {
  height: 32px;
  padding: 0 16px;
  font-size: var(--text-xs);
  border-radius: 4px;
}

/* 按钮类型 */
.btn-primary {
  background-color: var(--primary-500);
  color: white;
  border: 1px solid var(--primary-500);
}

.btn-secondary {
  background-color: transparent;
  color: var(--primary-500);
  border: 1px solid var(--primary-500);
}

.btn-ghost {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--neutral-300);
}
```

### 5.2 输入框规范
```css
.input-base {
  height: 40px;
  padding: 0 12px;
  background-color: var(--neutral-800);
  border: 1px solid var(--neutral-600);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: var(--text-sm);
  transition: all 0.2s ease;
}

.input-base:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

.input-base:disabled {
  background-color: var(--neutral-700);
  color: var(--text-disabled);
  cursor: not-allowed;
}
```

### 5.3 卡片规范
```css
.card-base {
  background-color: var(--neutral-800);
  border: 1px solid var(--neutral-700);
  border-radius: 12px;
  padding: var(--card-padding);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.card-hoverable:hover {
  border-color: var(--neutral-600);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--neutral-700);
}
```

### 5.4 表格规范
```css
.table-container {
  background-color: var(--neutral-800);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--neutral-700);
}

.table-header {
  background-color: var(--neutral-700);
  color: var(--text-secondary);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
}

.table-row {
  border-bottom: 1px solid var(--neutral-700);
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: var(--neutral-750);
}

.table-cell {
  padding: var(--space-3) var(--space-4);
  color: var(--text-primary);
  font-size: var(--text-sm);
}
```

## 6. 布局标准

### 6.1 页面布局结构
```css
/* 主要布局区域 */
.app-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas: 
    "sidebar header"
    "sidebar main";
  height: 100vh;
}

.app-sidebar {
  grid-area: sidebar;
  background-color: var(--neutral-900);
  border-right: 1px solid var(--neutral-700);
}

.app-header {
  grid-area: header;
  background-color: var(--neutral-800);
  border-bottom: 1px solid var(--neutral-700);
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-main {
  grid-area: main;
  background-color: var(--neutral-900);
  padding: var(--space-6);
  overflow: auto;
}
```

### 6.2 侧边栏规范
```css
.sidebar-menu {
  padding: var(--space-4) 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: var(--space-3) var(--space-6);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background-color: var(--neutral-800);
  color: var(--text-primary);
}

.menu-item.active {
  background-color: var(--primary-bg);
  color: var(--primary-500);
  border-left-color: var(--primary-500);
}

.menu-item-icon {
  width: 20px;
  height: 20px;
  margin-right: var(--space-3);
  flex-shrink: 0;
}

.menu-submenu {
  padding-left: var(--space-10);
}
```

### 6.3 内容区域布局
```css
/* 页面头部 */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--neutral-700);
}

.page-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin: 0;
}

.page-actions {
  display: flex;
  gap: var(--space-3);
}

/* 内容网格 */
.content-grid {
  display: grid;
  gap: var(--space-6);
}

.content-grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.content-grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.content-grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .content-grid-4 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .content-grid-2,
  .content-grid-3,
  .content-grid-4 { 
    grid-template-columns: 1fr; 
  }
  
  .app-layout {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "header"
      "main";
  }
  
  .app-sidebar {
    position: fixed;
    left: -280px;
    top: 0;
    width: 280px;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease;
  }
  
  .app-sidebar.open {
    left: 0;
  }
}
```

## 7. 图标系统

### 7.1 图标规范
```css
/* 图标大小 */
.icon-xs { width: 12px; height: 12px; }
.icon-sm { width: 16px; height: 16px; }
.icon-base { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }
.icon-xl { width: 32px; height: 32px; }

/* 图标颜色 */
.icon-primary { color: var(--primary-500); }
.icon-secondary { color: var(--text-secondary); }
.icon-success { color: var(--success-base); }
.icon-warning { color: var(--warning-base); }
.icon-error { color: var(--error-base); }
```

### 7.2 模块图标映射
```javascript
const moduleIcons = {
  dashboard: 'ChartBarIcon',
  infrastructure: 'ServerIcon',
  configuration: 'CogIcon',
  operations: 'MonitorIcon',
  security: 'ShieldCheckIcon',
  services: 'CloudIcon',
  system: 'WrenchIcon'
}
```

## 8. 状态系统

### 8.1 交互状态
```css
/* 悬停状态 */
.interactive:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 激活状态 */
.interactive:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 聚焦状态 */
.focusable:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 禁用状态 */
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### 8.2 数据状态
```css
/* 加载状态 */
.loading {
  position: relative;
  overflow: hidden;
}

.loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  color: var(--text-tertiary);
  text-align: center;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: var(--space-4);
  opacity: 0.5;
}
```

## 9. 动画系统

### 9.1 过渡动画
```css
/* 标准过渡 */
.transition-fast { transition: all 0.15s ease; }
.transition-base { transition: all 0.2s ease; }
.transition-slow { transition: all 0.3s ease; }

/* 专用过渡 */
.transition-colors { transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease; }
.transition-opacity { transition: opacity 0.2s ease; }
.transition-transform { transition: transform 0.2s ease; }
```

### 9.2 进入动画
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.animate-fade-in { animation: fadeIn 0.3s ease; }
.animate-slide-in-up { animation: slideInUp 0.3s ease; }
.animate-slide-in-right { animation: slideInRight 0.3s ease; }
```

## 10. 响应式设计

### 10.1 断点系统
```css
/* 断点定义 */
--breakpoint-sm: 640px;   /* 小屏设备 */
--breakpoint-md: 768px;   /* 平板设备 */
--breakpoint-lg: 1024px;  /* 笔记本 */
--breakpoint-xl: 1280px;  /* 桌面 */
--breakpoint-2xl: 1536px; /* 大屏桌面 */
```

### 10.2 响应式规则
```css
/* 移动端优先 */
.container {
  width: 100%;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { 
    max-width: 768px;
    padding: 0 var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

## 11. 可访问性标准

### 11.1 颜色对比度
- 正常文本: 对比度至少 4.5:1
- 大文本 (18px+): 对比度至少 3:1
- 图形元素: 对比度至少 3:1

### 11.2 键盘导航
```css
/* 焦点指示器 */
.focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* 跳过链接 */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-500);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

### 11.3 屏幕阅读器支持
```html
<!-- 语义化标签 -->
<main role="main">
<nav role="navigation">
<section role="region" aria-labelledby="section-title">

<!-- ARIA 标签 -->
<button aria-label="关闭对话框" aria-expanded="false">
<input aria-describedby="error-message" aria-invalid="true">
<div role="alert" id="error-message">
```

## 12. 实施指南

### 12.1 CSS 变量使用
```css
/* 在 :root 中定义全局变量 */
:root {
  /* 颜色变量 */
  --primary-500: #3b82f6;
  --neutral-800: #1f2937;
  
  /* 间距变量 */
  --space-4: 1rem;
  --space-6: 1.5rem;
  
  /* 字体变量 */
  --text-base: 1rem;
  --font-medium: 500;
}

/* 组件中使用变量 */
.button {
  background-color: var(--primary-500);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
}
```

### 12.2 主题切换支持
```css
/* 浅色主题变量 */
[data-theme="light"] {
  --neutral-900: #ffffff;
  --neutral-800: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #475569;
}

/* 深色主题变量 (默认) */
[data-theme="dark"] {
  --neutral-900: #111827;
  --neutral-800: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
}
```

### 12.3 组件库集成
```javascript
// 与 Element Plus / Ant Design Vue 集成
const customTheme = {
  token: {
    colorPrimary: '#3b82f6',
    colorBgContainer: '#1f2937',
    colorText: '#f9fafb',
    borderRadius: 6,
    // ... 其他主题变量
  }
}
```

### 12.4 开发工具配置
```json
// Tailwind CSS 配置
{
  "theme": {
    "extend": {
      "colors": {
        "primary": {
          "50": "#eff6ff",
          "500": "#3b82f6",
          "900": "#1e3a8a"
        },
        "neutral": {
          "800": "#1f2937",
          "900": "#111827"
        }
      },
      "spacing": {
        "18": "4.5rem"
      }
    }
  }
}
```

## 13. 质量检查清单

### 13.1 视觉一致性检查
- [ ] 颜色使用符合色彩系统规范
- [ ] 字体大小和权重符合层级规范
- [ ] 间距使用标准间距值
- [ ] 组件样式符合设计规范

### 13.2 交互一致性检查
- [ ] 按钮状态和行为一致
- [ ] 表单验证和反馈一致
- [ ] 加载和错误状态处理一致
- [ ] 动画过渡效果一致

### 13.3 响应式检查
- [ ] 移动端布局正常
- [ ] 各断点下样式适配
- [ ] 触摸交互友好
- [ ] 可访问性标准符合

### 13.4 性能检查
- [ ] CSS 变量使用优化
- [ ] 动画性能良好
- [ ] 图标资源优化
- [ ] 字体加载优化

这套 UI 标准方案确保了整个后台管理系统的视觉和交互一致性，支持您的 7 个主要模块和 42 个子模块的统一设计语言，同时兼顾了专业性、易用性和可维护性。