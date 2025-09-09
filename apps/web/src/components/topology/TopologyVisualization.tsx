import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { DEVICE_TYPES, DEVICE_STATUS, LINK_STATUS } from '@/constants/topology'
import type { NetworkDevice, NetworkLink, TopologyViewOptions } from '@/types/topology'

interface TopologyVisualizationProps {
  devices: NetworkDevice[]
  links: NetworkLink[]
  viewOptions: TopologyViewOptions
  searchTerm: string
  onDeviceClick: (device: NetworkDevice) => void
  onLinkClick: (link: NetworkLink) => void
}

interface D3Node extends d3.SimulationNodeDatum {
  id: string
  device: NetworkDevice
  fx?: number | null
  fy?: number | null
}

interface D3Link extends d3.SimulationLinkDatum<D3Node> {
  link: NetworkLink
}

export const TopologyVisualization: React.FC<TopologyVisualizationProps> = ({
  devices,
  links,
  viewOptions,
  searchTerm,
  onDeviceClick,
  onLinkClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [tooltipData, setTooltipData] = useState<{
    device?: NetworkDevice
    link?: NetworkLink
    x: number
    y: number
    visible: boolean
  }>({ x: 0, y: 0, visible: false })

  // 监听容器尺寸变化
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({
          width: rect.width,
          height: rect.height
        })
      }
    }

    updateDimensions()
    
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const container = svg.append('g')
    
    // 创建缩放行为
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform)
      })

    svg.call(zoom)

    // 根据viewOptions.zoomLevel设置初始缩放
    svg.call(zoom.transform, d3.zoomIdentity.scale(viewOptions.zoomLevel))

    // 准备数据
    const nodes: D3Node[] = devices.map(device => ({
      id: device.id,
      device,
      x: device.position?.x || Math.random() * dimensions.width,
      y: device.position?.y || Math.random() * dimensions.height
    }))

    const linkData: D3Link[] = links.map(link => ({
      source: link.source,
      target: link.target,
      link
    }))

    // 创建力导向模拟
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink<D3Node, D3Link>(linkData).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force('collision', d3.forceCollide().radius(40))

    // 绘制链路
    const linkGroup = container.append('g').attr('class', 'links')
    const linkElements = linkGroup.selectAll('.link')
      .data(linkData)
      .enter()
      .append('g')
      .attr('class', 'link')

    // 链路线条
    const linkLines = linkElements.append('line')
      .attr('stroke', d => LINK_STATUS[d.link.status].color)
      .attr('stroke-width', d => {
        const baseWidth = LINK_STATUS[d.link.status].strokeWidth
        // 根据利用率调整线条粗细
        return baseWidth + (d.link.utilization / 100) * 3
      })
      .attr('stroke-dasharray', d => {
        const status = LINK_STATUS[d.link.status]
        return 'strokeDasharray' in status ? status.strokeDasharray : null
      })
      .attr('opacity', 0.8)
      .style('cursor', 'pointer')

    // 链路标签（带宽信息）
    const linkLabels = linkElements.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', '500')
      .attr('fill', 'hsl(var(--muted-foreground))')
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .text(d => viewOptions.showMetrics ? `${d.link.bandwidth}` : '')

    // 绘制设备节点
    const nodeGroup = container.append('g').attr('class', 'nodes')
    const nodeElements = nodeGroup.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')

    // 设备图标圆圈
    nodeElements.append('circle')
      .attr('r', 25)
      .attr('fill', d => {
        const statusConfig = DEVICE_STATUS[d.device.status]
        return statusConfig.bgColor
      })
      .attr('stroke', d => {
        const statusConfig = DEVICE_STATUS[d.device.status]
        return statusConfig.color
      })
      .attr('stroke-width', 2)
      .attr('opacity', d => {
        // 根据搜索词高亮匹配的设备
        if (searchTerm && d.device.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return 1
        }
        return searchTerm ? 0.3 : 1
      })

    // 设备类型图标（简化显示）
    nodeElements.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', d => DEVICE_STATUS[d.device.status].color)
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .text(d => {
        const typeConfig = DEVICE_TYPES[d.device.type]
        return typeConfig.label.charAt(0) // 显示首字母
      })

    // 设备标签
    nodeElements.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '40px')
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .attr('fill', 'hsl(var(--foreground))')
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .text(d => viewOptions.showLabels ? d.device.name : '')

    // 性能指标显示
    if (viewOptions.showMetrics) {
      nodeElements.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '52px')
        .attr('font-size', '9px')
        .attr('fill', 'hsl(var(--muted-foreground))')
        .style('pointer-events', 'none')
        .style('user-select', 'none')
        .text(d => {
          const metrics = d.device.metrics
          if (metrics) {
            return `CPU: ${metrics.cpuUsage}% | 内存: ${metrics.memoryUsage}%`
          }
          return ''
        })
    }

    // 添加拖拽行为
    const drag = d3.drag<SVGGElement, D3Node>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', (event, d) => {
        d.fx = event.x
        d.fy = event.y
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0)
        if (viewOptions.layout !== 'manual') {
          d.fx = null
          d.fy = null
        }
      })

    nodeElements.call(drag)

    // 添加事件监听
    nodeElements
      .on('click', (event, d) => {
        event.stopPropagation()
        onDeviceClick(d.device)
      })
      .on('mouseenter', (event, d) => {
        const [x, y] = d3.pointer(event, document.body)
        setTooltipData({
          device: d.device,
          x: x + 10,
          y: y - 10,
          visible: true
        })
      })
      .on('mouseleave', () => {
        setTooltipData(prev => ({ ...prev, visible: false }))
      })

    linkElements
      .on('click', (event, d) => {
        event.stopPropagation()
        onLinkClick(d.link)
      })
      .on('mouseenter', (event, d) => {
        const [x, y] = d3.pointer(event, document.body)
        setTooltipData({
          link: d.link,
          x: x + 10,
          y: y - 10,
          visible: true
        })
      })
      .on('mouseleave', () => {
        setTooltipData(prev => ({ ...prev, visible: false }))
      })

    // 更新位置
    simulation.on('tick', () => {
      linkLines
        .attr('x1', d => (d.source as D3Node).x!)
        .attr('y1', d => (d.source as D3Node).y!)
        .attr('x2', d => (d.target as D3Node).x!)
        .attr('y2', d => (d.target as D3Node).y!)

      linkLabels
        .attr('x', d => ((d.source as D3Node).x! + (d.target as D3Node).x!) / 2)
        .attr('y', d => ((d.source as D3Node).y! + (d.target as D3Node).y!) / 2)

      nodeElements.attr('transform', d => `translate(${d.x},${d.y})`)
    })

    // 如果是手动布局模式，使用预设位置
    if (viewOptions.layout === 'manual') {
      nodes.forEach(node => {
        if (node.device.position) {
          node.fx = node.device.position.x
          node.fy = node.device.position.y
        }
      })
      simulation.alpha(0.1).restart()
    }

    return () => {
      simulation.stop()
    }
  }, [devices, links, viewOptions, searchTerm, dimensions.width, dimensions.height, onDeviceClick, onLinkClick])

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 bg-background">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="block w-full h-full bg-background"
        />
      </div>

      {/* Tooltip */}
      {tooltipData.visible && (
        <div
          className="fixed z-50 p-2 bg-popover text-popover-foreground text-xs rounded border shadow-lg pointer-events-none"
          style={{
            left: tooltipData.x,
            top: tooltipData.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          {tooltipData.device && (
            <div>
              <div className="font-semibold">{tooltipData.device.name}</div>
              <div>类型: {DEVICE_TYPES[tooltipData.device.type].label}</div>
              <div>状态: {DEVICE_STATUS[tooltipData.device.status].label}</div>
              <div>IP: {tooltipData.device.ip}</div>
              {tooltipData.device.metrics && (
                <div className="mt-1 pt-1 border-t border-border">
                  <div>CPU: {tooltipData.device.metrics.cpuUsage}%</div>
                  <div>内存: {tooltipData.device.metrics.memoryUsage}%</div>
                </div>
              )}
            </div>
          )}
          {tooltipData.link && (
            <div>
              <div className="font-semibold">链路信息</div>
              <div>带宽: {tooltipData.link.bandwidth}</div>
              <div>利用率: {tooltipData.link.utilization}%</div>
              <div>状态: {LINK_STATUS[tooltipData.link.status].label}</div>
            </div>
          )}
        </div>
      )}
    </>
  )
}