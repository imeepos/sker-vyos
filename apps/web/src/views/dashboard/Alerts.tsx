import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  XCircle,
  Clock,
  Search,
  RefreshCw,
  Bell,
  Users,
  CheckCircle2,
  TrendingUp,
  Download,
  Settings,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Router,
  Activity,
  Zap,
  Shield
} from 'lucide-react';

// 模拟数据
const alertsOverview = {
  totalActive: 47,
  todayNew: 12,
  processed: 156,
  avgHandleTime: '15分钟'
};

const alertCountByLevel = {
  critical: 8,
  warning: 23,
  info: 16
};

const alertEvents = [
  {
    id: 1,
    level: 'critical',
    title: 'CPU使用率异常',
    description: 'Router-Core-01的CPU使用率持续超过90%，可能影响网络性能',
    device: 'Router-Core-01',
    deviceType: 'router',
    source: 'System Monitor',
    timestamp: '2024-01-20 14:30:25',
    duration: '25分钟',
    status: 'new',
    assignee: null,
    category: 'performance'
  },
  {
    id: 2,
    level: 'critical',
    title: '接口链路中断',
    description: 'Switch-Access-03的GigabitEthernet0/1接口状态异常，链路中断',
    device: 'Switch-Access-03',
    deviceType: 'switch',
    source: 'SNMP Monitor',
    timestamp: '2024-01-20 14:25:10',
    duration: '30分钟',
    status: 'acknowledged',
    assignee: '张工程师',
    category: 'connectivity'
  },
  {
    id: 3,
    level: 'warning',
    title: '内存使用率告警',
    description: 'Firewall-Edge-02内存使用率达到75%，建议关注',
    device: 'Firewall-Edge-02',
    deviceType: 'firewall',
    source: 'Resource Monitor',
    timestamp: '2024-01-20 14:20:15',
    duration: '35分钟',
    status: 'processing',
    assignee: '李运维',
    category: 'performance'
  },
  {
    id: 4,
    level: 'warning',
    title: '带宽使用率偏高',
    description: 'WAN链路带宽使用率达到80%，接近阈值',
    device: 'Router-WAN-01',
    deviceType: 'router',
    source: 'Traffic Monitor',
    timestamp: '2024-01-20 14:15:30',
    duration: '40分钟',
    status: 'new',
    assignee: null,
    category: 'traffic'
  },
  {
    id: 5,
    level: 'info',
    title: '固件升级完成',
    description: 'Switch-Core-05固件从v2.1.3成功升级到v2.2.0',
    device: 'Switch-Core-05',
    deviceType: 'switch',
    source: 'Firmware Manager',
    timestamp: '2024-01-20 14:10:45',
    duration: '45分钟',
    status: 'closed',
    assignee: '王管理员',
    category: 'maintenance'
  },
  {
    id: 6,
    level: 'critical',
    title: '连接数超限',
    description: 'Load-Balancer-01当前并发连接数超过配置阈值',
    device: 'Load-Balancer-01',
    deviceType: 'load-balancer',
    source: 'Connection Monitor',
    timestamp: '2024-01-20 14:05:20',
    duration: '50分钟',
    status: 'acknowledged',
    assignee: '赵工程师',
    category: 'capacity'
  },
  {
    id: 7,
    level: 'warning',
    title: '磁盘空间不足',
    description: 'Server-Log-01的/var/log分区使用率达到85%',
    device: 'Server-Log-01',
    deviceType: 'server',
    source: 'Storage Monitor',
    timestamp: '2024-01-20 13:58:35',
    duration: '57分钟',
    status: 'processing',
    assignee: '陈运维',
    category: 'storage'
  },
  {
    id: 8,
    level: 'info',
    title: '备份任务完成',
    description: '配置备份任务成功完成，共备份35个设备配置',
    device: 'Backup-Server-01',
    deviceType: 'server',
    source: 'Backup System',
    timestamp: '2024-01-20 13:45:12',
    duration: '70分钟',
    status: 'closed',
    assignee: '系统自动',
    category: 'maintenance'
  }
];

const trendData = [
  { time: '00:00', critical: 2, warning: 5, info: 8 },
  { time: '04:00', critical: 1, warning: 7, info: 12 },
  { time: '08:00', critical: 4, warning: 15, info: 20 },
  { time: '12:00', critical: 6, warning: 18, info: 25 },
  { time: '16:00', critical: 8, warning: 23, info: 16 },
  { time: '20:00', critical: 5, warning: 12, info: 10 }
];

export function DashboardAlerts() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'text-red-500 border-red-200 bg-red-50';
      case 'warning':
        return 'text-orange-500 border-orange-200 bg-orange-50';
      case 'info':
        return 'text-blue-500 border-blue-200 bg-blue-50';
      default:
        return 'text-slate-500 border-slate-200 bg-slate-50';
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return XCircle;
      case 'warning':
        return AlertTriangle;
      case 'info':
        return Info;
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'acknowledged':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'closed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return '新建';
      case 'acknowledged':
        return '已确认';
      case 'processing':
        return '处理中';
      case 'closed':
        return '已关闭';
      default:
        return '未知';
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'router':
        return Router;
      case 'switch':
        return Activity;
      case 'firewall':
        return Shield;
      case 'server':
        return Zap;
      default:
        return Router;
    }
  };

  const filteredAlerts = alertEvents.filter(alert => {
    const matchLevel = filterLevel === 'all' || alert.level === filterLevel;
    const matchStatus = filterStatus === 'all' || alert.status === filterStatus;
    const matchSearch = searchQuery === '' || 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchLevel && matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="absolute inset-0 overflow-auto p-6 space-y-6 scrollbar-thin">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">告警中心</h1>
          <p className="text-slate-300">集中展示和管理所有系统告警</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm text-slate-300">
            <span>自动刷新</span>
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新数据
          </Button>
        </div>
      </div>

      {/* 告警统计仪表盘区域 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-slate-800/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">活跃告警总数</p>
              <h3 className="text-2xl font-bold text-white mt-2">{alertsOverview.totalActive}</h3>
            </div>
            <div className="p-3 bg-blue-950/50 rounded-full">
              <Bell className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">今日新增</p>
              <h3 className="text-2xl font-bold text-white mt-2">{alertsOverview.todayNew}</h3>
            </div>
            <div className="p-3 bg-orange-950/50 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">已处理告警</p>
              <h3 className="text-2xl font-bold text-white mt-2">{alertsOverview.processed}</h3>
            </div>
            <div className="p-3 bg-green-950/50 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">平均处理时间</p>
              <h3 className="text-2xl font-bold text-white mt-2">{alertsOverview.avgHandleTime}</h3>
            </div>
            <div className="p-3 bg-purple-950/50 rounded-full">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* 告警级别统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-slate-800/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">严重告警</p>
              <div className="flex items-center space-x-2 mt-2">
                <h3 className="text-2xl font-bold text-red-400">{alertCountByLevel.critical}</h3>
                <Badge variant="outline" className="bg-red-950/50 text-red-300 border-red-800">
                  Critical
                </Badge>
              </div>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <div className="mt-4 text-xs text-slate-400">
            与昨日对比 <span className="text-red-400">+2</span>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">警告告警</p>
              <div className="flex items-center space-x-2 mt-2">
                <h3 className="text-2xl font-bold text-orange-400">{alertCountByLevel.warning}</h3>
                <Badge variant="outline" className="bg-orange-950/50 text-orange-300 border-orange-800">
                  Warning
                </Badge>
              </div>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
          <div className="mt-4 text-xs text-slate-400">
            与昨日对比 <span className="text-orange-400">+5</span>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/60">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">信息告警</p>
              <div className="flex items-center space-x-2 mt-2">
                <h3 className="text-2xl font-bold text-blue-400">{alertCountByLevel.info}</h3>
                <Badge variant="outline" className="bg-blue-950/50 text-blue-300 border-blue-800">
                  Info
                </Badge>
              </div>
            </div>
            <Info className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-4 text-xs text-slate-400">
            与昨日对比 <span className="text-blue-400">-3</span>
          </div>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧告警事件列表 */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/60">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">告警事件列表</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="bg-transparent text-slate-300 hover:bg-slate-700/50 border-slate-600">
                    <Download className="w-4 h-4 mr-2" />
                    导出
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent text-slate-300 hover:bg-slate-700/50 border-slate-600">
                    <Settings className="w-4 h-4 mr-2" />
                    批量操作
                  </Button>
                </div>
              </div>

              {/* 筛选和搜索 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="搜索告警内容、设备名称..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all">全部级别</SelectItem>
                    <SelectItem value="critical">严重</SelectItem>
                    <SelectItem value="warning">警告</SelectItem>
                    <SelectItem value="info">信息</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="new">新建</SelectItem>
                    <SelectItem value="acknowledged">已确认</SelectItem>
                    <SelectItem value="processing">处理中</SelectItem>
                    <SelectItem value="closed">已关闭</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700/50 hover:bg-slate-700/30">
                    <TableHead className="text-slate-300">级别</TableHead>
                    <TableHead className="text-slate-300">告警标题</TableHead>
                    <TableHead className="text-slate-300">设备</TableHead>
                    <TableHead className="text-slate-300">状态</TableHead>
                    <TableHead className="text-slate-300">持续时间</TableHead>
                    <TableHead className="text-slate-300">负责人</TableHead>
                    <TableHead className="text-slate-300">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAlerts.map((alert) => {
                    const AlertIcon = getAlertIcon(alert.level);
                    const DeviceIcon = getDeviceIcon(alert.deviceType);
                    
                    return (
                      <TableRow 
                        key={alert.id} 
                        className="border-slate-700/50 hover:bg-slate-700/30 cursor-pointer"
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <AlertIcon className={`w-4 h-4 ${getAlertColor(alert.level).split(' ')[0]}`} />
                            <span className={`text-xs px-2 py-1 rounded ${getAlertColor(alert.level)}`}>
                              {alert.level.toUpperCase()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-48">
                            <p className="font-medium text-white truncate">{alert.title}</p>
                            <p className="text-xs text-slate-400 truncate">{alert.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <DeviceIcon className="w-4 h-4 text-slate-400" />
                            <span className="text-white">{alert.device}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(alert.status)}>
                            {getStatusText(alert.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">{alert.duration}</TableCell>
                        <TableCell className="text-slate-300">
                          {alert.assignee || '未分配'}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-slate-300 hover:bg-slate-700/50">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* 分页 */}
            <div className="p-6 border-t border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-300">
                  共 {filteredAlerts.length} 条告警，显示第 {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredAlerts.length)} 条
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="bg-transparent text-slate-300 hover:bg-slate-700/50 border-slate-600"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-slate-300">
                    {currentPage} / {totalPages}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="bg-transparent text-slate-300 hover:bg-slate-700/50 border-slate-600"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 右侧告警趋势图表和操作面板 */}
        <div className="space-y-6">
          {/* 告警趋势图表 */}
          <Card className="p-6 bg-slate-800/60">
            <h3 className="text-lg font-semibold text-white mb-4">告警趋势图表</h3>
            <div className="h-64 bg-slate-700/30 rounded-lg flex items-center justify-center border border-slate-600/50">
              <div className="text-center space-y-4">
                <BarChart3 className="w-12 h-12 text-slate-400 mx-auto" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-300">24小时告警趋势</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {trendData.slice(-3).map((data, index) => (
                      <div key={index} className="text-center">
                        <div className="text-slate-400">{data.time}</div>
                        <div className="space-y-1 mt-1">
                          <div className="text-red-400">严重: {data.critical}</div>
                          <div className="text-orange-400">警告: {data.warning}</div>
                          <div className="text-blue-400">信息: {data.info}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* 快速操作面板 */}
          <Card className="p-6 bg-slate-800/60">
            <h3 className="text-lg font-semibold text-white mb-4">快速操作面板</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-red-900/30 hover:bg-red-900/50 text-red-300 border-red-800">
                <AlertTriangle className="w-4 h-4 mr-2" />
                确认严重告警
              </Button>
              <Button className="w-full justify-start bg-orange-900/30 hover:bg-orange-900/50 text-orange-300 border-orange-800">
                <Users className="w-4 h-4 mr-2" />
                批量分配处理人
              </Button>
              <Button className="w-full justify-start bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 border-blue-800">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                批量更新状态
              </Button>
              <Button className="w-full justify-start bg-green-900/30 hover:bg-green-900/50 text-green-300 border-green-800">
                <Download className="w-4 h-4 mr-2" />
                生成告警报告
              </Button>
              <Separator className="bg-slate-600/50" />
              <Button className="w-full justify-start bg-slate-700/50 hover:bg-slate-700/80 text-slate-300">
                <Settings className="w-4 h-4 mr-2" />
                告警规则配置
              </Button>
              <Button className="w-full justify-start bg-slate-700/50 hover:bg-slate-700/80 text-slate-300">
                <Bell className="w-4 h-4 mr-2" />
                通知设置
              </Button>
            </div>
          </Card>

          {/* 告警详情面板 */}
          {selectedAlert && (
            <Card className="p-6 bg-slate-800/60">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">告警详情</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedAlert(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {(() => {
                      const AlertIcon = getAlertIcon(selectedAlert.level);
                      return <AlertIcon className={`w-4 h-4 ${getAlertColor(selectedAlert.level).split(' ')[0]}`} />;
                    })()}
                    <span className="font-medium text-white">{selectedAlert.title}</span>
                  </div>
                  <p className="text-sm text-slate-300">{selectedAlert.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">设备:</span>
                    <p className="text-white">{selectedAlert.device}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">来源:</span>
                    <p className="text-white">{selectedAlert.source}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">时间:</span>
                    <p className="text-white">{selectedAlert.timestamp}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">持续时间:</span>
                    <p className="text-white">{selectedAlert.duration}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full bg-blue-900/30 hover:bg-blue-900/50 text-blue-300">
                    确认告警
                  </Button>
                  <Button className="w-full bg-green-900/30 hover:bg-green-900/50 text-green-300">
                    分配处理人
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}