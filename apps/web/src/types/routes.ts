import { type LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Server,
  Settings,
  Activity,
  Shield,
  Globe,
  User,
  // Dashboard icons
  PieChart,
  Network,
  Monitor,
  AlertTriangle,
  BarChart3,
  FileText,
  // Infrastructure icons
  HardDrive,
  Package,
  GitBranch,
  Search,
  Users,
  Zap,
  Database,
  History,
  CheckCircle,
  // Configuration icons
  FileCode,
  Archive,
  GitCompare,
  ShieldCheck,
  Upload,
  UserCheck,
  Clock,
  Tag,
  GitPullRequest,
  RotateCcw,
  Calendar,
  Play,
  Eye,
  RefreshCw,
  Code,
  GitMerge,
  Variable,
  CloudUpload,
  // Operations icons
  Cpu,
  Wifi,
  TrendingUp,
  BarChart,
  MonitorSpeaker,
  Sliders,
  Bell,
  Workflow,
  Brain,
  Target,
  Microscope,
  Wrench,
  Sparkles,
  Copy,
  // Security icons
  ShieldUser,
  Lock,
  Scissors,
  Fingerprint,
  Gavel,
  FileSearch,
  Flame,
  Siren,
  Radar,
  Bug,
  BookOpen,
  FileCheck,
  Scale,
  Settings2,
  // Services icons
  Route,
  Link,
  Zap as Lightning,
  DollarSign,
  ShieldEllipsis,
  Container,
  Grid3x3,
  Filter,
  Gauge,
  Router,
  Maximize,
  MapPin,
  Layers,
  Send,
  FolderTree,
  AlertOctagon,
  Smartphone,
  Slice,
  Tag as DeviceTag,
  Workflow as PolicyFlow,
  Handshake,
  // System icons
  ShieldQuestion,
  Key,
  Building,
  ScrollText,
  LogIn,
  Cog,
  Wifi as NetworkIcon,
  Cylinder,
  Plug,
  CreditCard,
  HardDriveUpload,
  FileWarning,
  Terminal,
  ShieldAlert,
  FileSearch2,
  FolderOpen,
  Heart,
  ArrowUp,
  Move,
  Stethoscope
} from 'lucide-react';

export interface RouteItem {
  path: string;
  title: string;
  icon?: LucideIcon;
  children?: RouteItem[];
  requireAuth?: boolean;
  permissions?: string[];
}

export interface MenuConfig {
  routes: RouteItem[];
}

export const menuConfig: MenuConfig = {
  routes: [
    {
      path: '/dashboard',
      title: '仪表板总览',
      icon: LayoutDashboard,
      children: [
        { path: '/dashboard/overview', title: '综合概览', icon: PieChart },
        { path: '/dashboard/topology', title: '网络拓扑', icon: Network },
        { path: '/dashboard/monitoring', title: '实时监控', icon: Monitor },
        { path: '/dashboard/alerts', title: '告警中心', icon: AlertTriangle },
        { path: '/dashboard/performance', title: '性能统计', icon: BarChart3 },
        { path: '/dashboard/reports', title: '运维报告', icon: FileText }
      ]
    },
    {
      path: '/infrastructure',
      title: '基础设施管理',
      icon: Server,
      children: [
        {
          path: '/infrastructure/devices',
          title: '设备管理',
          icon: HardDrive,
          children: [
            { path: '/infrastructure/devices/list', title: '设备列表', icon: Database },
            { path: '/infrastructure/devices/discovery', title: '设备发现', icon: Search },
            { path: '/infrastructure/devices/groups', title: '设备分组', icon: Users },
            { path: '/infrastructure/devices/status', title: '设备状态', icon: Zap },
            { path: '/infrastructure/devices/info', title: '设备信息', icon: FileText },
            { path: '/infrastructure/devices/batch', title: '批量操作', icon: Play }
          ]
        },
        {
          path: '/infrastructure/firmware',
          title: '固件管理',
          icon: Package,
          children: [
            { path: '/infrastructure/firmware/repository', title: '镜像仓库', icon: Archive },
            { path: '/infrastructure/firmware/versions', title: '版本管理', icon: GitBranch },
            { path: '/infrastructure/firmware/deployment', title: '部署任务', icon: Upload },
            { path: '/infrastructure/firmware/schedule', title: '升级计划', icon: Calendar },
            { path: '/infrastructure/firmware/history', title: '部署历史', icon: History },
            { path: '/infrastructure/firmware/compatibility', title: '兼容性检查', icon: CheckCircle }
          ]
        },
        {
          path: '/infrastructure/topology',
          title: '网络拓扑',
          icon: Network,
          children: [
            { path: '/infrastructure/topology/view', title: '拓扑视图', icon: Eye },
            { path: '/infrastructure/topology/management', title: '拓扑管理', icon: Settings },
            { path: '/infrastructure/topology/connections', title: '连接关系', icon: Link },
            { path: '/infrastructure/topology/analysis', title: '拓扑分析', icon: BarChart },
            { path: '/infrastructure/topology/history', title: '拓扑历史', icon: Clock }
          ]
        }
      ]
    },
    {
      path: '/configuration',
      title: '配置管理',
      icon: Settings,
      children: [
        {
          path: '/configuration/center',
          title: '配置中心',
          icon: Settings,
          children: [
            { path: '/configuration/center/templates', title: '配置模板', icon: FileCode },
            { path: '/configuration/center/repository', title: '配置库', icon: Archive },
            { path: '/configuration/center/compare', title: '配置对比', icon: GitCompare },
            { path: '/configuration/center/validation', title: '配置验证', icon: ShieldCheck },
            { path: '/configuration/center/deployment', title: '配置部署', icon: Upload },
            { path: '/configuration/center/approval', title: '配置审核', icon: UserCheck }
          ]
        },
        {
          path: '/configuration/version',
          title: '版本管理',
          icon: GitBranch,
          children: [
            { path: '/configuration/version/history', title: '版本历史', icon: Clock },
            { path: '/configuration/version/compare', title: '版本对比', icon: GitCompare },
            { path: '/configuration/version/tags', title: '版本标签', icon: Tag },
            { path: '/configuration/version/branches', title: '分支管理', icon: GitBranch },
            { path: '/configuration/version/merge', title: '合并请求', icon: GitPullRequest },
            { path: '/configuration/version/rollback', title: '回滚管理', icon: RotateCcw }
          ]
        },
        {
          path: '/configuration/batch',
          title: '批量部署',
          icon: Play,
          children: [
            { path: '/configuration/batch/plans', title: '部署计划', icon: Calendar },
            { path: '/configuration/batch/tasks', title: '部署任务', icon: Play },
            { path: '/configuration/batch/monitoring', title: '部署监控', icon: Eye },
            { path: '/configuration/batch/history', title: '部署历史', icon: History },
            { path: '/configuration/batch/retry', title: '失败重试', icon: RefreshCw },
            { path: '/configuration/batch/reports', title: '部署报告', icon: FileText }
          ]
        },
        {
          path: '/configuration/iac',
          title: '基础设施即代码',
          icon: Code,
          children: [
            { path: '/configuration/iac/repository', title: '代码仓库', icon: Archive },
            { path: '/configuration/iac/pipeline', title: '流水线', icon: GitMerge },
            { path: '/configuration/iac/templates', title: '模板管理', icon: FileCode },
            { path: '/configuration/iac/variables', title: '变量管理', icon: Variable },
            { path: '/configuration/iac/environments', title: '部署环境', icon: CloudUpload },
            { path: '/configuration/iac/execution', title: '执行历史', icon: History }
          ]
        }
      ]
    },
    {
      path: '/operations',
      title: '运维监控',
      icon: Activity,
      children: [
        {
          path: '/operations/monitoring',
          title: '实时监控',
          icon: Monitor,
          children: [
            { path: '/operations/monitoring/devices', title: '设备监控', icon: Cpu },
            { path: '/operations/monitoring/interfaces', title: '接口监控', icon: Wifi },
            { path: '/operations/monitoring/performance', title: '性能监控', icon: TrendingUp },
            { path: '/operations/monitoring/traffic', title: '流量监控', icon: BarChart },
            { path: '/operations/monitoring/system', title: '系统监控', icon: MonitorSpeaker },
            { path: '/operations/monitoring/custom', title: '自定义监控', icon: Sliders }
          ]
        },
        {
          path: '/operations/alerts',
          title: '告警管理',
          icon: Bell,
          children: [
            { path: '/operations/alerts/rules', title: '告警规则', icon: Settings },
            { path: '/operations/alerts/events', title: '告警事件', icon: AlertTriangle },
            { path: '/operations/alerts/handling', title: '告警处理', icon: Workflow },
            { path: '/operations/alerts/statistics', title: '告警统计', icon: BarChart3 },
            { path: '/operations/alerts/notifications', title: '告警通知', icon: Bell },
            { path: '/operations/alerts/suppression', title: '告警抑制', icon: Zap }
          ]
        },
        {
          path: '/operations/aiops',
          title: '智能运维',
          icon: Brain,
          children: [
            { path: '/operations/aiops/anomaly', title: '异常检测', icon: Target },
            { path: '/operations/aiops/prediction', title: '预测分析', icon: TrendingUp },
            { path: '/operations/aiops/root-cause', title: '根因分析', icon: Microscope },
            { path: '/operations/aiops/diagnosis', title: '智能诊断', icon: Stethoscope },
            { path: '/operations/aiops/optimization', title: '优化建议', icon: Sparkles },
            { path: '/operations/aiops/auto-repair', title: '自动修复', icon: Wrench }
          ]
        },
        {
          path: '/operations/digital-twin',
          title: '数字孪生',
          icon: Copy,
          children: [
            { path: '/operations/digital-twin/models', title: '孪生模型', icon: Database },
            { path: '/operations/digital-twin/sync', title: '实时同步', icon: RefreshCw },
            { path: '/operations/digital-twin/simulation', title: '仿真测试', icon: Play },
            { path: '/operations/digital-twin/scenarios', title: '场景管理', icon: Layers },
            { path: '/operations/digital-twin/history', title: '仿真历史', icon: History },
            { path: '/operations/digital-twin/analysis', title: '分析报告', icon: FileText }
          ]
        }
      ]
    },
    {
      path: '/security',
      title: '网络安全',
      icon: Shield,
      children: [
        {
          path: '/security/zero-trust',
          title: '零信任架构',
          icon: ShieldUser,
          children: [
            { path: '/security/zero-trust/identity', title: '身份管理', icon: User },
            { path: '/security/zero-trust/access', title: '访问控制', icon: Lock },
            { path: '/security/zero-trust/segmentation', title: '网络分段', icon: Scissors },
            { path: '/security/zero-trust/device-trust', title: '设备信任', icon: Fingerprint },
            { path: '/security/zero-trust/policy', title: '策略引擎', icon: Gavel },
            { path: '/security/zero-trust/audit', title: '审计日志', icon: FileSearch }
          ]
        },
        {
          path: '/security/policies',
          title: '安全策略',
          icon: Shield,
          children: [
            { path: '/security/policies/firewall', title: '防火墙策略', icon: Flame },
            { path: '/security/policies/vpn', title: 'VPN管理', icon: Lock },
            { path: '/security/policies/access', title: '访问策略', icon: Key },
            { path: '/security/policies/rules', title: '安全规则', icon: Settings },
            { path: '/security/policies/deployment', title: '策略部署', icon: Upload },
            { path: '/security/policies/audit', title: '策略审计', icon: FileSearch }
          ]
        },
        {
          path: '/security/threat-detection',
          title: '威胁检测',
          icon: Siren,
          children: [
            { path: '/security/threat-detection/monitoring', title: '威胁监控', icon: Radar },
            { path: '/security/threat-detection/analysis', title: '威胁分析', icon: BarChart },
            { path: '/security/threat-detection/intelligence', title: '威胁情报', icon: Brain },
            { path: '/security/threat-detection/response', title: '事件响应', icon: Workflow },
            { path: '/security/threat-detection/events', title: '安全事件', icon: Bug },
            { path: '/security/threat-detection/forensics', title: '取证分析', icon: Microscope }
          ]
        },
        {
          path: '/security/compliance',
          title: '合规管理',
          icon: BookOpen,
          children: [
            { path: '/security/compliance/standards', title: '合规标准', icon: BookOpen },
            { path: '/security/compliance/checks', title: '合规检查', icon: FileCheck },
            { path: '/security/compliance/reports', title: '合规报告', icon: FileText },
            { path: '/security/compliance/risk', title: '风险评估', icon: Scale },
            { path: '/security/compliance/remediation', title: '修复建议', icon: Settings2 },
            { path: '/security/compliance/audit', title: '合规审计', icon: FileSearch }
          ]
        }
      ]
    },
    {
      path: '/services',
      title: '网络服务',
      icon: Globe,
      children: [
        {
          path: '/services/sdwan',
          title: 'SD-WAN管理',
          icon: Route,
          children: [
            { path: '/services/sdwan/branches', title: '分支管理', icon: GitBranch },
            { path: '/services/sdwan/connections', title: '连接管理', icon: Link },
            { path: '/services/sdwan/policies', title: '策略管理', icon: Settings },
            { path: '/services/sdwan/optimization', title: '流量优化', icon: Lightning },
            { path: '/services/sdwan/qos', title: 'QoS管理', icon: Gauge },
            { path: '/services/sdwan/performance', title: '性能分析', icon: BarChart }
          ]
        },
        {
          path: '/services/multi-cloud',
          title: '多云网络',
          icon: Globe,
          children: [
            { path: '/services/multi-cloud/connections', title: '云连接', icon: Link },
            { path: '/services/multi-cloud/routing', title: '跨云路由', icon: Route },
            { path: '/services/multi-cloud/traffic', title: '流量管理', icon: BarChart },
            { path: '/services/multi-cloud/cost', title: '成本优化', icon: DollarSign },
            { path: '/services/multi-cloud/security', title: '云间安全', icon: ShieldEllipsis },
            { path: '/services/multi-cloud/monitoring', title: '监控分析', icon: Monitor }
          ]
        },
        {
          path: '/services/container',
          title: '容器网络',
          icon: Container,
          children: [
            { path: '/services/container/cni', title: 'CNI管理', icon: Network },
            { path: '/services/container/mesh', title: '服务网格', icon: Grid3x3 },
            { path: '/services/container/policies', title: '网络策略', icon: Filter },
            { path: '/services/container/governance', title: '流量治理', icon: Gavel },
            { path: '/services/container/gateway', title: '安全网关', icon: Router },
            { path: '/services/container/optimization', title: '性能优化', icon: Maximize }
          ]
        },
        {
          path: '/services/edge',
          title: '边缘计算',
          icon: MapPin,
          children: [
            { path: '/services/edge/nodes', title: '边缘节点', icon: Server },
            { path: '/services/edge/orchestration', title: '网络编排', icon: Layers },
            { path: '/services/edge/distribution', title: '策略分发', icon: Send },
            { path: '/services/edge/resources', title: '资源管理', icon: FolderTree },
            { path: '/services/edge/failure', title: '故障处理', icon: AlertOctagon },
            { path: '/services/edge/monitoring', title: '性能监控', icon: Monitor }
          ]
        },
        {
          path: '/services/5g-iot',
          title: '5G/IoT管理',
          icon: Smartphone,
          children: [
            { path: '/services/5g-iot/devices', title: 'IoT设备', icon: HardDrive },
            { path: '/services/5g-iot/slicing', title: '网络切片', icon: Slice },
            { path: '/services/5g-iot/classification', title: '设备分类', icon: DeviceTag },
            { path: '/services/5g-iot/policies', title: '策略管理', icon: PolicyFlow },
            { path: '/services/5g-iot/collaboration', title: '边缘协同', icon: Handshake },
            { path: '/services/5g-iot/security', title: '安全防护', icon: Shield }
          ]
        }
      ]
    },
    {
      path: '/system',
      title: '系统管理',
      icon: User,
      children: [
        {
          path: '/system/users',
          title: '用户管理',
          icon: User,
          children: [
            { path: '/system/users/list', title: '用户列表', icon: Users },
            { path: '/system/users/roles', title: '角色管理', icon: ShieldQuestion },
            { path: '/system/users/permissions', title: '权限管理', icon: Key },
            { path: '/system/users/organization', title: '组织架构', icon: Building },
            { path: '/system/users/audit', title: '用户审计', icon: ScrollText },
            { path: '/system/users/sso', title: '单点登录', icon: LogIn }
          ]
        },
        {
          path: '/system/config',
          title: '系统配置',
          icon: Cog,
          children: [
            { path: '/system/config/basic', title: '基础配置', icon: Settings },
            { path: '/system/config/network', title: '网络配置', icon: NetworkIcon },
            { path: '/system/config/database', title: '数据库配置', icon: Cylinder },
            { path: '/system/config/integration', title: '集成配置', icon: Plug },
            { path: '/system/config/license', title: '许可证管理', icon: CreditCard },
            { path: '/system/config/backup', title: '备份恢复', icon: HardDriveUpload }
          ]
        },
        {
          path: '/system/logs',
          title: '日志审计',
          icon: FileWarning,
          children: [
            { path: '/system/logs/operations', title: '操作日志', icon: Activity },
            { path: '/system/logs/system', title: '系统日志', icon: Terminal },
            { path: '/system/logs/security', title: '安全日志', icon: ShieldAlert },
            { path: '/system/logs/audit', title: '审计报告', icon: FileText },
            { path: '/system/logs/search', title: '日志检索', icon: FileSearch2 },
            { path: '/system/logs/archive', title: '日志归档', icon: FolderOpen }
          ]
        },
        {
          path: '/system/maintenance',
          title: '系统维护',
          icon: Wrench,
          children: [
            { path: '/system/maintenance/status', title: '系统状态', icon: Monitor },
            { path: '/system/maintenance/performance', title: '性能监控', icon: TrendingUp },
            { path: '/system/maintenance/health', title: '健康检查', icon: Heart },
            { path: '/system/maintenance/upgrade', title: '系统升级', icon: ArrowUp },
            { path: '/system/maintenance/migration', title: '数据迁移', icon: Move },
            { path: '/system/maintenance/diagnosis', title: '故障诊断', icon: Stethoscope }
          ]
        }
      ]
    }
  ]
};