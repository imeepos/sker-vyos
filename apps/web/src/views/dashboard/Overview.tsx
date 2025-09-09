import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Database, 
  Globe, 
  HardDrive, 
  MemoryStick, 
  Monitor, 
  Network, 
  Router, 
  Shield, 
  TrendingUp, 
  Users, 
  Wifi, 
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Eye,
  Bell,
  BarChart3
} from 'lucide-react';

export function DashboardOverview() {
  const deviceStats = {
    total: 128,
    online: 112,
    offline: 16,
    warning: 8
  };

  const trafficStats = {
    total: "2.4 Gbps",
    inbound: "1.3 Gbps", 
    outbound: "1.1 Gbps"
  };

  const alertStats = {
    critical: 3,
    warning: 12,
    info: 24
  };

  const systemResources = {
    cpu: 68,
    memory: 74,
    disk: 45,
    bandwidth: 82
  };

  const recentAlerts = [
    {
      id: 1,
      level: 'critical',
      time: '2分钟前',
      device: 'Router-01',
      message: 'CPU使用率超过90%'
    },
    {
      id: 2,
      level: 'warning',
      time: '5分钟前',
      device: 'Switch-03',
      message: '接口eth0流量异常'
    },
    {
      id: 3,
      level: 'critical',
      time: '8分钟前',
      device: 'Firewall-02',
      message: '连接数超过阈值'
    },
    {
      id: 4,
      level: 'info',
      time: '12分钟前',
      device: 'Router-05',
      message: '固件升级完成'
    },
    {
      id: 5,
      level: 'warning',
      time: '15分钟前',
      device: 'Switch-07',
      message: '端口状态变更'
    }
  ];

  const quickActions = [
    {
      title: '设备管理',
      description: '查看和管理网络设备',
      icon: Router,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/30'
    },
    {
      title: '配置部署',
      description: '部署配置到设备',
      icon: Settings,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-950/30'
    },
    {
      title: '监控告警',
      description: '查看系统监控和告警',
      icon: Monitor,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-950/30'
    },
    {
      title: '系统设置',
      description: '系统配置和管理',
      icon: Database,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/30'
    }
  ];

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'text-red-500 bg-red-50';
      case 'warning':
        return 'text-orange-500 bg-orange-50';
      case 'info':
        return 'text-blue-500 bg-blue-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return XCircle;
      case 'warning':
        return AlertCircle;
      case 'info':
        return CheckCircle2;
      default:
        return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">综合概览</h1>
          <p className="text-muted-foreground">网络基础设施整体状态监控</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            系统正常
          </Badge>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            刷新数据
          </Button>
        </div>
      </div>

      {/* 顶部指标卡片区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 设备统计卡片 */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">设备统计</p>
              <div className="flex items-center space-x-2 mt-2">
                <h3 className="text-2xl font-bold">{deviceStats.total}</h3>
                <Badge variant="secondary">总设备</Badge>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Router className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                在线设备
              </span>
              <span className="font-medium">{deviceStats.online}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                离线设备
              </span>
              <span className="font-medium">{deviceStats.offline}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                告警设备
              </span>
              <span className="font-medium">{deviceStats.warning}</span>
            </div>
          </div>
        </Card>

        {/* 流量统计卡片 */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">流量统计</p>
              <div className="flex items-center space-x-2 mt-2">
                <h3 className="text-2xl font-bold">{trafficStats.total}</h3>
                <Badge variant="secondary">总流量</Badge>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Network className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <ArrowDownRight className="w-3 h-3 text-blue-500 mr-2" />
                入站流量
              </span>
              <span className="font-medium">{trafficStats.inbound}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <ArrowUpRight className="w-3 h-3 text-orange-500 mr-2" />
                出站流量
              </span>
              <span className="font-medium">{trafficStats.outbound}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <TrendingUp className="w-3 h-3 text-green-500 mr-2" />
                增长趋势
              </span>
              <span className="font-medium text-green-600">+12%</span>
            </div>
          </div>
        </Card>

        {/* 告警统计卡片 */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">告警统计</p>
              <div className="flex items-center space-x-2 mt-2">
                <h3 className="text-2xl font-bold">{alertStats.critical + alertStats.warning + alertStats.info}</h3>
                <Badge variant="secondary">总告警</Badge>
              </div>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <Bell className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <XCircle className="w-3 h-3 text-red-500 mr-2" />
                严重告警
              </span>
              <span className="font-medium text-red-600">{alertStats.critical}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <AlertCircle className="w-3 h-3 text-orange-500 mr-2" />
                警告告警
              </span>
              <span className="font-medium text-orange-600">{alertStats.warning}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <CheckCircle2 className="w-3 h-3 text-blue-500 mr-2" />
                信息告警
              </span>
              <span className="font-medium text-blue-600">{alertStats.info}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 中部图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 网络拓扑图 */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">网络拓扑图</h3>
            <Button variant="outline" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              查看详情
            </Button>
          </div>
          <div className="h-64 bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/5 dark:to-primary/10 rounded-lg flex items-center justify-center border">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Router className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success-base rounded-full border-2 border-background shadow-sm"></div>
              </div>
              <p className="text-sm font-medium text-foreground">核心路由器</p>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-success-base rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Wifi className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">交换机</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-warning-base rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">防火墙</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-info-base rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">终端</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 系统资源监控 */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">系统资源监控</h3>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              详细报告
            </Button>
          </div>
          <div className="space-y-4">
            {/* CPU使用率 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <Cpu className="w-4 h-4 text-blue-500 mr-2" />
                  CPU使用率
                </span>
                <span className="font-medium">{systemResources.cpu}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${systemResources.cpu}%` }}
                ></div>
              </div>
            </div>

            {/* 内存使用率 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <MemoryStick className="w-4 h-4 text-green-500 mr-2" />
                  内存使用率
                </span>
                <span className="font-medium">{systemResources.memory}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${systemResources.memory}%` }}
                ></div>
              </div>
            </div>

            {/* 磁盘使用率 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <HardDrive className="w-4 h-4 text-orange-500 mr-2" />
                  磁盘使用率
                </span>
                <span className="font-medium">{systemResources.disk}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${systemResources.disk}%` }}
                ></div>
              </div>
            </div>

            {/* 网络带宽 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <Activity className="w-4 h-4 text-purple-500 mr-2" />
                  网络带宽
                </span>
                <span className="font-medium">{systemResources.bandwidth}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${systemResources.bandwidth}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 底部信息区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最新告警列表 */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">最新告警</h3>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              查看全部
            </Button>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin">
            {recentAlerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.level);
              return (
                <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent/5 transition-colors">
                  <div className={`p-1 rounded-full ${getAlertColor(alert.level)}`}>
                    <AlertIcon className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{alert.device}</p>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="hover:bg-accent hover:text-accent-foreground">
                    处理
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>

        {/* 快速操作面板 */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">快速操作</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const ActionIcon = action.icon;
              return (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md hover:bg-accent/5 hover:border-accent transition-all group"
                >
                  <div className={`p-3 rounded-full ${action.bg} group-hover:scale-105 transition-transform`}>
                    <ActionIcon className={`w-6 h-6 ${action.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm text-foreground group-hover:text-accent-foreground transition-colors">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}