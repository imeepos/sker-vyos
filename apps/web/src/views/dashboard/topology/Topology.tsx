import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { TopologyToolbar } from '@/components/topology/TopologyToolbar'
import { DeviceFilter } from '@/components/topology/DeviceFilter'
import { TopologyVisualization } from '@/components/topology/TopologyVisualization'
import { TopologyLegend } from '@/components/topology/TopologyLegend'
import { DeviceDetails } from '@/components/topology/DeviceDetails'
import { MOCK_TOPOLOGY_DATA, DEFAULT_TOPOLOGY_OPTIONS } from '@/constants/topology'
import type { 
  TopologyData, 
  TopologyFilter, 
  TopologyViewOptions, 
  NetworkDevice, 
  NetworkLink 
} from '@/types/topology'

export const Topology: React.FC = () => {
  // 数据状态
  const [topologyData] = useState<TopologyData>(MOCK_TOPOLOGY_DATA)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // 视图状态
  const [viewOptions, setViewOptions] = useState<TopologyViewOptions>(DEFAULT_TOPOLOGY_OPTIONS)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // 筛选状态
  const [filter, setFilter] = useState<TopologyFilter>({
    deviceTypes: [],
    deviceStatus: [],
    locations: [],
    vendors: [],
    showOffline: true
  })

  // 搜索状态
  const [searchTerm, setSearchTerm] = useState('')

  // 选中设备状态
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null)

  // 过滤后的数据
  const filteredData = useMemo(() => {
    let filteredDevices = topologyData.devices

    // 设备类型筛选
    if (filter.deviceTypes.length > 0) {
      filteredDevices = filteredDevices.filter(device => 
        filter.deviceTypes.includes(device.type)
      )
    }

    // 设备状态筛选
    if (filter.deviceStatus.length > 0) {
      filteredDevices = filteredDevices.filter(device => 
        filter.deviceStatus.includes(device.status)
      )
    }

    // 地理位置筛选
    if (filter.locations.length > 0) {
      filteredDevices = filteredDevices.filter(device => 
        device.location && filter.locations.includes(device.location)
      )
    }

    // 厂商筛选
    if (filter.vendors.length > 0) {
      filteredDevices = filteredDevices.filter(device => 
        device.vendor && filter.vendors.includes(device.vendor)
      )
    }

    // 是否显示离线设备
    if (!filter.showOffline) {
      filteredDevices = filteredDevices.filter(device => device.status !== 'offline')
    }

    // 搜索筛选
    if (searchTerm) {
      filteredDevices = filteredDevices.filter(device =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.ip.includes(searchTerm) ||
        (device.location && device.location.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // 筛选相关的链路
    const deviceIds = new Set(filteredDevices.map(device => device.id))
    const filteredLinks = topologyData.links.filter(link =>
      deviceIds.has(link.source) && deviceIds.has(link.target)
    )

    return {
      devices: filteredDevices,
      links: filteredLinks
    }
  }, [topologyData, filter, searchTerm])

  // 处理视图选项更改
  const handleViewOptionsChange = useCallback((options: Partial<TopologyViewOptions>) => {
    setViewOptions(prev => ({ ...prev, ...options }))
  }, [])

  // 处理筛选器更改
  const handleFilterChange = useCallback((newFilter: Partial<TopologyFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }))
  }, [])

  // 重置筛选器
  const handleResetFilter = useCallback(() => {
    setFilter({
      deviceTypes: [],
      deviceStatus: [],
      locations: [],
      vendors: [],
      showOffline: true
    })
    setSearchTerm('')
  }, [])

  // 处理设备点击
  const handleDeviceClick = useCallback((device: NetworkDevice) => {
    setSelectedDevice(device)
  }, [])

  // 处理链路点击
  const handleLinkClick = useCallback((link: NetworkLink) => {
    console.log('Link clicked:', link)
  }, [])

  // 处理设备选择（来自图例快捷功能）
  const handleDeviceSelect = useCallback((deviceId: string) => {
    const device = topologyData.devices.find(d => d.id === deviceId)
    if (device) {
      setSelectedDevice(device)
      // 可以添加居中显示设备的逻辑
    }
  }, [topologyData.devices])

  // 缩放控制
  const handleZoomIn = useCallback(() => {
    setViewOptions(prev => ({ 
      ...prev, 
      zoomLevel: Math.min(prev.zoomLevel * 1.2, 4) 
    }))
  }, [])

  const handleZoomOut = useCallback(() => {
    setViewOptions(prev => ({ 
      ...prev, 
      zoomLevel: Math.max(prev.zoomLevel / 1.2, 0.1) 
    }))
  }, [])

  const handleResetView = useCallback(() => {
    setViewOptions(prev => ({ ...prev, zoomLevel: 1 }))
  }, [])

  // 全屏切换
  const handleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  // 导出功能
  const handleExport = useCallback(() => {
    console.log('Export topology')
  }, [])

  // 路径分析
  const handlePathAnalysis = useCallback(() => {
    console.log('Path analysis')
  }, [])

  // 刷新数据
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 这里应该调用实际的API获取数据
      // const newData = await fetchTopologyData()
      // setTopologyData(newData)
      
      console.log('Data refreshed')
    } catch (error) {
      console.error('Failed to refresh data:', error)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  // 自动刷新
  useEffect(() => {
    if (!viewOptions.autoRefresh) return

    const interval = setInterval(() => {
      handleRefresh()
    }, viewOptions.refreshInterval)

    return () => clearInterval(interval)
  }, [viewOptions.autoRefresh, viewOptions.refreshInterval, handleRefresh])

  // 全屏状态监听
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <div className="absolute inset-0 flex flex-col bg-background">
      {/* 工具栏 */}
      <TopologyToolbar
        viewOptions={viewOptions}
        onViewOptionsChange={handleViewOptionsChange}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        onFullscreen={handleFullscreen}
        onExport={handleExport}
        onPathAnalysis={handlePathAnalysis}
        onRefresh={handleRefresh}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isFullscreen={isFullscreen}
        isRefreshing={isRefreshing}
      />

      {/* 主要内容区域 */}
      <div className="flex-1 flex min-h-0">
        {/* 左侧筛选面板 */}
        <div className="w-80 border-r border-border bg-card flex-shrink-0">
          <div className="h-full overflow-y-auto scrollbar-thin">
            <DeviceFilter
              filter={filter}
              devices={topologyData.devices}
              onFilterChange={handleFilterChange}
              onResetFilter={handleResetFilter}
            />
          </div>
        </div>

        {/* 中央拓扑显示区域 */}
        <div className="flex-1 relative min-w-0">
          <TopologyVisualization
            devices={filteredData.devices}
            links={filteredData.links}
            viewOptions={viewOptions}
            searchTerm={searchTerm}
            onDeviceClick={handleDeviceClick}
            onLinkClick={handleLinkClick}
          />

          {/* 设备详情面板（悬浮显示） */}
          {selectedDevice && (
            <div className="absolute top-4 left-4 z-50 max-w-2xl max-h-[calc(100%-2rem)] overflow-auto scrollbar-thin">
              <DeviceDetails
                device={selectedDevice}
                links={topologyData.links}
                onClose={() => setSelectedDevice(null)}
              />
            </div>
          )}
        </div>

        {/* 右侧图例面板 */}
        <div className="w-80 border-l border-border bg-card flex-shrink-0">
          <div className="h-full overflow-y-auto scrollbar-thin">
            <TopologyLegend
              favoriteDevices={topologyData.devices.filter(d => d.status === 'online').slice(0, 3)}
              recentDevices={topologyData.devices.slice(0, 3)}
              onDeviceSelect={handleDeviceSelect}
            />
          </div>
        </div>
      </div>

      {/* 底部状态栏 */}
      <div className="h-8 bg-muted border-t border-border flex items-center justify-between px-4 text-xs text-muted-foreground flex-shrink-0">
        <div className="flex items-center space-x-4">
          <span>设备总数: {topologyData.devices.length}</span>
          <span>显示设备: {filteredData.devices.length}</span>
          <span>链路数: {filteredData.links.length}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>最后更新: {new Date(topologyData.lastUpdated).toLocaleString()}</span>
          {isRefreshing && <span className="text-primary">刷新中...</span>}
        </div>
      </div>
    </div>
  )
}