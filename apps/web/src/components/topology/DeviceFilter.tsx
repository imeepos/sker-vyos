import React from 'react'
import { Filter, X } from 'lucide-react'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { DEVICE_TYPES, DEVICE_STATUS } from '@/constants/topology'
import type { TopologyFilter, NetworkDevice } from '@/types/topology'

interface DeviceFilterProps {
  filter: TopologyFilter
  devices: NetworkDevice[]
  onFilterChange: (filter: Partial<TopologyFilter>) => void
  onResetFilter: () => void
}

export const DeviceFilter: React.FC<DeviceFilterProps> = ({
  filter,
  devices,
  onFilterChange,
  onResetFilter
}) => {
  const deviceTypeCounts = React.useMemo(() => {
    return devices.reduce((counts, device) => {
      counts[device.type] = (counts[device.type] || 0) + 1
      return counts
    }, {} as Record<string, number>)
  }, [devices])

  const deviceStatusCounts = React.useMemo(() => {
    return devices.reduce((counts, device) => {
      counts[device.status] = (counts[device.status] || 0) + 1
      return counts
    }, {} as Record<string, number>)
  }, [devices])

  const locationCounts = React.useMemo(() => {
    return devices.reduce((counts, device) => {
      if (device.location) {
        counts[device.location] = (counts[device.location] || 0) + 1
      }
      return counts
    }, {} as Record<string, number>)
  }, [devices])

  const vendorCounts = React.useMemo(() => {
    return devices.reduce((counts, device) => {
      if (device.vendor) {
        counts[device.vendor] = (counts[device.vendor] || 0) + 1
      }
      return counts
    }, {} as Record<string, number>)
  }, [devices])

  const handleDeviceTypeToggle = (deviceType: string, checked: boolean) => {
    const newTypes = checked
      ? [...filter.deviceTypes, deviceType]
      : filter.deviceTypes.filter(type => type !== deviceType)
    onFilterChange({ deviceTypes: newTypes })
  }

  const handleStatusToggle = (status: string, checked: boolean) => {
    const newStatus = checked
      ? [...filter.deviceStatus, status]
      : filter.deviceStatus.filter(s => s !== status)
    onFilterChange({ deviceStatus: newStatus })
  }

  const handleLocationToggle = (location: string, checked: boolean) => {
    const newLocations = checked
      ? [...filter.locations, location]
      : filter.locations.filter(l => l !== location)
    onFilterChange({ locations: newLocations })
  }

  const handleVendorToggle = (vendor: string, checked: boolean) => {
    const newVendors = checked
      ? [...filter.vendors, vendor]
      : filter.vendors.filter(v => v !== vendor)
    onFilterChange({ vendors: newVendors })
  }

  const activeFilterCount = 
    filter.deviceTypes.length + 
    filter.deviceStatus.length + 
    filter.locations.length + 
    filter.vendors.length +
    (filter.showOffline ? 0 : 1)

  return (
    <div className="h-full bg-card border-0 rounded-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Filter className="h-4 w-4" />
            设备筛选
          </CardTitle>
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {activeFilterCount}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilter}
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 设备类型筛选 */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">设备类型</h4>
          <div className="space-y-2">
            {Object.entries(DEVICE_TYPES).map(([type, config]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`device-type-${type}`}
                    checked={filter.deviceTypes.includes(type)}
                    onCheckedChange={(checked) => 
                      handleDeviceTypeToggle(type, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`device-type-${type}`}
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    {config.label}
                  </label>
                </div>
                <Badge variant="outline" className="text-xs">
                  {deviceTypeCounts[type] || 0}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* 设备状态筛选 */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-foreground">设备状态</h4>
          <div className="space-y-2">
            {Object.entries(DEVICE_STATUS).map(([status, config]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`device-status-${status}`}
                    checked={filter.deviceStatus.includes(status)}
                    onCheckedChange={(checked) => 
                      handleStatusToggle(status, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`device-status-${status}`}
                    className="text-sm text-neutral-600 cursor-pointer flex items-center gap-2"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    {config.label}
                  </label>
                </div>
                <Badge variant="outline" className="text-xs">
                  {deviceStatusCounts[status] || 0}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* 地理位置筛选 */}
        {Object.keys(locationCounts).length > 0 && (
          <>
            <div>
              <h4 className="text-sm font-medium mb-3 text-foreground">地理位置</h4>
              <div className="space-y-2">
                {Object.entries(locationCounts).map(([location, count]) => (
                  <div key={location} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={filter.locations.includes(location)}
                        onCheckedChange={(checked) => 
                          handleLocationToggle(location, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`location-${location}`}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {location}
                      </label>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* 厂商筛选 */}
        {Object.keys(vendorCounts).length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3 text-foreground">设备厂商</h4>
            <div className="space-y-2">
              {Object.entries(vendorCounts).map(([vendor, count]) => (
                <div key={vendor} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`vendor-${vendor}`}
                      checked={filter.vendors.includes(vendor)}
                      onCheckedChange={(checked) => 
                        handleVendorToggle(vendor, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`vendor-${vendor}`}
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      {vendor}
                    </label>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </div>
  )
}