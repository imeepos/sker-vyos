import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { TodoPage } from '@/components/common/TodoPage';
import { DashboardOverview } from '@/views/dashboard/Overview';
import { Topology } from '@/views/dashboard/topology/Topology';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/overview" replace />
      },
      // Dashboard routes
      {
        path: 'dashboard/overview',
        element: <DashboardOverview />
      },
      {
        path: 'dashboard/topology',
        element: <Topology />
      },
      {
        path: 'dashboard/monitoring',
        element: <TodoPage title="实时监控" description="实时监控页面" />
      },
      {
        path: 'dashboard/alerts',
        element: <TodoPage title="告警中心" description="告警中心页面" />
      },
      {
        path: 'dashboard/performance',
        element: <TodoPage title="性能统计" description="性能统计页面" />
      },
      {
        path: 'dashboard/reports',
        element: <TodoPage title="运维报告" description="运维报告页面" />
      },
      
      // Infrastructure - Devices routes
      {
        path: 'infrastructure/devices/list',
        element: <TodoPage title="设备列表" description="设备列表管理页面" />
      },
      {
        path: 'infrastructure/devices/discovery',
        element: <TodoPage title="设备发现" description="设备发现页面" />
      },
      {
        path: 'infrastructure/devices/groups',
        element: <TodoPage title="设备分组" description="设备分组管理页面" />
      },
      {
        path: 'infrastructure/devices/status',
        element: <TodoPage title="设备状态" description="设备状态监控页面" />
      },
      {
        path: 'infrastructure/devices/info',
        element: <TodoPage title="设备信息" description="设备详细信息页面" />
      },
      {
        path: 'infrastructure/devices/batch',
        element: <TodoPage title="批量操作" description="设备批量操作页面" />
      },
      
      // Infrastructure - Firmware routes
      {
        path: 'infrastructure/firmware/repository',
        element: <TodoPage title="镜像仓库" description="固件镜像仓库管理页面" />
      },
      {
        path: 'infrastructure/firmware/versions',
        element: <TodoPage title="版本管理" description="固件版本管理页面" />
      },
      {
        path: 'infrastructure/firmware/deployment',
        element: <TodoPage title="部署任务" description="固件部署任务页面" />
      },
      {
        path: 'infrastructure/firmware/schedule',
        element: <TodoPage title="升级计划" description="固件升级计划页面" />
      },
      {
        path: 'infrastructure/firmware/history',
        element: <TodoPage title="部署历史" description="固件部署历史页面" />
      },
      {
        path: 'infrastructure/firmware/compatibility',
        element: <TodoPage title="兼容性检查" description="固件兼容性检查页面" />
      },
      
      // Infrastructure - Topology routes
      {
        path: 'infrastructure/topology/view',
        element: <TodoPage title="拓扑视图" description="网络拓扑视图页面" />
      },
      {
        path: 'infrastructure/topology/management',
        element: <TodoPage title="拓扑管理" description="拓扑管理页面" />
      },
      {
        path: 'infrastructure/topology/connections',
        element: <TodoPage title="连接关系" description="网络连接关系页面" />
      },
      {
        path: 'infrastructure/topology/analysis',
        element: <TodoPage title="拓扑分析" description="网络拓扑分析页面" />
      },
      {
        path: 'infrastructure/topology/history',
        element: <TodoPage title="拓扑历史" description="拓扑变更历史页面" />
      },
      
      // Configuration - Center routes
      {
        path: 'configuration/center/templates',
        element: <TodoPage title="配置模板" description="配置模板管理页面" />
      },
      {
        path: 'configuration/center/repository',
        element: <TodoPage title="配置库" description="配置库管理页面" />
      },
      {
        path: 'configuration/center/compare',
        element: <TodoPage title="配置对比" description="配置对比页面" />
      },
      {
        path: 'configuration/center/validation',
        element: <TodoPage title="配置验证" description="配置验证页面" />
      },
      {
        path: 'configuration/center/deployment',
        element: <TodoPage title="配置部署" description="配置部署页面" />
      },
      {
        path: 'configuration/center/approval',
        element: <TodoPage title="配置审核" description="配置审核页面" />
      },
      
      // Configuration - Version routes
      {
        path: 'configuration/version/history',
        element: <TodoPage title="版本历史" description="配置版本历史页面" />
      },
      {
        path: 'configuration/version/compare',
        element: <TodoPage title="版本对比" description="配置版本对比页面" />
      },
      {
        path: 'configuration/version/tags',
        element: <TodoPage title="版本标签" description="版本标签管理页面" />
      },
      {
        path: 'configuration/version/branches',
        element: <TodoPage title="分支管理" description="配置分支管理页面" />
      },
      {
        path: 'configuration/version/merge',
        element: <TodoPage title="合并请求" description="配置合并请求页面" />
      },
      {
        path: 'configuration/version/rollback',
        element: <TodoPage title="回滚管理" description="配置回滚管理页面" />
      },
      
      // Configuration - Batch routes
      {
        path: 'configuration/batch/plans',
        element: <TodoPage title="部署计划" description="批量部署计划页面" />
      },
      {
        path: 'configuration/batch/tasks',
        element: <TodoPage title="部署任务" description="批量部署任务页面" />
      },
      {
        path: 'configuration/batch/monitoring',
        element: <TodoPage title="部署监控" description="部署监控页面" />
      },
      {
        path: 'configuration/batch/history',
        element: <TodoPage title="部署历史" description="批量部署历史页面" />
      },
      {
        path: 'configuration/batch/retry',
        element: <TodoPage title="失败重试" description="部署失败重试页面" />
      },
      {
        path: 'configuration/batch/reports',
        element: <TodoPage title="部署报告" description="批量部署报告页面" />
      },
      
      // Configuration - IaC routes
      {
        path: 'configuration/iac/repository',
        element: <TodoPage title="代码仓库" description="IaC代码仓库管理页面" />
      },
      {
        path: 'configuration/iac/pipeline',
        element: <TodoPage title="流水线" description="IaC流水线管理页面" />
      },
      {
        path: 'configuration/iac/templates',
        element: <TodoPage title="模板管理" description="IaC模板管理页面" />
      },
      {
        path: 'configuration/iac/variables',
        element: <TodoPage title="变量管理" description="IaC变量管理页面" />
      },
      {
        path: 'configuration/iac/environments',
        element: <TodoPage title="部署环境" description="IaC部署环境管理页面" />
      },
      {
        path: 'configuration/iac/execution',
        element: <TodoPage title="执行历史" description="IaC执行历史页面" />
      },
      
      // Operations - Monitoring routes
      {
        path: 'operations/monitoring/devices',
        element: <TodoPage title="设备监控" description="设备监控页面" />
      },
      {
        path: 'operations/monitoring/interfaces',
        element: <TodoPage title="接口监控" description="接口监控页面" />
      },
      {
        path: 'operations/monitoring/performance',
        element: <TodoPage title="性能监控" description="性能监控页面" />
      },
      {
        path: 'operations/monitoring/traffic',
        element: <TodoPage title="流量监控" description="流量监控页面" />
      },
      {
        path: 'operations/monitoring/system',
        element: <TodoPage title="系统监控" description="系统监控页面" />
      },
      {
        path: 'operations/monitoring/custom',
        element: <TodoPage title="自定义监控" description="自定义监控页面" />
      },
      
      // Operations - Alerts routes
      {
        path: 'operations/alerts/rules',
        element: <TodoPage title="告警规则" description="告警规则管理页面" />
      },
      {
        path: 'operations/alerts/events',
        element: <TodoPage title="告警事件" description="告警事件页面" />
      },
      {
        path: 'operations/alerts/handling',
        element: <TodoPage title="告警处理" description="告警处理页面" />
      },
      {
        path: 'operations/alerts/statistics',
        element: <TodoPage title="告警统计" description="告警统计页面" />
      },
      {
        path: 'operations/alerts/notifications',
        element: <TodoPage title="告警通知" description="告警通知管理页面" />
      },
      {
        path: 'operations/alerts/suppression',
        element: <TodoPage title="告警抑制" description="告警抑制管理页面" />
      },
      
      // Operations - AIOps routes
      {
        path: 'operations/aiops/anomaly',
        element: <TodoPage title="异常检测" description="智能异常检测页面" />
      },
      {
        path: 'operations/aiops/prediction',
        element: <TodoPage title="预测分析" description="智能预测分析页面" />
      },
      {
        path: 'operations/aiops/root-cause',
        element: <TodoPage title="根因分析" description="智能根因分析页面" />
      },
      {
        path: 'operations/aiops/diagnosis',
        element: <TodoPage title="智能诊断" description="智能诊断页面" />
      },
      {
        path: 'operations/aiops/optimization',
        element: <TodoPage title="优化建议" description="智能优化建议页面" />
      },
      {
        path: 'operations/aiops/auto-repair',
        element: <TodoPage title="自动修复" description="智能自动修复页面" />
      },
      
      // Operations - Digital Twin routes
      {
        path: 'operations/digital-twin/models',
        element: <TodoPage title="孪生模型" description="数字孪生模型管理页面" />
      },
      {
        path: 'operations/digital-twin/sync',
        element: <TodoPage title="实时同步" description="孪生模型实时同步页面" />
      },
      {
        path: 'operations/digital-twin/simulation',
        element: <TodoPage title="仿真测试" description="网络仿真测试页面" />
      },
      {
        path: 'operations/digital-twin/scenarios',
        element: <TodoPage title="场景管理" description="仿真场景管理页面" />
      },
      {
        path: 'operations/digital-twin/history',
        element: <TodoPage title="仿真历史" description="仿真历史记录页面" />
      },
      {
        path: 'operations/digital-twin/analysis',
        element: <TodoPage title="分析报告" description="数字孪生分析报告页面" />
      },
      
      // Security - Zero Trust routes
      {
        path: 'security/zero-trust/identity',
        element: <TodoPage title="身份管理" description="零信任身份管理页面" />
      },
      {
        path: 'security/zero-trust/access',
        element: <TodoPage title="访问控制" description="零信任访问控制页面" />
      },
      {
        path: 'security/zero-trust/segmentation',
        element: <TodoPage title="网络分段" description="零信任网络分段页面" />
      },
      {
        path: 'security/zero-trust/device-trust',
        element: <TodoPage title="设备信任" description="零信任设备信任页面" />
      },
      {
        path: 'security/zero-trust/policy',
        element: <TodoPage title="策略引擎" description="零信任策略引擎页面" />
      },
      {
        path: 'security/zero-trust/audit',
        element: <TodoPage title="审计日志" description="零信任审计日志页面" />
      },
      
      // Security - Policies routes
      {
        path: 'security/policies/firewall',
        element: <TodoPage title="防火墙策略" description="防火墙策略管理页面" />
      },
      {
        path: 'security/policies/vpn',
        element: <TodoPage title="VPN管理" description="VPN管理页面" />
      },
      {
        path: 'security/policies/access',
        element: <TodoPage title="访问策略" description="访问策略管理页面" />
      },
      {
        path: 'security/policies/rules',
        element: <TodoPage title="安全规则" description="安全规则管理页面" />
      },
      {
        path: 'security/policies/deployment',
        element: <TodoPage title="策略部署" description="安全策略部署页面" />
      },
      {
        path: 'security/policies/audit',
        element: <TodoPage title="策略审计" description="安全策略审计页面" />
      },
      
      // Security - Threat Detection routes
      {
        path: 'security/threat-detection/monitoring',
        element: <TodoPage title="威胁监控" description="威胁监控页面" />
      },
      {
        path: 'security/threat-detection/analysis',
        element: <TodoPage title="威胁分析" description="威胁分析页面" />
      },
      {
        path: 'security/threat-detection/intelligence',
        element: <TodoPage title="威胁情报" description="威胁情报页面" />
      },
      {
        path: 'security/threat-detection/response',
        element: <TodoPage title="事件响应" description="安全事件响应页面" />
      },
      {
        path: 'security/threat-detection/events',
        element: <TodoPage title="安全事件" description="安全事件管理页面" />
      },
      {
        path: 'security/threat-detection/forensics',
        element: <TodoPage title="取证分析" description="安全取证分析页面" />
      },
      
      // Security - Compliance routes
      {
        path: 'security/compliance/standards',
        element: <TodoPage title="合规标准" description="合规标准管理页面" />
      },
      {
        path: 'security/compliance/checks',
        element: <TodoPage title="合规检查" description="合规检查页面" />
      },
      {
        path: 'security/compliance/reports',
        element: <TodoPage title="合规报告" description="合规报告页面" />
      },
      {
        path: 'security/compliance/risk',
        element: <TodoPage title="风险评估" description="风险评估页面" />
      },
      {
        path: 'security/compliance/remediation',
        element: <TodoPage title="修复建议" description="合规修复建议页面" />
      },
      {
        path: 'security/compliance/audit',
        element: <TodoPage title="合规审计" description="合规审计页面" />
      },
      
      // Services - SD-WAN routes
      {
        path: 'services/sdwan/branches',
        element: <TodoPage title="分支管理" description="SD-WAN分支管理页面" />
      },
      {
        path: 'services/sdwan/connections',
        element: <TodoPage title="连接管理" description="SD-WAN连接管理页面" />
      },
      {
        path: 'services/sdwan/policies',
        element: <TodoPage title="策略管理" description="SD-WAN策略管理页面" />
      },
      {
        path: 'services/sdwan/optimization',
        element: <TodoPage title="流量优化" description="SD-WAN流量优化页面" />
      },
      {
        path: 'services/sdwan/qos',
        element: <TodoPage title="QoS管理" description="SD-WAN QoS管理页面" />
      },
      {
        path: 'services/sdwan/performance',
        element: <TodoPage title="性能分析" description="SD-WAN性能分析页面" />
      },
      
      // Services - Multi-Cloud routes
      {
        path: 'services/multi-cloud/connections',
        element: <TodoPage title="云连接" description="多云连接管理页面" />
      },
      {
        path: 'services/multi-cloud/routing',
        element: <TodoPage title="跨云路由" description="跨云路由管理页面" />
      },
      {
        path: 'services/multi-cloud/traffic',
        element: <TodoPage title="流量管理" description="多云流量管理页面" />
      },
      {
        path: 'services/multi-cloud/cost',
        element: <TodoPage title="成本优化" description="多云成本优化页面" />
      },
      {
        path: 'services/multi-cloud/security',
        element: <TodoPage title="云间安全" description="云间安全管理页面" />
      },
      {
        path: 'services/multi-cloud/monitoring',
        element: <TodoPage title="监控分析" description="多云监控分析页面" />
      },
      
      // Services - Container routes
      {
        path: 'services/container/cni',
        element: <TodoPage title="CNI管理" description="容器CNI管理页面" />
      },
      {
        path: 'services/container/mesh',
        element: <TodoPage title="服务网格" description="服务网格管理页面" />
      },
      {
        path: 'services/container/policies',
        element: <TodoPage title="网络策略" description="容器网络策略页面" />
      },
      {
        path: 'services/container/governance',
        element: <TodoPage title="流量治理" description="容器流量治理页面" />
      },
      {
        path: 'services/container/gateway',
        element: <TodoPage title="安全网关" description="容器安全网关页面" />
      },
      {
        path: 'services/container/optimization',
        element: <TodoPage title="性能优化" description="容器性能优化页面" />
      },
      
      // Services - Edge routes
      {
        path: 'services/edge/nodes',
        element: <TodoPage title="边缘节点" description="边缘节点管理页面" />
      },
      {
        path: 'services/edge/orchestration',
        element: <TodoPage title="网络编排" description="边缘网络编排页面" />
      },
      {
        path: 'services/edge/distribution',
        element: <TodoPage title="策略分发" description="边缘策略分发页面" />
      },
      {
        path: 'services/edge/resources',
        element: <TodoPage title="资源管理" description="边缘资源管理页面" />
      },
      {
        path: 'services/edge/failure',
        element: <TodoPage title="故障处理" description="边缘故障处理页面" />
      },
      {
        path: 'services/edge/monitoring',
        element: <TodoPage title="性能监控" description="边缘性能监控页面" />
      },
      
      // Services - 5G/IoT routes
      {
        path: 'services/5g-iot/devices',
        element: <TodoPage title="IoT设备" description="IoT设备管理页面" />
      },
      {
        path: 'services/5g-iot/slicing',
        element: <TodoPage title="网络切片" description="5G网络切片管理页面" />
      },
      {
        path: 'services/5g-iot/classification',
        element: <TodoPage title="设备分类" description="IoT设备分类管理页面" />
      },
      {
        path: 'services/5g-iot/policies',
        element: <TodoPage title="策略管理" description="5G/IoT策略管理页面" />
      },
      {
        path: 'services/5g-iot/collaboration',
        element: <TodoPage title="边缘协同" description="5G/IoT边缘协同页面" />
      },
      {
        path: 'services/5g-iot/security',
        element: <TodoPage title="安全防护" description="5G/IoT安全防护页面" />
      },
      
      // System - Users routes
      {
        path: 'system/users/list',
        element: <TodoPage title="用户列表" description="系统用户列表管理页面" />
      },
      {
        path: 'system/users/roles',
        element: <TodoPage title="角色管理" description="系统角色管理页面" />
      },
      {
        path: 'system/users/permissions',
        element: <TodoPage title="权限管理" description="系统权限管理页面" />
      },
      {
        path: 'system/users/organization',
        element: <TodoPage title="组织架构" description="组织架构管理页面" />
      },
      {
        path: 'system/users/audit',
        element: <TodoPage title="用户审计" description="用户操作审计页面" />
      },
      {
        path: 'system/users/sso',
        element: <TodoPage title="单点登录" description="单点登录配置页面" />
      },
      
      // System - Config routes
      {
        path: 'system/config/basic',
        element: <TodoPage title="基础配置" description="系统基础配置页面" />
      },
      {
        path: 'system/config/network',
        element: <TodoPage title="网络配置" description="系统网络配置页面" />
      },
      {
        path: 'system/config/database',
        element: <TodoPage title="数据库配置" description="数据库配置管理页面" />
      },
      {
        path: 'system/config/integration',
        element: <TodoPage title="集成配置" description="系统集成配置页面" />
      },
      {
        path: 'system/config/license',
        element: <TodoPage title="许可证管理" description="系统许可证管理页面" />
      },
      {
        path: 'system/config/backup',
        element: <TodoPage title="备份恢复" description="系统备份恢复页面" />
      },
      
      // System - Logs routes
      {
        path: 'system/logs/operations',
        element: <TodoPage title="操作日志" description="系统操作日志页面" />
      },
      {
        path: 'system/logs/system',
        element: <TodoPage title="系统日志" description="系统日志查看页面" />
      },
      {
        path: 'system/logs/security',
        element: <TodoPage title="安全日志" description="系统安全日志页面" />
      },
      {
        path: 'system/logs/audit',
        element: <TodoPage title="审计报告" description="系统审计报告页面" />
      },
      {
        path: 'system/logs/search',
        element: <TodoPage title="日志检索" description="日志检索查询页面" />
      },
      {
        path: 'system/logs/archive',
        element: <TodoPage title="日志归档" description="日志归档管理页面" />
      },
      
      // System - Maintenance routes
      {
        path: 'system/maintenance/status',
        element: <TodoPage title="系统状态" description="系统状态监控页面" />
      },
      {
        path: 'system/maintenance/performance',
        element: <TodoPage title="性能监控" description="系统性能监控页面" />
      },
      {
        path: 'system/maintenance/health',
        element: <TodoPage title="健康检查" description="系统健康检查页面" />
      },
      {
        path: 'system/maintenance/upgrade',
        element: <TodoPage title="系统升级" description="系统升级管理页面" />
      },
      {
        path: 'system/maintenance/migration',
        element: <TodoPage title="数据迁移" description="数据迁移管理页面" />
      },
      {
        path: 'system/maintenance/diagnosis',
        element: <TodoPage title="故障诊断" description="系统故障诊断页面" />
      }
    ]
  }
]);