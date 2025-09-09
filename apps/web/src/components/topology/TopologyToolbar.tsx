import React from 'react'
import {
  Search,
  ZoomIn,
  ZoomOut,
  Maximize,
  Download,
  Settings,
  Route,
  RefreshCw,
  Fullscreen,
  Layout
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { TOPOLOGY_LAYOUTS } from '@/constants/topology'
import type { TopologyViewOptions } from '@/types/topology'

interface TopologyToolbarProps {
  viewOptions: TopologyViewOptions
  onViewOptionsChange: (options: Partial<TopologyViewOptions>) => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetView: () => void
  onFullscreen: () => void
  onExport: () => void
  onPathAnalysis: () => void
  onRefresh: () => void
  searchTerm: string
  onSearchChange: (term: string) => void
  isFullscreen: boolean
  isRefreshing: boolean
}

export const TopologyToolbar: React.FC<TopologyToolbarProps> = ({
  viewOptions,
  onViewOptionsChange,
  onZoomIn,
  onZoomOut,
  onResetView,
  onFullscreen,
  onExport,
  onPathAnalysis,
  onRefresh,
  searchTerm,
  onSearchChange,
  isFullscreen,
  isRefreshing
}) => {
  const handleLayoutChange = (layout: string) => {
    onViewOptionsChange({ layout: layout as TopologyViewOptions['layout'] })
  }

  return (
    <div className="flex items-center justify-between p-3 bg-card border-b border-border flex-shrink-0">
      <div className="flex items-center space-x-4">
        {/* 视图控制 */}
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onZoomIn}
                  className="h-8 w-8 p-0"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>放大</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onZoomOut}
                  className="h-8 w-8 p-0"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>缩小</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onResetView}
                  className="h-8 w-8 p-0"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>适应屏幕</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onFullscreen}
                  className="h-8 w-8 p-0"
                >
                  <Fullscreen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFullscreen ? '退出全屏' : '全屏显示'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* 布局控制 */}
        <div className="flex items-center space-x-2">
          <Layout className="h-4 w-4 text-muted-foreground" />
          <Select value={viewOptions.layout} onValueChange={handleLayoutChange}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(TOPOLOGY_LAYOUTS).map(([key, layout]) => (
                <SelectItem key={key} value={key}>
                  {layout.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* 功能按钮 */}
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className="h-8 px-3"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="ml-1">刷新</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>刷新拓扑数据</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPathAnalysis}
                  className="h-8 px-3"
                >
                  <Route className="h-4 w-4" />
                  <span className="ml-1">路径分析</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>网络路径分析</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExport}
                  className="h-8 px-3"
                >
                  <Download className="h-4 w-4" />
                  <span className="ml-1">导出</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>导出拓扑图</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="搜索设备..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 h-8 w-64"
          />
        </div>

        {/* 状态指示器 */}
        <div className="flex items-center space-x-2">
          <Badge
            variant={viewOptions.autoRefresh ? 'default' : 'secondary'}
            className="text-xs text-gray"
          >
            {viewOptions.autoRefresh ? '自动刷新' : '手动刷新'}
          </Badge>
          
          <Badge variant="outline" className="text-xs">
            缩放: {Math.round(viewOptions.zoomLevel * 100)}%
          </Badge>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* 设置按钮 */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>拓扑设置</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}