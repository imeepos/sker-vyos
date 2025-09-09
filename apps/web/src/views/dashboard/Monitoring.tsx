import React, { useState, useEffect } from 'react';
import './monitoring.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Network, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Settings, 
  Download, 
  Maximize2, 
  RefreshCw,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Wifi,
  Server
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  percentage?: number;
  trend?: 'up' | 'down' | 'stable';
  status?: 'normal' | 'warning' | 'critical';
  icon: React.ReactNode;
}

interface AlertEvent {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'critical';
  source: string;
  message: string;
  acknowledged: boolean;
}

interface DeviceStatus {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning';
  responseTime: number;
  temperature: number;
  version: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  percentage, 
  trend = 'stable', 
  status = 'normal',
  icon 
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-emerald-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-400" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'warning': return 'border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-500/10 to-transparent';
      case 'critical': return 'border-l-4 border-l-red-500 bg-gradient-to-r from-red-500/10 to-transparent';
      default: return 'border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-500/10 to-transparent';
    }
  };

  return (
    <Card className={`${getStatusColor()} transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-slate-200">
          {title}
        </CardTitle>
        <div className="flex items-center space-x-2">
          {getTrendIcon()}
          <div className="p-1.5 rounded-lg bg-slate-700/50">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-3xl font-bold font-numeric text-white">
          {value}
          {unit && <span className="text-base text-slate-400 ml-1">{unit}</span>}
        </div>
        {percentage !== undefined && (
          <div className="mt-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-slate-400">使用率</span>
              <span className="text-xs font-bold text-white">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2.5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const MonitoringPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('1h');
  const [refreshInterval, setRefreshInterval] = useState('30s');
  const [isRealTime, setIsRealTime] = useState(true);
  const [selectedInterface, setSelectedInterface] = useState('all');

  // 模拟数据状态
  const [cpuUsage] = useState(67);
  const [memoryUsage] = useState(84);
  const [diskUsage] = useState(43);
  const [networkTraffic] = useState({ in: 125.6, out: 89.3 });

  const [alertEvents] = useState<AlertEvent[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 300000),
      level: 'warning',
      source: 'eth0',
      message: '接口流量超过阈值 80%',
      acknowledged: false
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 600000),
      level: 'critical',
      source: 'CPU',
      message: 'CPU 使用率持续超过 90%',
      acknowledged: true
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 900000),
      level: 'info',
      source: 'Memory',
      message: '内存使用率恢复正常',
      acknowledged: true
    }
  ]);

  const [deviceStatuses] = useState<DeviceStatus[]>([
    {
      id: '1',
      name: 'vyos-gw-01',
      type: 'Gateway',
      status: 'online',
      responseTime: 12,
      temperature: 45,
      version: '1.4.0'
    },
    {
      id: '2',
      name: 'vyos-sw-01',
      type: 'Switch',
      status: 'warning',
      responseTime: 28,
      temperature: 62,
      version: '1.4.0'
    },
    {
      id: '3',
      name: 'vyos-fw-01',
      type: 'Firewall',
      status: 'online',
      responseTime: 8,
      temperature: 38,
      version: '1.4.0'
    }
  ]);

  const getStatusIcon = (status: DeviceStatus['status']) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case 'offline': return <XCircle className="h-4 w-4 text-red-400" />;
    }
  };

  const getStatusBadgeColor = (status: DeviceStatus['status']) => {
    switch (status) {
      case 'online': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'warning': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'offline': return 'bg-red-500/20 text-red-300 border-red-500/30';
    }
  };

  const getAlertLevelColor = (level: AlertEvent['level']) => {
    switch (level) {
      case 'critical': return 'bg-red-500 text-white';
      case 'warning': return 'bg-amber-500 text-white';
      case 'error': return 'bg-red-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const getAlertBorderColor = (level: AlertEvent['level']) => {
    switch (level) {
      case 'critical': return 'border-l-red-500 bg-gradient-to-r from-red-500/10 to-transparent';
      case 'warning': return 'border-l-amber-500 bg-gradient-to-r from-amber-500/10 to-transparent';
      case 'error': return 'border-l-red-500 bg-gradient-to-r from-red-500/10 to-transparent';
      default: return 'border-l-blue-500 bg-gradient-to-r from-blue-500/10 to-transparent';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 60) return `${minutes}分钟前`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}小时前`;
    const days = Math.floor(hours / 24);
    return `${days}天前`;
  };

  useEffect(() => {
    if (isRealTime && refreshInterval !== 'manual') {
      const interval = parseInt(refreshInterval.replace('s', '')) * 1000;
      const timer = setInterval(() => {
        console.log('Refreshing monitoring data...');
      }, interval);
      return () => clearInterval(timer);
    }
  }, [isRealTime, refreshInterval]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(var(--background))' }}>
      <div className="monitoring-container overflow-y-auto h-screen">
        <div className="space-y-8 p-8 pb-32">
          {/* 监控控制面板 */}
          <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Activity className="h-6 w-6 text-blue-400" />
                </div>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-bold">
                  实时监控控制面板
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap items-center justify-between gap-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded-md bg-blue-500/10">
                      <Clock className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-sm font-semibold text-slate-200">时间范围:</span>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-28 bg-slate-700/50 border-slate-600 text-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="1h">1小时</SelectItem>
                        <SelectItem value="6h">6小时</SelectItem>
                        <SelectItem value="24h">24小时</SelectItem>
                        <SelectItem value="7d">7天</SelectItem>
                        <SelectItem value="custom">自定义</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded-md bg-green-500/10">
                      <RefreshCw className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-sm font-semibold text-slate-200">刷新间隔:</span>
                    <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                      <SelectTrigger className="w-24 bg-slate-700/50 border-slate-600 text-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="10s">10秒</SelectItem>
                        <SelectItem value="30s">30秒</SelectItem>
                        <SelectItem value="60s">1分钟</SelectItem>
                        <SelectItem value="manual">手动</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-3 px-3 py-2 bg-slate-700/50 rounded-lg border border-slate-600/30">
                    <Switch
                      checked={isRealTime}
                      onCheckedChange={setIsRealTime}
                      id="real-time"
                    />
                    <label htmlFor="real-time" className="text-sm font-semibold text-slate-200 cursor-pointer">
                      实时监控
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 hover:bg-slate-600 text-slate-200 hover:text-white">
                    <Settings className="h-4 w-4 mr-2" />
                    设置
                  </Button>
                  <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 hover:bg-slate-600 text-slate-200 hover:text-white">
                    <Download className="h-4 w-4 mr-2" />
                    导出
                  </Button>
                  <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 hover:bg-slate-600 text-slate-200 hover:text-white">
                    <Maximize2 className="h-4 w-4 mr-2" />
                    全屏
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 核心指标卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MetricCard
              title="CPU 使用率"
              value={cpuUsage}
              unit="%"
              percentage={cpuUsage}
              trend="up"
              status={cpuUsage > 80 ? 'warning' : 'normal'}
              icon={<Cpu className="h-5 w-5 text-blue-400" />}
            />
            <MetricCard
              title="内存使用率"
              value={memoryUsage}
              unit="%"
              percentage={memoryUsage}
              trend="stable"
              status={memoryUsage > 90 ? 'critical' : memoryUsage > 75 ? 'warning' : 'normal'}
              icon={<MemoryStick className="h-5 w-5 text-purple-400" />}
            />
            <MetricCard
              title="磁盘使用率"
              value={diskUsage}
              unit="%"
              percentage={diskUsage}
              trend="down"
              status="normal"
              icon={<HardDrive className="h-5 w-5 text-green-400" />}
            />
          </div>

          {/* 主要监控区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 网络流量监控 */}
            <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10">
                    <Network className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="font-bold text-slate-200">网络流量监控</span>
                </CardTitle>
                <CardDescription className="text-slate-400">
                  实时网络接口流量统计
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">接口选择:</span>
                    <Select value={selectedInterface} onValueChange={setSelectedInterface}>
                      <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="all">所有接口</SelectItem>
                        <SelectItem value="eth0">eth0</SelectItem>
                        <SelectItem value="eth1">eth1</SelectItem>
                        <SelectItem value="ppp0">ppp0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                          <span className="text-sm text-slate-300">入站流量</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-400 text-lg">
                          {networkTraffic.in} MB/s
                        </span>
                      </div>
                      <Progress value={65} className="h-3" />
                    </div>

                    <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                          <span className="text-sm text-slate-300">出站流量</span>
                        </div>
                        <span className="font-mono font-bold text-blue-400 text-lg">
                          {networkTraffic.out} MB/s
                        </span>
                      </div>
                      <Progress value={45} className="h-3" />
                    </div>
                  </div>

                  <div className="h-48 bg-slate-700/20 rounded-lg border border-slate-600/30 flex items-center justify-center">
                    <div className="text-center">
                      <Wifi className="h-12 w-12 text-slate-500 mx-auto mb-2" />
                      <span className="text-slate-500">流量趋势图表区域</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 设备状态面板 */}
            <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Server className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="font-bold text-slate-200">设备状态监控</span>
                </CardTitle>
                <CardDescription className="text-slate-400">
                  网络设备实时状态和健康监控
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceStatuses.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-4 bg-slate-700/30 border border-slate-600/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(device.status)}
                        <div>
                          <p className="font-semibold text-slate-200">{device.name}</p>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getStatusBadgeColor(device.status)} text-xs px-2 py-0.5`}>
                              {device.status.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-slate-400">{device.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          <span className="font-mono">{device.responseTime}ms</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <Thermometer className="h-3 w-3" />
                          <span className="font-mono">{device.temperature}°C</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 详细监控区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 告警事件列表 */}
            <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    </div>
                    <span className="font-bold text-slate-200">告警事件</span>
                  </div>
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                    {alertEvents.filter(a => !a.acknowledged).length} 未处理
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alertEvents.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getAlertBorderColor(alert.level)} bg-slate-700/20 border border-slate-600/30`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={`${getAlertLevelColor(alert.level)} text-xs px-2 py-0.5`}>
                              {alert.level.toUpperCase()}
                            </Badge>
                            <span className="text-sm font-semibold text-slate-200">{alert.source}</span>
                            <span className="text-xs text-slate-500">
                              {formatTimestamp(alert.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-300">{alert.message}</p>
                        </div>
                        {!alert.acknowledged && (
                          <Button variant="outline" size="sm" className="ml-4 bg-slate-700/50 border-slate-600 hover:bg-slate-600 text-slate-200 hover:text-white">
                            确认
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 性能趋势分析 */}
            <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="font-bold text-slate-200">性能趋势分析</span>
                </CardTitle>
                <CardDescription className="text-slate-400">
                  历史性能数据分析和预测
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cpu" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-800/60">
                    <TabsTrigger value="cpu" className="bg-transparent text-slate-300 hover:bg-slate-700/50 data-[state=active]:bg-slate-700 data-[state=active]:text-white">CPU</TabsTrigger>
                    <TabsTrigger value="memory" className="bg-transparent text-slate-300 hover:bg-slate-700/50 data-[state=active]:bg-slate-700 data-[state=active]:text-white">内存</TabsTrigger>
                    <TabsTrigger value="network" className="bg-transparent text-slate-300 hover:bg-slate-700/50 data-[state=active]:bg-slate-700 data-[state=active]:text-white">网络</TabsTrigger>
                  </TabsList>
                  <TabsContent value="cpu" className="space-y-4">
                    <div className="h-40 bg-slate-700/20 rounded-lg border border-slate-600/30 flex items-center justify-center">
                      <div className="text-center">
                        <Cpu className="h-12 w-12 text-slate-500 mx-auto mb-2" />
                        <span className="text-slate-500">CPU 趋势分析图表</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <p className="text-2xl font-bold text-emerald-400">12%</p>
                        <p className="text-sm text-slate-400">平均使用率</p>
                      </div>
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <p className="text-2xl font-bold text-amber-400">89%</p>
                        <p className="text-sm text-slate-400">峰值使用率</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="memory" className="space-y-4">
                    <div className="h-40 bg-slate-700/20 rounded-lg border border-slate-600/30 flex items-center justify-center">
                      <div className="text-center">
                        <MemoryStick className="h-12 w-12 text-slate-500 mx-auto mb-2" />
                        <span className="text-slate-500">内存趋势分析图表</span>
                      </div>
                    </div>
                    <Alert className="bg-amber-500/10 border-amber-500/30">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
                      <AlertDescription className="text-slate-300">
                        内存使用率在过去24小时内持续上升，建议关注内存泄漏问题。
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                  <TabsContent value="network" className="space-y-4">
                    <div className="h-40 bg-slate-700/20 rounded-lg border border-slate-600/30 flex items-center justify-center">
                      <div className="text-center">
                        <Network className="h-12 w-12 text-slate-500 mx-auto mb-2" />
                        <span className="text-slate-500">网络趋势分析图表</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <p className="text-2xl font-bold text-blue-400">156 GB</p>
                        <p className="text-sm text-slate-400">总流量</p>
                      </div>
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <p className="text-2xl font-bold text-green-400">98.5%</p>
                        <p className="text-sm text-slate-400">可用率</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;