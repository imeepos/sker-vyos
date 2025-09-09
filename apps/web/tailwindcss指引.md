# Tailwind CSS 设计规范指引

基于当前项目的设计规范，本文档提供 Tailwind CSS 使用技巧和注意事项，确保视觉一致性。

## 📋 目录

- [设计令牌系统](#设计令牌系统)
- [颜色规范](#颜色规范)
- [Shadcn/UI 组件库](#shadcnui-组件库)
- [组件样式规范](#组件样式规范)
- [布局规范](#布局规范)
- [响应式设计](#响应式设计)
- [最佳实践](#最佳实践)

## 🎨 设计令牌系统

### CSS 变量配置

项目使用 CSS 变量作为设计令牌，支持主题切换：

```css
:root {
  /* 主色调 */
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  
  /* 文本颜色 */
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  
  /* 模块色彩 */
  --dashboard-color: #3b82f6;
  --infrastructure-color: #8b5cf6;
}
```

### 优势
- 支持动态主题切换
- 保持视觉一致性
- 便于维护和更新

## 🌈 颜色规范

### 主色调系统
使用标准化的色彩等级（50-900）：

```html
<!-- ✅ 推荐使用 -->
<button class="bg-primary-500 hover:bg-primary-600 text-white">
  主要按钮
</button>

<!-- ❌ 避免使用 -->
<button class="bg-blue-500 text-white">按钮</button>
```

## 🧩 Shadcn/UI 组件库

项目集成了 Shadcn/UI 组件库，提供了一套现代化、可定制的 React 组件。

### 已安装组件

```bash
# 添加组件命令
pnpm dlx shadcn@latest add [component-name]

# 已安装的组件
- button       # 按钮组件
- card         # 卡片组件  
- input        # 输入框组件
- label        # 标签组件
- dialog       # 对话框组件
- table        # 表格组件
- tabs         # 标签页组件
- accordion    # 手风琴组件
- alert-dialog # 警告对话框
- avatar       # 头像组件
- badge        # 徽章组件
- checkbox     # 复选框组件
- dropdown-menu # 下拉菜单
- popover      # 弹出框组件
- select       # 选择器组件
- separator    # 分割线组件
- switch       # 开关组件
- tooltip      # 工具提示
```

### Shadcn 组件使用示例

```tsx
// 导入组件
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// 使用示例
function ExampleForm() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>登录</CardTitle>
        <CardDescription>输入您的账户信息</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input id="email" type="email" placeholder="请输入邮箱" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">密码</Label>
          <Input id="password" type="password" placeholder="请输入密码" />
        </div>
        <Button className="w-full">登录</Button>
      </CardContent>
    </Card>
  )
}
```

### 组件定制

Shadcn/UI 组件使用 CSS 变量进行主题定制：

```css
/* 在 src/index.css 中已配置 */
:root {
  --background: 222.2 84% 4.9%;     /* 背景色 */
  --foreground: 210 40% 98%;        /* 前景色 */
  --primary: 217.2 91.2% 59.8%;     /* 主色 */
  --secondary: 217.2 32.6% 17.5%;   /* 次要色 */
  --muted: 217.2 32.6% 17.5%;       /* 静默色 */
  --accent: 217.2 32.6% 17.5%;      /* 强调色 */
  --destructive: 0 62.8% 30.6%;     /* 危险色 */
  --border: 217.2 32.6% 17.5%;      /* 边框色 */
  --input: 217.2 32.6% 17.5%;       /* 输入框色 */
  --ring: 217.2 91.2% 59.8%;        /* 焦点环色 */
}
```

### 功能色彩

| 用途 | 类名 | 色值 |
|------|------|------|
| 成功 | `text-success-base` | #10b981 |
| 警告 | `text-warning-base` | #f59e0b |
| 错误 | `text-error-base` | #ef4444 |
| 信息 | `text-info-base` | #06b6d4 |

### 模块专用色彩

```html
<!-- 仪表板模块 -->
<div class="text-dashboard bg-dashboard">仪表板</div>

<!-- 基础设施模块 -->
<div class="text-infrastructure bg-infrastructure">基础设施</div>

<!-- 配置管理模块 -->
<div class="text-configuration bg-configuration">配置管理</div>
```

### 中性色规范

```html
<!-- 文本层级 -->
<h1 class="text-primary">主要标题</h1>
<p class="text-secondary">次要文本</p>
<span class="text-tertiary">辅助文本</span>
<span class="text-disabled">禁用文本</span>

<!-- 背景层级 -->
<div class="bg-neutral-900">主背景</div>
<div class="bg-neutral-800">卡片背景</div>
<div class="bg-neutral-700">边框</div>
```

## 🧩 组件样式规范

### 按钮组件

```html
<!-- 主要按钮 -->
<button class="btn btn-primary btn-medium">
  主要操作
</button>

<!-- 次要按钮 -->
<button class="btn btn-secondary btn-medium">
  次要操作
</button>

<!-- 幽灵按钮 -->
<button class="btn btn-ghost btn-medium">
  取消
</button>

<!-- 尺寸变体 -->
<button class="btn btn-primary btn-large">大按钮</button>
<button class="btn btn-primary btn-medium">中按钮</button>
<button class="btn btn-primary btn-small">小按钮</button>
```

### 输入框组件

```html
<!-- 标准输入框 -->
<input type="text" class="input-base" placeholder="请输入内容">

<!-- 带图标的输入框 -->
<div class="relative">
  <input type="text" class="input-base pl-10" placeholder="搜索">
  <div class="absolute left-3 top-1/2 -translate-y-1/2">
    <icon class="icon-sm text-neutral-500" />
  </div>
</div>
```

### 卡片组件

```html
<!-- 基础卡片 -->
<div class="card">
  <div class="card-header">
    <h3>卡片标题</h3>
  </div>
  <p>卡片内容</p>
</div>

<!-- 可悬停卡片 -->
<div class="card card-hoverable">
  <p>悬停有动效的卡片</p>
</div>
```

### 表格组件

```html
<div class="table-container">
  <table class="w-full">
    <thead>
      <tr class="table-header">
        <th class="table-cell">标题</th>
      </tr>
    </thead>
    <tbody>
      <tr class="table-row">
        <td class="table-cell">内容</td>
      </tr>
    </tbody>
  </table>
</div>
```

## 📐 布局规范

### 应用布局

```html
<div class="app-layout">
  <aside class="app-sidebar">
    <!-- 侧边栏内容 -->
  </aside>
  
  <header class="app-header">
    <!-- 顶部导航 -->
  </header>
  
  <main class="app-main">
    <!-- 主要内容 -->
  </main>
</div>
```

### 页面结构

```html
<div class="app-main">
  <!-- 页面头部 -->
  <div class="page-header">
    <h1 class="page-title">页面标题</h1>
    <div class="page-actions">
      <button class="btn btn-primary btn-medium">新建</button>
    </div>
  </div>
  
  <!-- 内容网格 -->
  <div class="content-grid content-grid-3">
    <div class="card">内容1</div>
    <div class="card">内容2</div>
    <div class="card">内容3</div>
  </div>
</div>
```

### 网格系统

```html
<!-- 2列网格 -->
<div class="content-grid content-grid-2">
  <!-- 内容 -->
</div>

<!-- 3列网格 -->
<div class="content-grid content-grid-3">
  <!-- 内容 -->
</div>

<!-- 4列网格 -->
<div class="content-grid content-grid-4">
  <!-- 内容 -->
</div>
```

### 菜单导航

```html
<nav>
  <a href="#" class="menu-item active">
    <icon class="menu-item-icon" />
    当前页面
  </a>
  
  <a href="#" class="menu-item">
    <icon class="menu-item-icon" />
    其他页面
  </a>
</nav>
```

## 📱 响应式设计

### 断点系统

```css
/* 移动端优先 */
sm: 640px   /* 小屏幕 */
md: 768px   /* 平板 */
lg: 1024px  /* 桌面 */
xl: 1280px  /* 大屏幕 */
2xl: 1536px /* 超大屏幕 */
```

### 响应式用法

```html
<!-- 响应式网格 -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
  <!-- 移动端1列，平板2列，桌面3列 -->
</div>

<!-- 响应式间距 -->
<div class="p-4 lg:p-6">
  <!-- 小屏幕 16px 内边距，大屏幕 24px -->
</div>

<!-- 响应式文本 -->
<h1 class="text-xl lg:text-2xl">
  <!-- 响应式标题大小 -->
</h1>
```

## 💡 最佳实践

### ✅ 推荐做法

1. **使用语义化类名**
```html
<!-- 好 -->
<button class="btn btn-primary">提交</button>

<!-- 不好 -->
<button class="bg-blue-500 px-4 py-2 rounded">提交</button>
```

2. **保持一致的间距**
```html
<!-- 使用标准间距变量 -->
<div class="p-6 mb-4 space-y-3">
```

3. **正确使用颜色层级**
```html
<!-- 文本层级清晰 -->
<h1 class="text-primary">主标题</h1>
<p class="text-secondary">说明文字</p>
```

4. **利用CSS变量**
```css
/* 自定义样式时使用CSS变量 */
.custom-element {
  color: var(--text-primary);
  background: var(--dashboard-bg);
}
```

### ❌ 避免的做法

1. **避免硬编码颜色**
```html
<!-- 不好 -->
<div class="bg-gray-800 text-white">

<!-- 好 -->
<div class="bg-neutral-800 text-primary">
```

2. **避免过度嵌套**
```html
<!-- 不好 -->
<div class="p-4">
  <div class="p-4">
    <div class="p-4">内容</div>
  </div>
</div>

<!-- 好 -->
<div class="p-12">内容</div>
```

3. **避免重复样式**
```html
<!-- 不好 -->
<button class="bg-primary-500 text-white px-6 py-2 rounded">按钮1</button>
<button class="bg-primary-500 text-white px-6 py-2 rounded">按钮2</button>

<!-- 好 -->
<button class="btn btn-primary btn-medium">按钮1</button>
<button class="btn btn-primary btn-medium">按钮2</button>
```

## 🎯 状态样式

### 加载状态

```html
<div class="loading">
  <div class="card">加载中的内容</div>
</div>
```

### 空状态

```html
<div class="empty-state">
  <div class="empty-icon">
    <!-- 空状态图标 -->
  </div>
  <p>暂无数据</p>
</div>
```

### 过渡动画

```html
<!-- 快速过渡 -->
<div class="transition-fast">

<!-- 标准过渡 -->
<div class="transition-base">

<!-- 慢速过渡 -->
<div class="transition-slow">
```

## 🔧 工具类

### 图标尺寸

```html
<icon class="icon-xs">   <!-- 12px -->
<icon class="icon-sm">   <!-- 16px -->
<icon class="icon-base"> <!-- 20px -->
<icon class="icon-lg">   <!-- 24px -->
<icon class="icon-xl">   <!-- 32px -->
```

### 文本工具类

```html
<span class="text-primary">主要文本</span>
<span class="text-secondary">次要文本</span>
<span class="text-tertiary">辅助文本</span>
<span class="text-disabled">禁用文本</span>
```

## 🌓 主题支持

### 深色主题（默认）

项目默认使用深色主题，通过CSS变量实现：

```css
:root {
  color-scheme: dark;
  color: var(--text-primary);
  background-color: var(--neutral-900);
}
```

### 浅色主题

```html
<html data-theme="light">
  <!-- 浅色主题内容 -->
</html>
```

### 主题切换

```javascript
// 切换到浅色主题
document.documentElement.setAttribute('data-theme', 'light');

// 切换到深色主题
document.documentElement.removeAttribute('data-theme');
```

## 📝 总结

遵循本指引可以确保：

1. **视觉一致性** - 统一的设计语言
2. **开发效率** - 预定义的组件样式
3. **维护便利** - 基于CSS变量的主题系统
4. **响应式友好** - 移动端优先的设计理念
5. **可扩展性** - 模块化的样式架构

记住：始终优先使用预定义的组件类名，避免重复造轮子，保持代码的一致性和可维护性。