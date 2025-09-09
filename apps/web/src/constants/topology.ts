export const DEVICE_TYPES = {
  router: {
    label: '路由器',
    icon: 'router',
    color: '#3b82f6'
  },
  switch: {
    label: '交换机',
    icon: 'switch',
    color: '#10b981'
  },
  firewall: {
    label: '防火墙',
    icon: 'shield',
    color: '#ef4444'
  },
  server: {
    label: '服务器',
    icon: 'server',
    color: '#8b5cf6'
  },
  hub: {
    label: '集线器',
    icon: 'hub',
    color: '#f59e0b'
  },
  bridge: {
    label: '网桥',
    icon: 'bridge',
    color: '#06b6d4'
  },
  gateway: {
    label: '网关',
    icon: 'gateway',
    color: '#6b7280'
  }
} as const

export const DEVICE_STATUS = {
  online: {
    label: '在线',
    color: '#10b981',
    bgColor: '#ecfdf5'
  },
  offline: {
    label: '离线',
    color: '#ef4444',
    bgColor: '#fef2f2'
  },
  warning: {
    label: '警告',
    color: '#f59e0b',
    bgColor: '#fffbeb'
  },
  error: {
    label: '错误',
    color: '#ef4444',
    bgColor: '#fef2f2'
  }
} as const

export const LINK_STATUS = {
  up: {
    label: '正常',
    color: '#10b981',
    strokeWidth: 2
  },
  down: {
    label: '故障',
    color: '#ef4444',
    strokeWidth: 2,
    strokeDasharray: '5,5'
  },
  degraded: {
    label: '降级',
    color: '#f59e0b',
    strokeWidth: 2,
    strokeDasharray: '3,3'
  }
} as const

export const UTILIZATION_COLORS = {
  low: '#10b981',      // < 30%
  medium: '#f59e0b',   // 30-70%
  high: '#ef4444'      // > 70%
} as const

export const TOPOLOGY_LAYOUTS = {
  force: {
    label: '力导向布局',
    description: '基于物理模拟的自动布局'
  },
  hierarchical: {
    label: '层次布局',
    description: '按层级结构排列设备'
  },
  radial: {
    label: '径向布局',
    description: '以核心设备为中心的放射状布局'
  },
  circular: {
    label: '环形布局',
    description: '设备沿圆形路径排列'
  },
  manual: {
    label: '手动布局',
    description: '用户自定义设备位置'
  }
} as const

export const ALARM_SEVERITY = {
  critical: {
    label: '严重',
    color: '#dc2626',
    priority: 5
  },
  major: {
    label: '重要',
    color: '#ea580c',
    priority: 4
  },
  minor: {
    label: '次要',
    color: '#ca8a04',
    priority: 3
  },
  warning: {
    label: '警告',
    color: '#0891b2',
    priority: 2
  },
  info: {
    label: '信息',
    color: '#059669',
    priority: 1
  }
} as const

export const DEFAULT_TOPOLOGY_OPTIONS = {
  layout: 'force' as const,
  showLabels: true,
  showMetrics: false,
  autoRefresh: true,
  refreshInterval: 30000,
  zoomLevel: 1
}

export const MOCK_TOPOLOGY_DATA = {
  devices: [
    {
      id: 'router-001',
      name: 'Core-Router-01',
      type: 'router' as const,
      status: 'online' as const,
      ip: '192.168.1.1',
      vendor: 'Cisco',
      model: 'ISR4331',
      location: '机房-A',
      position: { x: 400, y: 200 },
      metrics: {
        cpuUsage: 25,
        memoryUsage: 45,
        temperature: 35
      }
    },
    {
      id: 'switch-001',
      name: 'Access-Switch-01',
      type: 'switch' as const,
      status: 'online' as const,
      ip: '192.168.1.10',
      vendor: 'HP',
      model: 'ProCurve 2920',
      location: '机房-A',
      position: { x: 200, y: 350 },
      metrics: {
        cpuUsage: 15,
        memoryUsage: 30,
        temperature: 28
      }
    },
    {
      id: 'switch-002',
      name: 'Access-Switch-02',
      type: 'switch' as const,
      status: 'warning' as const,
      ip: '192.168.1.11',
      vendor: 'HP',
      model: 'ProCurve 2920',
      location: '机房-A',
      position: { x: 600, y: 350 },
      metrics: {
        cpuUsage: 78,
        memoryUsage: 85,
        temperature: 42
      }
    },
    {
      id: 'firewall-001',
      name: 'Edge-Firewall',
      type: 'firewall' as const,
      status: 'online' as const,
      ip: '10.0.1.1',
      vendor: 'Fortinet',
      model: 'FortiGate 60F',
      location: '机房-A',
      position: { x: 400, y: 100 },
      metrics: {
        cpuUsage: 35,
        memoryUsage: 40,
        temperature: 38
      }
    },
    {
      id: 'server-001',
      name: 'Web-Server-01',
      type: 'server' as const,
      status: 'online' as const,
      ip: '192.168.1.100',
      vendor: 'Dell',
      model: 'PowerEdge R740',
      location: '机房-A',
      position: { x: 150, y: 500 },
      metrics: {
        cpuUsage: 65,
        memoryUsage: 70,
        temperature: 45,
        diskUsage: 55
      }
    },
    {
      id: 'server-002',
      name: 'DB-Server-01',
      type: 'server' as const,
      status: 'offline' as const,
      ip: '192.168.1.101',
      vendor: 'HP',
      model: 'ProLiant DL380',
      location: '机房-A',
      position: { x: 650, y: 500 },
      metrics: {
        cpuUsage: 0,
        memoryUsage: 0,
        temperature: 0,
        diskUsage: 0
      }
    }
  ],
  links: [
    {
      id: 'link-001',
      source: 'firewall-001',
      target: 'router-001',
      type: 'ethernet' as const,
      status: 'up' as const,
      bandwidth: '1Gbps',
      utilization: 25
    },
    {
      id: 'link-002',
      source: 'router-001',
      target: 'switch-001',
      type: 'ethernet' as const,
      status: 'up' as const,
      bandwidth: '10Gbps',
      utilization: 45
    },
    {
      id: 'link-003',
      source: 'router-001',
      target: 'switch-002',
      type: 'ethernet' as const,
      status: 'up' as const,
      bandwidth: '10Gbps',
      utilization: 78
    },
    {
      id: 'link-004',
      source: 'switch-001',
      target: 'server-001',
      type: 'ethernet' as const,
      status: 'up' as const,
      bandwidth: '1Gbps',
      utilization: 35
    },
    {
      id: 'link-005',
      source: 'switch-002',
      target: 'server-002',
      type: 'ethernet' as const,
      status: 'down' as const,
      bandwidth: '1Gbps',
      utilization: 0
    },
    {
      id: 'link-006',
      source: 'switch-001',
      target: 'switch-002',
      type: 'ethernet' as const,
      status: 'up' as const,
      bandwidth: '10Gbps',
      utilization: 15
    }
  ],
  lastUpdated: new Date().toISOString(),
  version: '1.0.0'
}