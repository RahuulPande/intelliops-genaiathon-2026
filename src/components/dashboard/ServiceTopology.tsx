'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  Panel,
  BackgroundVariant,
  ConnectionMode,
  NodeProps,
  Handle,
  Position,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Server,
  Globe,
  Database,
  Shield,
  Zap,
  RefreshCw,
  Maximize,
  Minimize,
  Filter,
  Search,
  Eye,
  EyeOff,
  Layers,
  GitBranch,
  Info,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BarChart3
} from 'lucide-react';
import useDashboardStore from '@/store/dashboard';

interface ServiceNodeData {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  type: 'internal' | 'external';
  health: number;
  responseTime: number;
  category: string;
  dependencies: string[];
  isHighlighted?: boolean;
  isAffected?: boolean;
}

// Custom Service Node Component
const ServiceNode = ({ data, selected }: NodeProps<ServiceNodeData>) => {
  const { openServiceModal, services } = useDashboardStore();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return { bg: 'bg-green-500', border: 'border-green-600', text: 'text-green-700' };
      case 'degraded': return { bg: 'bg-yellow-500', border: 'border-yellow-600', text: 'text-yellow-700' };
      case 'down': return { bg: 'bg-red-500', border: 'border-red-600', text: 'text-red-700' };
      default: return { bg: 'bg-gray-500', border: 'border-gray-600', text: 'text-gray-700' };
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'external' ? Globe : Server;
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'critical': return AlertTriangle;
      case 'payment': return Zap;
      case 'auth': return Shield;
      case 'infrastructure': return Database;
      default: return Activity;
    }
  };

  const statusColors = getStatusColor(data.status);
  const TypeIcon = getTypeIcon(data.type);
  const CategoryIcon = getCategoryIcon(data.category);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const service = services.find(s => s.id === data.id);
    if (service) {
      openServiceModal(service);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative bg-white rounded-xl border-2 p-4 cursor-pointer transition-all duration-300 min-w-[200px] max-w-[250px] ${
        selected ? 'border-blue-500 shadow-xl scale-110 z-10' : statusColors.border
      } ${
        data.isHighlighted ? 'ring-4 ring-blue-400 shadow-2xl scale-105 z-20' : ''
      } ${
        data.isAffected ? 'ring-4 ring-red-400 shadow-2xl animate-pulse scale-105 z-20' : ''
      } hover:shadow-xl hover:scale-105 hover:z-10`}
    >
      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-4 h-4 bg-gray-400 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ top: -8 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-4 h-4 bg-gray-400 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ bottom: -8 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 bg-gray-400 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: -8 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 bg-gray-400 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ right: -8 }}
      />

      {/* Status Indicator */}
      <div className="flex items-center justify-between mb-3">
        <div className={`w-4 h-4 rounded-full ${statusColors.bg} shadow-md border-2 border-white`} />
        <div className="flex items-center space-x-1">
          <TypeIcon className="w-4 h-4 text-gray-500" />
          <CategoryIcon className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Service Name */}
      <h4 className="font-bold text-sm text-gray-900 mb-2 leading-tight line-clamp-2">
        {data.name}
      </h4>

      {/* Service Details */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className={`font-bold uppercase tracking-wide ${statusColors.text}`}>
            {data.status}
          </span>
          <span className="font-bold text-gray-800">{data.health}%</span>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Response</span>
          <span className="font-semibold text-gray-800">{data.responseTime}ms</span>
        </div>

        {/* Health Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${statusColors.bg}`}
            style={{ width: `${data.health}%` }}
          />
        </div>
      </div>

      {/* Dependency Count Badge */}
      {data.dependencies.length > 0 && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
          {data.dependencies.length}
        </div>
      )}

      {/* Status Badge */}
      {data.status !== 'healthy' && (
        <div className={`absolute -top-2 -left-2 w-4 h-4 rounded-full ${statusColors.bg} border-2 border-white shadow-md animate-pulse`} />
      )}
    </div>
  );
};

// Node types configuration
const nodeTypes = {
  serviceNode: ServiceNode,
};

interface ServiceTopologyProps {
  className?: string;
}

function ServiceTopologyFlow({ className }: ServiceTopologyProps) {
  const { services, selectedService, isServiceModalOpen } = useDashboardStore();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'healthy' | 'degraded' | 'down'>('all');
  const [layoutType, setLayoutType] = useState<'hierarchical' | 'circular' | 'force'>('hierarchical');
  const [showLabels, setShowLabels] = useState(true);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView, zoomIn, zoomOut, setCenter } = useReactFlow();

  // Calculate layout positions
  const calculateLayout = useCallback((services: any[], layoutType: string) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const nodeSpacing = 280;
    const levelHeight = 200;

    if (layoutType === 'hierarchical') {
      // Group services by category for hierarchical layout
      const categories = ['critical', 'payment', 'auth', 'external', 'infrastructure', 'support'];
      const servicesByCategory = new Map();
      
      // Initialize categories
      categories.forEach(cat => servicesByCategory.set(cat, []));
      
      // Categorize services
      services.forEach(service => {
        const name = service.name.toLowerCase();
        let category = 'support'; // default
        
        if (name.includes('payment') || name.includes('transaction') || name.includes('billing') || name.includes('gateway')) {
          category = 'payment';
        } else if (name.includes('auth') || name.includes('security') || name.includes('fraud') || name.includes('kyc')) {
          category = 'auth';
        } else if (service.type === 'external' || name.includes('swift') || name.includes('ach') || name.includes('reuters')) {
          category = 'external';
        } else if (name.includes('database') || name.includes('cache') || name.includes('queue') || name.includes('storage')) {
          category = 'infrastructure';
        } else if (name.includes('core') || name.includes('primary') || name.includes('critical') || name.includes('account')) {
          category = 'critical';
        }
        
        servicesByCategory.get(category).push(service);
      });

      // Position nodes by category
      let yOffset = 0;
      categories.forEach((category, categoryIndex) => {
        const categoryServices = servicesByCategory.get(category);
        if (categoryServices.length === 0) return;

        const servicesPerRow = Math.ceil(Math.sqrt(categoryServices.length));
        
        categoryServices.forEach((service: any, index: number) => {
          const row = Math.floor(index / servicesPerRow);
          const col = index % servicesPerRow;
          const totalCols = Math.min(servicesPerRow, categoryServices.length - row * servicesPerRow);
          const xOffset = (col - (totalCols - 1) / 2) * nodeSpacing;
          
          nodes.push({
            id: service.id,
            type: 'serviceNode',
            position: { 
              x: xOffset, 
              y: yOffset + row * levelHeight 
            },
            data: {
              id: service.id,
              name: service.name,
              status: service.status,
              type: service.type,
              health: service.health,
              responseTime: service.responseTime,
              category,
              dependencies: service.dependencies || [],
            },
          });
        });
        
        const rows = Math.ceil(categoryServices.length / servicesPerRow);
        yOffset += rows * levelHeight + 100;
      });
    } else if (layoutType === 'circular') {
      // Circular layout
      const radius = Math.max(400, services.length * 20);
      const centerX = 0;
      const centerY = 0;
      
      services.forEach((service: any, index: number) => {
        const angle = (index / services.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        nodes.push({
          id: service.id,
          type: 'serviceNode',
          position: { x, y },
          data: {
            id: service.id,
            name: service.name,
            status: service.status,
            type: service.type,
            health: service.health,
            responseTime: service.responseTime,
            category: 'general',
            dependencies: service.dependencies || [],
          },
        });
      });
    } else {
      // Force-directed layout (grid with some randomness)
      const cols = Math.ceil(Math.sqrt(services.length));
      
      services.forEach((service: any, index: number) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        
        nodes.push({
          id: service.id,
          type: 'serviceNode',
          position: { 
            x: col * nodeSpacing + (Math.random() - 0.5) * 100, 
            y: row * levelHeight + (Math.random() - 0.5) * 100 
          },
          data: {
            id: service.id,
            name: service.name,
            status: service.status,
            type: service.type,
            health: service.health,
            responseTime: service.responseTime,
            category: 'general',
            dependencies: service.dependencies || [],
          },
        });
      });
    }

    // Create edges based on dependencies
    services.forEach((service: any) => {
      if (service.dependencies && service.dependencies.length > 0) {
        service.dependencies.forEach((depId: string) => {
          if (services.find((s: any) => s.id === depId)) {
            const isHealthy = service.status === 'healthy';
            edges.push({
              id: `${service.id}-${depId}`,
              source: depId,
              target: service.id,
              type: 'smoothstep',
              animated: !isHealthy,
              style: {
                strokeWidth: isHealthy ? 2 : 3,
                stroke: isHealthy ? '#10B981' : 
                       service.status === 'degraded' ? '#F59E0B' : '#EF4444',
                strokeDasharray: isHealthy ? '0' : '5,5',
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: isHealthy ? '#10B981' : 
                       service.status === 'degraded' ? '#F59E0B' : '#EF4444',
              },
              label: showLabels ? `${service.responseTime}ms` : undefined,
              labelStyle: { fontSize: 10, fill: '#666' },
              labelBgStyle: { fill: 'white', fillOpacity: 0.8 },
            });
          }
        });
      }
    });

    return { nodes, edges };
  }, [showLabels]);

  // Filter services based on search and status
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [services, searchTerm, filterStatus]);

  // Update nodes and edges when services change
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = calculateLayout(filteredServices, layoutType);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [filteredServices, layoutType, calculateLayout, setNodes, setEdges]);

  // Highlight affected services when one fails
  const highlightAffectedServices = useCallback((nodeId: string) => {
    const affectedNodes = new Set<string>();
    const queue = [nodeId];
    
    // Find all services that depend on the failed service (BFS)
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      affectedNodes.add(currentId);
      
      // Find services that depend on current service
      services.forEach(service => {
        if (service.dependencies?.includes(currentId) && !affectedNodes.has(service.id)) {
          queue.push(service.id);
        }
      });
    }

    // Update nodes with highlighting
    setNodes(currentNodes =>
      currentNodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          isHighlighted: node.id === nodeId,
          isAffected: affectedNodes.has(node.id) && node.id !== nodeId,
        },
      }))
    );
  }, [services, setNodes]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
    
    // If the node is down or degraded, highlight affected services
    if (node.data.status !== 'healthy') {
      highlightAffectedServices(node.id);
    } else {
      // Clear highlighting
      setNodes(currentNodes =>
        currentNodes.map(n => ({
          ...n,
          data: {
            ...n.data,
            isHighlighted: false,
            isAffected: false,
          },
        }))
      );
    }
  }, [highlightAffectedServices, setNodes]);

  const resetLayout = useCallback(() => {
    const { nodes: newNodes, edges: newEdges } = calculateLayout(filteredServices, layoutType);
    setNodes(newNodes);
    setEdges(newEdges);
    setTimeout(() => fitView({ duration: 800 }), 100);
  }, [filteredServices, layoutType, calculateLayout, setNodes, setEdges, fitView]);

  const clearHighlights = useCallback(() => {
    setNodes(currentNodes =>
      currentNodes.map(n => ({
        ...n,
        data: {
          ...n.data,
          isHighlighted: false,
          isAffected: false,
        },
      }))
    );
    setSelectedNodeId(null);
  }, [setNodes]);

  return (
    <div className={`relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 ${className}`}>
      {/* Control Panel */}
      <Panel position="top-left" className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 p-4 m-4 min-w-[280px]">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <GitBranch className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">Topology Controls</h3>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Status Filter</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md text-xs p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="healthy">Healthy</option>
                <option value="degraded">Degraded</option>
                <option value="down">Down</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Layout</label>
              <select
                value={layoutType}
                onChange={(e) => setLayoutType(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md text-xs p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="hierarchical">Hierarchical</option>
                <option value="circular">Circular</option>
                <option value="force">Force-Directed</option>
              </select>
            </div>
          </div>

          {/* Toggle Options */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showLabels}
                onChange={(e) => setShowLabels(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Show Labels</span>
            </label>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={resetLayout}
              className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            
            <button
              onClick={clearHighlights}
              className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </Panel>

      {/* Statistics Panel */}
      <Panel position="top-right" className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 p-4 m-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-4 h-4 text-purple-600" />
            <h3 className="font-bold text-gray-900 text-sm">Statistics</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Services</span>
              <span className="font-bold">{filteredServices.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Dependencies</span>
              <span className="font-bold">{edges.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-600">● Healthy</span>
              <span className="font-bold text-green-700">
                {filteredServices.filter(s => s.status === 'healthy').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-yellow-600">● Degraded</span>
              <span className="font-bold text-yellow-700">
                {filteredServices.filter(s => s.status === 'degraded').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-600">● Down</span>
              <span className="font-bold text-red-700">
                {filteredServices.filter(s => s.status === 'down').length}
              </span>
            </div>
          </div>
        </div>
      </Panel>

      {/* Legend Panel */}
      <Panel position="bottom-left" className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 p-4 m-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 mb-2">
            <Info className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-gray-900 text-sm">Legend</h3>
          </div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Healthy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span>Degraded</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>Down</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-green-500" />
              <span>Healthy Flow</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-red-500" style={{ borderStyle: 'dashed', borderWidth: '0 0 1px 0' }} />
              <span>Failed Flow</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border-2 border-blue-400 rounded-full" />
              <span>Selected</span>
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2">
            Click nodes to highlight dependencies
          </div>
        </div>
      </Panel>

      {/* React Flow */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 1.2 }}
        minZoom={0.1}
        maxZoom={2}
        className="bg-gradient-to-br from-gray-50 to-gray-100"
        panOnScroll
        selectionOnDrag
        panOnDrag={[1, 2]}
        zoomOnPinch
      >
        <Controls 
          className="bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 rounded-lg" 
          showZoom 
          showFitView 
          showInteractive
        />
        <MiniMap 
          nodeColor={(node) => {
            const status = node.data?.status;
            switch (status) {
              case 'healthy': return '#10B981';
              case 'degraded': return '#F59E0B';
              case 'down': return '#EF4444';
              default: return '#6B7280';
            }
          }}
          className="bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 rounded-lg"
          pannable
          zoomable
          position="bottom-right"
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={24} 
          size={1.5} 
          className="opacity-30"
        />
      </ReactFlow>
    </div>
  );
}

export default function ServiceTopology({ className }: ServiceTopologyProps) {
  return (
    <ReactFlowProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full h-[800px] ${className}`}
      >
        <ServiceTopologyFlow className="w-full h-full" />
      </motion.div>
    </ReactFlowProvider>
  );
} 