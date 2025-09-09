import React from 'react'
import { X, Activity, Wifi, Server, Shield, Zap, HardDrive, Thermometer } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { DEVICE_TYPES, DEVICE_STATUS } from '@/constants/topology'
import type { NetworkDevice, NetworkLink } from '@/types/topology'

interface DeviceDetailsProps {
  device: NetworkDevice | null
  links: NetworkLink[]
  onClose: () => void
}

export const DeviceDetails: React.FC<DeviceDetailsProps> = ({
  device,
  links,
  onClose
}) => {
  if (!device) return null

  const deviceLinks = links.filter(
    link => link.source === device.id || link.target === device.id
  )

  const getStatusIcon = () => {
    switch (device.status) {
      case 'online':
        return <Activity className="h-4 w-4 text-success-base" />
      case 'offline':
        return <X className="h-4 w-4 text-error-base" />
      case 'warning':
        return <Zap className="h-4 w-4 text-warning-base" />
      case 'error':
        return <Shield className="h-4 w-4 text-error-base" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getDeviceIcon = () => {
    switch (device.type) {
      case 'router':
        return <Wifi className="h-5 w-5" />
      case 'switch':
        return <Server className="h-5 w-5" />
      case 'firewall':
        return <Shield className="h-5 w-5" />
      case 'server':
        return <Server className="h-5 w-5" />
      default:
        return <Server className="h-5 w-5" />
    }
  }

  return (
    <Card className="w-full max-w-2xl bg-card border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="p-2 rounded-lg"
              style={{ 
                backgroundColor: DEVICE_TYPES[device.type].color + '20',
                color: DEVICE_TYPES[device.type].color
              }}
            >
              {getDeviceIcon()}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{device.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                {getStatusIcon()}
                <span className="text-sm text-muted-foreground">
                  {DEVICE_STATUS[device.status].label}
                </span>
                <Badge variant="outline" className="text-xs">
                  {DEVICE_TYPES[device.type].label}
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="interfaces">接口</TabsTrigger>
            <TabsTrigger value="performance">性能</TabsTrigger>
            <TabsTrigger value="connectivity">连接</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* 基本信息 */}
            <div>
              <h4 className="text-sm font-medium mb-3">基本信息</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">IP地址:</span>
                  <div className="font-mono">{device.ip}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">设备ID:</span>
                  <div className="font-mono text-xs">{device.id}</div>
                </div>
                {device.vendor && (
                  <div>
                    <span className="text-muted-foreground">厂商:</span>
                    <div>{device.vendor}</div>
                  </div>
                )}
                {device.model && (
                  <div>
                    <span className="text-muted-foreground">型号:</span>
                    <div>{device.model}</div>
                  </div>
                )}
                {device.location && (
                  <div>
                    <span className="text-muted-foreground">位置:</span>
                    <div>{device.location}</div>
                  </div>
                )}
                {device.uptime && (
                  <div>
                    <span className="text-muted-foreground">运行时间:</span>
                    <div>{Math.floor(device.uptime / 86400)}天</div>
                  </div>
                )}
              </div>
            </div>

            {device.description && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-2">描述</h4>
                  <p className="text-sm text-neutral-600">{device.description}</p>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="interfaces" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">网络接口</h4>
              {device.interfaces && device.interfaces.length > 0 ? (
                <div className="space-y-3">
                  {device.interfaces.map(interface_ => (
                    <Card key={interface_.id} className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              interface_.status === 'up' 
                                ? 'bg-success-base' 
                                : interface_.status === 'down'
                                ? 'bg-error-base'
                                : 'bg-neutral-400'
                            }`}
                          />
                          <span className="font-medium text-sm">{interface_.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {interface_.type}
                          </Badge>
                        </div>
                        <Badge 
                          variant={interface_.status === 'up' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {interface_.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs text-neutral-600">
                        <div>
                          <span>速率:</span> {interface_.speed}
                        </div>
                        <div>
                          <span>双工:</span> {interface_.duplex}
                        </div>
                        {interface_.macAddress && (
                          <div className="col-span-2">
                            <span>MAC:</span> <span className="font-mono">{interface_.macAddress}</span>
                          </div>
                        )}
                        {interface_.ipAddresses && interface_.ipAddresses.length > 0 && (
                          <div className="col-span-2">
                            <span>IP:</span> <span className="font-mono">{interface_.ipAddresses.join(', ')}</span>
                          </div>
                        )}
                      </div>

                      {interface_.statistics && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <div className="text-muted-foreground">入站</div>
                              <div>数据: {(interface_.statistics.bytesIn / 1024 / 1024).toFixed(1)} MB</div>
                              <div>包: {interface_.statistics.packetsIn}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">出站</div>
                              <div>数据: {(interface_.statistics.bytesOut / 1024 / 1024).toFixed(1)} MB</div>
                              <div>包: {interface_.statistics.packetsOut}</div>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <div className="flex justify-between text-xs">
                              <span>利用率</span>
                              <span>{interface_.statistics.utilization}%</span>
                            </div>
                            <Progress value={interface_.statistics.utilization} className="h-1 mt-1" />
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Server className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">暂无接口信息</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">性能指标</h4>
              {device.metrics ? (
                <div className="space-y-4">
                  {/* CPU使用率 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        CPU使用率
                      </span>
                      <span className="font-medium">{device.metrics.cpuUsage}%</span>
                    </div>
                    <Progress value={device.metrics.cpuUsage} className="h-2" />
                  </div>

                  {/* 内存使用率 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Server className="h-4 w-4" />
                        内存使用率
                      </span>
                      <span className="font-medium">{device.metrics.memoryUsage}%</span>
                    </div>
                    <Progress value={device.metrics.memoryUsage} className="h-2" />
                  </div>

                  {/* 磁盘使用率 */}
                  {device.metrics.diskUsage !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4" />
                          磁盘使用率
                        </span>
                        <span className="font-medium">{device.metrics.diskUsage}%</span>
                      </div>
                      <Progress value={device.metrics.diskUsage} className="h-2" />
                    </div>
                  )}

                  {/* 温度 */}
                  {device.metrics.temperature !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4" />
                          温度
                        </span>
                        <span className="font-medium">{device.metrics.temperature}°C</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        状态: {device.metrics.temperature > 50 ? '偏高' : device.metrics.temperature > 40 ? '正常' : '低'}
                      </div>
                    </div>
                  )}

                  {/* 功耗 */}
                  {device.metrics.powerConsumption !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          功耗
                        </span>
                        <span className="font-medium">{device.metrics.powerConsumption}W</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">暂无性能数据</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="connectivity" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">网络连接 ({deviceLinks.length})</h4>
              {deviceLinks.length > 0 ? (
                <div className="space-y-3">
                  {deviceLinks.map(link => {
                    const isSource = link.source === device.id
                    const connectedDeviceId = isSource ? link.target : link.source
                    
                    return (
                      <Card key={link.id} className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                link.status === 'up' 
                                  ? 'bg-success-base' 
                                  : link.status === 'down'
                                  ? 'bg-error-base'
                                  : 'bg-warning-base'
                              }`}
                            />
                            <span className="font-medium text-sm">
                              {isSource ? '→' : '←'} {connectedDeviceId}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {link.type}
                            </Badge>
                          </div>
                          <Badge 
                            variant={link.status === 'up' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {link.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs text-neutral-600">
                          <div>
                            <span>带宽:</span> {link.bandwidth}
                          </div>
                          <div>
                            <span>利用率:</span> {link.utilization}%
                          </div>
                          {link.delay && (
                            <div>
                              <span>延迟:</span> {link.delay}ms
                            </div>
                          )}
                          {link.cost && (
                            <div>
                              <span>开销:</span> {link.cost}
                            </div>
                          )}
                        </div>

                        <div className="mt-2">
                          <div className="flex justify-between text-xs">
                            <span>链路利用率</span>
                            <span>{link.utilization}%</span>
                          </div>
                          <Progress value={link.utilization} className="h-1 mt-1" />
                        </div>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Wifi className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">暂无连接信息</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}