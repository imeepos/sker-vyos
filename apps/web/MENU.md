# 后台管理系统菜单结构设计

## 菜单结构概述

基于VyOS API企业级网络自动化综合解决方案的18个核心功能模块，设计分层菜单结构，包含7个一级菜单和42个二级菜单，覆盖网络管理的全部功能领域。

## 完整菜单结构

### 1. 仪表板总览 (Dashboard)
**路由前缀**: `/dashboard`

```
仪表板总览
├── 综合概览 (/dashboard/overview)
├── 网络拓扑 (/dashboard/topology)
├── 实时监控 (/dashboard/monitoring)
├── 告警中心 (/dashboard/alerts)
├── 性能统计 (/dashboard/performance)
└── 运维报告 (/dashboard/reports)
```

---

### 2. 基础设施管理 (Infrastructure)
**路由前缀**: `/infrastructure`

#### 2.1 设备管理 (/infrastructure/devices)
```
设备管理
├── 设备列表 (/infrastructure/devices/list)
├── 设备发现 (/infrastructure/devices/discovery)
├── 设备分组 (/infrastructure/devices/groups)
├── 设备状态 (/infrastructure/devices/status)
├── 设备信息 (/infrastructure/devices/info)
└── 批量操作 (/infrastructure/devices/batch)
```

#### 2.2 固件管理 (/infrastructure/firmware)
```
固件管理
├── 镜像仓库 (/infrastructure/firmware/repository)
├── 版本管理 (/infrastructure/firmware/versions)
├── 部署任务 (/infrastructure/firmware/deployment)
├── 升级计划 (/infrastructure/firmware/schedule)
├── 部署历史 (/infrastructure/firmware/history)
└── 兼容性检查 (/infrastructure/firmware/compatibility)
```

#### 2.3 网络拓扑 (/infrastructure/topology)
```
网络拓扑
├── 拓扑视图 (/infrastructure/topology/view)
├── 拓扑管理 (/infrastructure/topology/management)
├── 连接关系 (/infrastructure/topology/connections)
├── 拓扑分析 (/infrastructure/topology/analysis)
└── 拓扑历史 (/infrastructure/topology/history)
```

---

### 3. 配置管理 (Configuration)
**路由前缀**: `/configuration`

#### 3.1 配置中心 (/configuration/center)
```
配置中心
├── 配置模板 (/configuration/center/templates)
├── 配置库 (/configuration/center/repository)
├── 配置对比 (/configuration/center/compare)
├── 配置验证 (/configuration/center/validation)
├── 配置部署 (/configuration/center/deployment)
└── 配置审核 (/configuration/center/approval)
```

#### 3.2 版本管理 (/configuration/version)
```
版本管理
├── 版本历史 (/configuration/version/history)
├── 版本对比 (/configuration/version/compare)
├── 版本标签 (/configuration/version/tags)
├── 分支管理 (/configuration/version/branches)
├── 合并请求 (/configuration/version/merge)
└── 回滚管理 (/configuration/version/rollback)
```

#### 3.3 批量部署 (/configuration/batch)
```
批量部署
├── 部署计划 (/configuration/batch/plans)
├── 部署任务 (/configuration/batch/tasks)
├── 部署监控 (/configuration/batch/monitoring)
├── 部署历史 (/configuration/batch/history)
├── 失败重试 (/configuration/batch/retry)
└── 部署报告 (/configuration/batch/reports)
```

#### 3.4 基础设施即代码 (/configuration/iac)
```
基础设施即代码
├── 代码仓库 (/configuration/iac/repository)
├── 流水线 (/configuration/iac/pipeline)
├── 模板管理 (/configuration/iac/templates)
├── 变量管理 (/configuration/iac/variables)
├── 部署环境 (/configuration/iac/environments)
└── 执行历史 (/configuration/iac/execution)
```

---

### 4. 运维监控 (Operations)
**路由前缀**: `/operations`

#### 4.1 实时监控 (/operations/monitoring)
```
实时监控
├── 设备监控 (/operations/monitoring/devices)
├── 接口监控 (/operations/monitoring/interfaces)
├── 性能监控 (/operations/monitoring/performance)
├── 流量监控 (/operations/monitoring/traffic)
├── 系统监控 (/operations/monitoring/system)
└── 自定义监控 (/operations/monitoring/custom)
```

#### 4.2 告警管理 (/operations/alerts)
```
告警管理
├── 告警规则 (/operations/alerts/rules)
├── 告警事件 (/operations/alerts/events)
├── 告警处理 (/operations/alerts/handling)
├── 告警统计 (/operations/alerts/statistics)
├── 告警通知 (/operations/alerts/notifications)
└── 告警抑制 (/operations/alerts/suppression)
```

#### 4.3 智能运维 (/operations/aiops)
```
智能运维
├── 异常检测 (/operations/aiops/anomaly)
├── 预测分析 (/operations/aiops/prediction)
├── 根因分析 (/operations/aiops/root-cause)
├── 智能诊断 (/operations/aiops/diagnosis)
├── 优化建议 (/operations/aiops/optimization)
└── 自动修复 (/operations/aiops/auto-repair)
```

#### 4.4 数字孪生 (/operations/digital-twin)
```
数字孪生
├── 孪生模型 (/operations/digital-twin/models)
├── 实时同步 (/operations/digital-twin/sync)
├── 仿真测试 (/operations/digital-twin/simulation)
├── 场景管理 (/operations/digital-twin/scenarios)
├── 仿真历史 (/operations/digital-twin/history)
└── 分析报告 (/operations/digital-twin/analysis)
```

---

### 5. 网络安全 (Security)
**路由前缀**: `/security`

#### 5.1 零信任架构 (/security/zero-trust)
```
零信任架构
├── 身份管理 (/security/zero-trust/identity)
├── 访问控制 (/security/zero-trust/access)
├── 网络分段 (/security/zero-trust/segmentation)
├── 设备信任 (/security/zero-trust/device-trust)
├── 策略引擎 (/security/zero-trust/policy)
└── 审计日志 (/security/zero-trust/audit)
```

#### 5.2 安全策略 (/security/policies)
```
安全策略
├── 防火墙策略 (/security/policies/firewall)
├── VPN管理 (/security/policies/vpn)
├── 访问策略 (/security/policies/access)
├── 安全规则 (/security/policies/rules)
├── 策略部署 (/security/policies/deployment)
└── 策略审计 (/security/policies/audit)
```

#### 5.3 威胁检测 (/security/threat-detection)
```
威胁检测
├── 威胁监控 (/security/threat-detection/monitoring)
├── 威胁分析 (/security/threat-detection/analysis)
├── 威胁情报 (/security/threat-detection/intelligence)
├── 事件响应 (/security/threat-detection/response)
├── 安全事件 (/security/threat-detection/events)
└── 取证分析 (/security/threat-detection/forensics)
```

#### 5.4 合规管理 (/security/compliance)
```
合规管理
├── 合规标准 (/security/compliance/standards)
├── 合规检查 (/security/compliance/checks)
├── 合规报告 (/security/compliance/reports)
├── 风险评估 (/security/compliance/risk)
├── 修复建议 (/security/compliance/remediation)
└── 合规审计 (/security/compliance/audit)
```

---

### 6. 网络服务 (Services)
**路由前缀**: `/services`

#### 6.1 SD-WAN管理 (/services/sdwan)
```
SD-WAN管理
├── 分支管理 (/services/sdwan/branches)
├── 连接管理 (/services/sdwan/connections)
├── 策略管理 (/services/sdwan/policies)
├── 流量优化 (/services/sdwan/optimization)
├── QoS管理 (/services/sdwan/qos)
└── 性能分析 (/services/sdwan/performance)
```

#### 6.2 多云网络 (/services/multi-cloud)
```
多云网络
├── 云连接 (/services/multi-cloud/connections)
├── 跨云路由 (/services/multi-cloud/routing)
├── 流量管理 (/services/multi-cloud/traffic)
├── 成本优化 (/services/multi-cloud/cost)
├── 云间安全 (/services/multi-cloud/security)
└── 监控分析 (/services/multi-cloud/monitoring)
```

#### 6.3 容器网络 (/services/container)
```
容器网络
├── CNI管理 (/services/container/cni)
├── 服务网格 (/services/container/mesh)
├── 网络策略 (/services/container/policies)
├── 流量治理 (/services/container/governance)
├── 安全网关 (/services/container/gateway)
└── 性能优化 (/services/container/optimization)
```

#### 6.4 边缘计算 (/services/edge)
```
边缘计算
├── 边缘节点 (/services/edge/nodes)
├── 网络编排 (/services/edge/orchestration)
├── 策略分发 (/services/edge/distribution)
├── 资源管理 (/services/edge/resources)
├── 故障处理 (/services/edge/failure)
└── 性能监控 (/services/edge/monitoring)
```

#### 6.5 5G/IoT管理 (/services/5g-iot)
```
5G/IoT管理
├── IoT设备 (/services/5g-iot/devices)
├── 网络切片 (/services/5g-iot/slicing)
├── 设备分类 (/services/5g-iot/classification)
├── 策略管理 (/services/5g-iot/policies)
├── 边缘协同 (/services/5g-iot/collaboration)
└── 安全防护 (/services/5g-iot/security)
```

---

### 7. 系统管理 (System)
**路由前缀**: `/system`

#### 7.1 用户管理 (/system/users)
```
用户管理
├── 用户列表 (/system/users/list)
├── 角色管理 (/system/users/roles)
├── 权限管理 (/system/users/permissions)
├── 组织架构 (/system/users/organization)
├── 用户审计 (/system/users/audit)
└── 单点登录 (/system/users/sso)
```

#### 7.2 系统配置 (/system/config)
```
系统配置
├── 基础配置 (/system/config/basic)
├── 网络配置 (/system/config/network)
├── 数据库配置 (/system/config/database)
├── 集成配置 (/system/config/integration)
├── 许可证管理 (/system/config/license)
└── 备份恢复 (/system/config/backup)
```

#### 7.3 日志审计 (/system/logs)
```
日志审计
├── 操作日志 (/system/logs/operations)
├── 系统日志 (/system/logs/system)
├── 安全日志 (/system/logs/security)
├── 审计报告 (/system/logs/audit)
├── 日志检索 (/system/logs/search)
└── 日志归档 (/system/logs/archive)
```

#### 7.4 系统维护 (/system/maintenance)
```
系统维护
├── 系统状态 (/system/maintenance/status)
├── 性能监控 (/system/maintenance/performance)
├── 健康检查 (/system/maintenance/health)
├── 系统升级 (/system/maintenance/upgrade)
├── 数据迁移 (/system/maintenance/migration)
└── 故障诊断 (/system/maintenance/diagnosis)
```

---

## 菜单权限控制

### 角色权限分级

#### 超级管理员 (Super Admin)
- 拥有所有菜单的完全访问权限
- 可以管理用户和角色权限
- 可以进行系统级配置和维护

#### 网络管理员 (Network Admin)
- 基础设施管理：完全访问
- 配置管理：完全访问
- 运维监控：完全访问
- 网络安全：完全访问
- 网络服务：完全访问
- 系统管理：只读权限

#### 运维工程师 (Operations Engineer)
- 基础设施管理：只读权限
- 配置管理：部分权限（不含批量部署）
- 运维监控：完全访问
- 网络安全：只读权限
- 网络服务：只读权限
- 系统管理：无权限

#### 安全管理员 (Security Admin)
- 基础设施管理：只读权限
- 配置管理：只读权限
- 运维监控：只读权限
- 网络安全：完全访问
- 网络服务：部分权限（仅安全相关）
- 系统管理：日志审计权限

#### 只读用户 (Read Only)
- 所有模块：只读权限
- 可查看仪表板和报告
- 无操作权限

### 菜单动态显示规则

```javascript
// 菜单权限检查示例
const menuPermissions = {
  '/dashboard': ['super_admin', 'network_admin', 'ops_engineer', 'security_admin', 'read_only'],
  '/infrastructure/devices/batch': ['super_admin', 'network_admin'],
  '/configuration/batch': ['super_admin', 'network_admin'],
  '/security': ['super_admin', 'network_admin', 'security_admin'],
  '/system/users': ['super_admin'],
  // ... 其他权限配置
}
```

## 路由配置示例

### Vue Router 配置结构

```javascript
const routes = [
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { title: '仪表板总览', icon: 'dashboard' },
    children: [
      {
        path: 'overview',
        component: () => import('@/views/dashboard/Overview.vue'),
        meta: { title: '综合概览', keepAlive: true }
      },
      {
        path: 'topology',
        component: () => import('@/views/dashboard/Topology.vue'),
        meta: { title: '网络拓扑' }
      }
      // ... 其他子路由
    ]
  },
  {
    path: '/infrastructure',
    component: InfrastructureLayout,
    meta: { title: '基础设施管理', icon: 'infrastructure' },
    children: [
      {
        path: 'devices',
        component: RouterView,
        meta: { title: '设备管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/infrastructure/devices/List.vue'),
            meta: { title: '设备列表' }
          }
          // ... 其他设备管理子路由
        ]
      }
      // ... 其他基础设施子路由
    ]
  }
  // ... 其他一级路由
]
```

## 菜单组件设计建议

### 侧边栏菜单组件

```vue
<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="isCollapse"
    :unique-opened="false"
    :collapse-transition="false"
    mode="vertical"
    @select="handleMenuSelect"
  >
    <sidebar-item
      v-for="route in routes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    />
  </el-menu>
</template>
```

### 面包屑导航

```vue
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :key="item.path"
    >
      <span v-if="item.redirect === 'noRedirect' || index === breadcrumbList.length - 1">
        {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
```

## 菜单图标映射

```javascript
const menuIcons = {
  'dashboard': 'el-icon-odometer',
  'infrastructure': 'el-icon-cpu',
  'configuration': 'el-icon-setting',
  'operations': 'el-icon-monitor',
  'security': 'el-icon-lock',
  'services': 'el-icon-connection',
  'system': 'el-icon-tools'
}
```

## 实施建议

1. **渐进式实现**: 按优先级逐步实现各个菜单功能
2. **权限预留**: 预留权限扩展接口，便于后续功能增加
3. **响应式设计**: 确保菜单在不同设备上的良好体验
4. **性能优化**: 使用路由懒加载和菜单权限缓存
5. **国际化支持**: 预留多语言支持接口

这个菜单结构设计充分覆盖了综合方案中的所有功能模块，提供了清晰的导航层次和完整的权限控制机制，能够支撑大型企业级网络管理系统的复杂功能需求。