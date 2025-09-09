export interface NetworkDevice {
  id: string
  name: string
  type: 'router' | 'switch' | 'firewall' | 'server' | 'hub' | 'bridge' | 'gateway'
  status: 'online' | 'offline' | 'warning' | 'error'
  ip: string
  position?: { x: number; y: number }
  interfaces?: NetworkInterface[]
  vendor?: string
  model?: string
  location?: string
  description?: string
  uptime?: number
  lastSeen?: string
  metrics?: DeviceMetrics
}

export interface NetworkInterface {
  id: string
  name: string
  type: 'ethernet' | 'wireless' | 'serial' | 'optical'
  status: 'up' | 'down' | 'admin-down'
  speed: string
  duplex: 'full' | 'half'
  description?: string
  ipAddresses?: string[]
  macAddress?: string
  statistics?: InterfaceStatistics
}

export interface InterfaceStatistics {
  bytesIn: number
  bytesOut: number
  packetsIn: number
  packetsOut: number
  errorsIn: number
  errorsOut: number
  droppedIn: number
  droppedOut: number
  utilization: number
}

export interface DeviceMetrics {
  cpuUsage: number
  memoryUsage: number
  temperature?: number
  powerConsumption?: number
  diskUsage?: number
}

export interface NetworkLink {
  id: string
  source: string
  target: string
  type: 'ethernet' | 'wireless' | 'optical' | 'tunnel' | 'logical'
  status: 'up' | 'down' | 'degraded'
  bandwidth: string
  utilization: number
  delay?: number
  description?: string
  cost?: number
  vlan?: number
}

export interface TopologyData {
  devices: NetworkDevice[]
  links: NetworkLink[]
  lastUpdated: string
  version: string
}

export interface TopologyFilter {
  deviceTypes: string[]
  deviceStatus: string[]
  locations: string[]
  vendors: string[]
  showOffline: boolean
}

export interface TopologyViewOptions {
  layout: 'force' | 'hierarchical' | 'radial' | 'circular' | 'manual'
  showLabels: boolean
  showMetrics: boolean
  autoRefresh: boolean
  refreshInterval: number
  zoomLevel: number
  centerOnDevice?: string
}

export interface DeviceGroup {
  id: string
  name: string
  devices: string[]
  color: string
  collapsed: boolean
}

export interface TopologyPath {
  id: string
  devices: string[]
  links: string[]
  type: 'shortest' | 'backup' | 'primary'
  cost: number
  delay: number
}

export interface TopologyAlarm {
  id: string
  deviceId: string
  severity: 'critical' | 'major' | 'minor' | 'warning' | 'info'
  type: 'device-down' | 'interface-down' | 'high-utilization' | 'threshold-exceeded'
  message: string
  timestamp: string
  acknowledged: boolean
}