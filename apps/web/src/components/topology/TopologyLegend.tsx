import React from 'react'
import { Info, Star, Clock } from 'lucide-react'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DEVICE_TYPES, DEVICE_STATUS, LINK_STATUS, UTILIZATION_COLORS, ALARM_SEVERITY } from '@/constants/topology'
import type { NetworkDevice } from '@/types/topology'

interface TopologyLegendProps {
  favoriteDevices?: NetworkDevice[]
  recentDevices?: NetworkDevice[]
  onDeviceSelect?: (deviceId: string) => void
}

export const TopologyLegend: React.FC<TopologyLegendProps> = ({
  favoriteDevices = [],
  recentDevices = [],
  onDeviceSelect
}) => {
  return (
    <div className="h-full bg-card border-0 rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Info className="h-4 w-4" />
          图例说明
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 设备类型图例 */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">设备类型</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(DEVICE_TYPES).map(([type, config]) => (
              <div key={type} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: config.color }}
                >
                  {config.label.charAt(0)}
                </div>
                <span className="text-xs text-muted-foreground">{config.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* 设备状态图例 */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">设备状态</h4>
          <div className="space-y-2">
            {Object.entries(DEVICE_STATUS).map(([status, config]) => (
              <div key={status} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-xs text-muted-foreground">{config.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* 链路状态图例 */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">链路状态</h4>
          <div className="space-y-2">
            {Object.entries(LINK_STATUS).map(([status, config]) => (
              <div key={status} className="flex items-center space-x-2">
                <svg width="20" height="3" className="flex-shrink-0">
                  <line
                    x1="0"
                    y1="1.5"
                    x2="20"
                    y2="1.5"
                    stroke={config.color}
                    strokeWidth={config.strokeWidth}
                    strokeDasharray={'strokeDasharray' in config ? config.strokeDasharray : undefined}
                  />
                </svg>
                <span className="text-xs text-muted-foreground">{config.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* 利用率颜色说明 */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">链路利用率</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: UTILIZATION_COLORS.low }}
              />
              <span className="text-xs text-muted-foreground">低 (&lt; 30%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: UTILIZATION_COLORS.medium }}
              />
              <span className="text-xs text-muted-foreground">中 (30-70%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: UTILIZATION_COLORS.high }}
              />
              <span className="text-xs text-muted-foreground">高 (&gt; 70%)</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* 告警级别 */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">告警级别</h4>
          <div className="space-y-1">
            {Object.entries(ALARM_SEVERITY).map(([level, config]) => (
              <div key={level} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="text-xs text-muted-foreground">{config.label}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  P{config.priority}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* 快捷功能 */}
        {favoriteDevices.length > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-3 text-foreground flex items-center gap-1">
                <Star className="h-3 w-3" />
                收藏设备
              </h4>
              <div className="space-y-1">
                {favoriteDevices.slice(0, 5).map(device => (
                  <Button
                    key={device.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeviceSelect?.(device.id)}
                    className="w-full justify-start h-7 px-2 text-xs"
                  >
                    <div
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: DEVICE_STATUS[device.status].color }}
                    />
                    <span className="truncate">{device.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}

        {recentDevices.length > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-3 text-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                最近访问
              </h4>
              <div className="space-y-1">
                {recentDevices.slice(0, 5).map(device => (
                  <Button
                    key={device.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeviceSelect?.(device.id)}
                    className="w-full justify-start h-7 px-2 text-xs"
                  >
                    <div
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: DEVICE_STATUS[device.status].color }}
                    />
                    <span className="truncate">{device.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 操作说明 */}
        <Separator />
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">操作说明</h4>
          <div className="space-y-1 text-xs text-neutral-500">
            <div>• 鼠标悬停查看设备详情</div>
            <div>• 点击设备查看详细信息</div>
            <div>• 拖拽设备调整位置</div>
            <div>• 滚轮缩放视图</div>
            <div>• 双击设备居中显示</div>
          </div>
        </div>
      </CardContent>
    </div>
  )
}