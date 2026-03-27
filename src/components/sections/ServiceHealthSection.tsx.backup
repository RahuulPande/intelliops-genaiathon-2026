'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Network, 
  History, 
  Database,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MoreHorizontal,
  Star,
  StarOff,
  RefreshCw,
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Globe,
  Server,
  ExternalLink,
  Monitor,
  Gauge
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Service, ServiceType, ServiceStatus } from '@/lib/types';
import useDashboardStore from '@/store/dashboard';
import { formatPercentage } from '@/lib/utils/formatters';
import ServiceDetailModal from '@/components/dashboard/ServiceDetailModal';
import ServiceTopology from '@/components/dashboard/ServiceTopology';

type ServiceCategory = 'critical' | 'payment' | 'auth' | 'external' | 'infrastructure' | 'support';
type FilterType = 'all' | 'problems' | 'critical' | 'my-services' | 'favorites';
type ViewType = 'grid' | 'list' | 'topology';

interface ServiceGroup {
  category: ServiceCategory;
  title: string;
  description: string;
  icon: string;
  color: string;
  services: any[];
}

const ITEMS_PER_PAGE = 20;

export default function ServiceHealthSection() {
  const { 
    services, 
    selectedService, 
    isServiceModalOpen, 
    openServiceModal, 
    closeServiceModal 
  } = useDashboardStore();
  
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState<FilterType>('problems');
  const [expandedCategories, setExpandedCategories] = useState<Set<ServiceCategory>>(
    new Set(['critical', 'payment', 'auth', 'external', 'infrastructure', 'support'])
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteServices, setFavoriteServices] = useState<Set<string>>(new Set());
  const [lastSyncTime, setLastSyncTime] = useState(new Date());

  // Generate mini sparkline data for each service
  const generateSparklineData = useCallback(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      value: 85 + Math.random() * 15
    }));
  }, []);

  // Categorize services with enhanced logic
  const serviceGroups = useMemo((): ServiceGroup[] => {
    const groups: ServiceGroup[] = [
      {
        category: 'critical',
        title: 'Critical Banking Services',
        description: 'Core business-critical services',
        icon: '🏛️',
        color: 'text-red-600',
        services: []
      },
      {
        category: 'payment',
        title: 'Payment & Transaction',
        description: 'Payment processing and transaction services',
        icon: '💳',
        color: 'text-green-600',
        services: []
      },
      {
        category: 'auth',
        title: 'Authentication & Security',
        description: 'Security and authentication services',
        icon: '🔐',
        color: 'text-blue-600',
        services: []
      },
      {
        category: 'external',
        title: 'External Integrations',
        description: 'Third-party service integrations',
        icon: '🔗',
        color: 'text-purple-600',
        services: []
      },
      {
        category: 'infrastructure',
        title: 'Infrastructure Services',
        description: 'Core infrastructure and platform services',
        icon: '⚙️',
        color: 'text-gray-600',
        services: []
      },
      {
        category: 'support',
        title: 'Support Services',
        description: 'Supporting and utility services',
        icon: '🛠️',
        color: 'text-orange-600',
        services: []
      }
    ];

    // Enhanced categorization based on service names and types
    services.forEach(service => {
      const name = service.name.toLowerCase();
      const type = service.type?.toLowerCase() || '';
      
      if (name.includes('payment') || name.includes('transaction') || name.includes('billing') || name.includes('gateway')) {
        groups.find(g => g.category === 'payment')?.services.push(service);
      } else if (name.includes('auth') || name.includes('security') || name.includes('fraud') || name.includes('kyc') || name.includes('sanctions')) {
        groups.find(g => g.category === 'auth')?.services.push(service);
      } else if (type === 'external' || name.includes('api') || name.includes('swift') || name.includes('ach') || name.includes('bureau') || name.includes('reuters') || name.includes('bloomberg')) {
        groups.find(g => g.category === 'external')?.services.push(service);
      } else if (name.includes('database') || name.includes('cache') || name.includes('queue') || name.includes('storage') || name.includes('load balancer') || name.includes('monitoring')) {
        groups.find(g => g.category === 'infrastructure')?.services.push(service);
      } else if (name.includes('core') || name.includes('primary') || name.includes('critical') || name.includes('account') || name.includes('loan') || name.includes('credit')) {
        groups.find(g => g.category === 'critical')?.services.push(service);
      } else {
        groups.find(g => g.category === 'support')?.services.push(service);
      }
    });

    return groups.filter(group => group.services.length > 0);
  }, [services]);

  // Apply filters and search with proper pagination
  const filteredServices = useMemo(() => {
    let allServices: any[] = [];
    
    serviceGroups.forEach(group => {
      group.services.forEach(service => {
        // Search filter
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Type filter
        let matchesFilter = true;
        switch (currentFilter) {
          case 'problems':
            matchesFilter = service.status !== 'healthy';
            break;
          case 'critical':
            matchesFilter = service.name.toLowerCase().includes('core') || 
                           service.name.toLowerCase().includes('primary') || 
                           service.name.toLowerCase().includes('critical') ||
                           group.category === 'critical';
            break;
          case 'my-services':
          case 'favorites':
            matchesFilter = favoriteServices.has(service.id);
            break;
          case 'all':
          default:
            matchesFilter = true;
        }
        
        if (matchesSearch && matchesFilter) {
          allServices.push({ ...service, category: group.category, categoryTitle: group.title });
        }
      });
    });
    
    return allServices;
  }, [serviceGroups, searchTerm, currentFilter, favoriteServices]);

  // Paginated services
  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredServices.slice(startIndex, endIndex);
  }, [filteredServices, currentPage]);

  // Group paginated services by category for display
  const displayGroups = useMemo(() => {
    const groups: ServiceGroup[] = [
      { category: 'critical', title: 'Critical Banking Services', description: '', icon: '🏛️', color: 'text-red-600', services: [] },
      { category: 'payment', title: 'Payment & Transaction', description: '', icon: '💳', color: 'text-green-600', services: [] },
      { category: 'auth', title: 'Authentication & Security', description: '', icon: '🔐', color: 'text-blue-600', services: [] },
      { category: 'external', title: 'External Integrations', description: '', icon: '🔗', color: 'text-purple-600', services: [] },
      { category: 'infrastructure', title: 'Infrastructure Services', description: '', icon: '⚙️', color: 'text-gray-600', services: [] },
      { category: 'support', title: 'Support Services', description: '', icon: '🛠️', color: 'text-orange-600', services: [] }
    ];

    paginatedServices.forEach(service => {
      const group = groups.find(g => g.category === service.category);
      if (group) {
        group.services.push(service);
      }
    });

    return groups.filter(group => group.services.length > 0);
  }, [paginatedServices]);

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

  const toggleCategory = (category: ServiceCategory) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const toggleFavorite = (serviceId: string) => {
    setFavoriteServices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'down': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-700';
      case 'degraded': return 'text-yellow-700';
      case 'down': return 'text-red-700';
      default: return 'text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'external' ? Globe : Server;
  };

  const filterOptions = [
    { id: 'problems', label: 'Show Problems Only', count: services.filter(s => s.status !== 'healthy').length },
    { id: 'all', label: 'All Services', count: services.length },
    { id: 'critical', label: 'Critical Services', count: services.filter(s => s.name.toLowerCase().includes('core') || s.name.toLowerCase().includes('primary') || s.name.toLowerCase().includes('critical')).length },
    { id: 'favorites', label: 'My Favorites', count: favoriteServices.size },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Service Health</h1>
            <p className="text-gray-600 mt-1">
              Monitoring {services.length} services • {filteredServices.length} matching filters
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-600">Last sync: {lastSyncTime.toLocaleTimeString()}</span>
            </div>
            <button 
              onClick={() => setLastSyncTime(new Date())}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              label: 'Healthy Services', 
              value: services.filter(s => s.status === 'healthy').length,
              total: services.length,
              color: 'text-green-600',
              bgColor: 'bg-green-50',
              borderColor: 'border-green-200',
              icon: CheckCircle
            },
            { 
              label: 'Degraded Services', 
              value: services.filter(s => s.status === 'degraded').length,
              total: services.length,
              color: 'text-yellow-600',
              bgColor: 'bg-yellow-50',
              borderColor: 'border-yellow-200',
              icon: AlertTriangle
            },
            { 
              label: 'Down Services', 
              value: services.filter(s => s.status === 'down').length,
              total: services.length,
              color: 'text-red-600',
              bgColor: 'bg-red-50',
              borderColor: 'border-red-200',
              icon: AlertTriangle
            },
            { 
              label: 'External Services', 
              value: services.filter(s => s.type === 'external').length,
              total: services.length,
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
              borderColor: 'border-purple-200',
              icon: ExternalLink
            }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            const percentage = ((stat.value / stat.total) * 100).toFixed(1);
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${stat.borderColor} ${stat.bgColor}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-sm text-gray-500">({percentage}%)</p>
                    </div>
                  </div>
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Filter Options */}
          <div className="flex items-center space-x-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setCurrentFilter(option.id as FilterType);
                  setCurrentPage(1); // Reset to first page on filter change
                }}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  currentFilter === option.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>

          {/* View Type Toggle */}
          <div className="flex items-center space-x-1 border border-gray-200 rounded-lg p-1">
            {[
              { type: 'grid', icon: Grid, label: 'Grid' },
              { type: 'list', icon: List, label: 'List' },
              { type: 'topology', icon: Network, label: 'Topology' }
            ].map((view) => {
              const IconComponent = view.icon;
              return (
                <button
                  key={view.type}
                  onClick={() => setViewType(view.type as ViewType)}
                  className={`p-2 rounded-md transition-colors ${
                    viewType === view.type
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title={view.label}
                >
                  <IconComponent className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service Grid */}
      {viewType === 'grid' && (
        <div className="space-y-6">
          {displayGroups.map((group) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(group.category)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{group.icon}</span>
                  <div className="text-left">
                    <h3 className={`font-semibold text-lg ${group.color}`}>{group.title}</h3>
                    <p className="text-sm text-gray-600">{group.services.length} services in this view</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {group.services.filter(s => s.status === 'healthy').length > 0 && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">
                          {group.services.filter(s => s.status === 'healthy').length}
                        </span>
                      </div>
                    )}
                    {group.services.filter(s => s.status === 'degraded').length > 0 && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">
                          {group.services.filter(s => s.status === 'degraded').length}
                        </span>
                      </div>
                    )}
                    {group.services.filter(s => s.status === 'down').length > 0 && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">
                          {group.services.filter(s => s.status === 'down').length}
                        </span>
                      </div>
                    )}
                  </div>
                  {expandedCategories.has(group.category) ? 
                    <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  }
                </div>
              </button>

              {/* Service Cards */}
              <AnimatePresence>
                {expandedCategories.has(group.category) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 border-t border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {group.services.map((service, index) => {
                          const TypeIcon = getTypeIcon(service.type);
                          return (
                            <motion.div
                              key={service.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="relative group"
                            >
                              {/* Enhanced Service Card */}
                              <div
                                onClick={() => openServiceModal(service)}
                                className="p-4 rounded-lg border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-blue-300 hover:scale-105 bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-blue-50"
                              >
                                {/* Card Header */}
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-2">
                                    <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)} shadow-sm`} />
                                    <div className="flex items-center space-x-1">
                                      <TypeIcon className="w-3 h-3 text-gray-500" />
                                      <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                        {service.type}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(service.id);
                                      }}
                                      className="p-1 rounded hover:bg-gray-100 transition-colors"
                                    >
                                      {favoriteServices.has(service.id) ? 
                                        <Star className="w-3 h-3 text-yellow-500 fill-current" /> :
                                        <StarOff className="w-3 h-3 text-gray-400" />
                                      }
                                    </button>
                                    <button className="p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <MoreHorizontal className="w-3 h-3 text-gray-400" />
                                    </button>
                                  </div>
                                </div>

                                {/* Service Name */}
                                <h4 className="font-semibold text-gray-900 text-sm mb-2 truncate group-hover:text-blue-700 transition-colors" title={service.name}>
                                  {service.name}
                                </h4>

                                {/* Status and Health */}
                                <div className="flex items-center justify-between mb-3">
                                  <span className={`text-xs font-bold uppercase tracking-wide ${getStatusTextColor(service.status)}`}>
                                    {service.status}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <Activity className="w-3 h-3 text-gray-500" />
                                    <span className="text-sm font-bold text-gray-900">{service.health}%</span>
                                  </div>
                                </div>

                                {/* Health Progress Bar */}
                                <div className="mb-3">
                                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <div 
                                      className={`h-2 rounded-full transition-all duration-500 ${
                                        service.status === 'healthy' ? 'bg-gradient-to-r from-green-400 to-green-500' :
                                        service.status === 'degraded' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 
                                        'bg-gradient-to-r from-red-400 to-red-500'
                                      }`}
                                      style={{ width: `${service.health}%` }}
                                    />
                                  </div>
                                </div>

                                {/* Response Time */}
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3 text-gray-500" />
                                    <span className="text-xs text-gray-600">Response</span>
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">
                                    {service.responseTime}ms
                                  </span>
                                </div>

                                {/* Mini Sparkline */}
                                <div className="h-8 mb-3">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={generateSparklineData()}>
                                      <Line 
                                        type="monotone" 
                                        dataKey="value" 
                                        stroke={service.status === 'healthy' ? '#10B981' : service.status === 'degraded' ? '#F59E0B' : '#EF4444'}
                                        strokeWidth={2}
                                        dot={false}
                                        strokeDasharray={service.status === 'healthy' ? '0' : '3 3'}
                                      />
                                    </LineChart>
                                  </ResponsiveContainer>
                                </div>

                                {/* Quick Stats */}
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Monitor className="w-3 h-3" />
                                    <span>24/7</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Gauge className="w-3 h-3" />
                                    <span>{formatPercentage(service.uptime || 0)}</span>
                                  </div>
                                  {service.health > 90 ? 
                                    <TrendingUp className="w-3 h-3 text-green-500" /> :
                                    <TrendingDown className="w-3 h-3 text-red-500" />
                                  }
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-600">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredServices.length)} of {filteredServices.length} services
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {/* Page Numbers */}
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 ${
                        currentPage === pageNum ? 'bg-blue-100 text-blue-700 border-blue-300' : ''
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* List View (Enhanced) */}
      {viewType === 'list' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Service List View</h3>
            <p className="text-sm text-gray-600 mt-1">Detailed table view of all services</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uptime</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedServices.map((service) => {
                  const TypeIcon = getTypeIcon(service.type);
                  return (
                    <tr key={service.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openServiceModal(service)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)} mr-3`} />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{service.name}</div>
                            <div className="text-sm text-gray-500">{service.categoryTitle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          service.status === 'healthy' ? 'bg-green-100 text-green-800' :
                          service.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {service.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {service.health}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {service.responseTime}ms
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <TypeIcon className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-900 capitalize">{service.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPercentage(service.uptime || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(service.id);
                          }}
                          className="text-gray-400 hover:text-yellow-500 mr-3"
                        >
                          {favoriteServices.has(service.id) ? 
                            <Star className="w-4 h-4 text-yellow-500 fill-current" /> :
                            <StarOff className="w-4 h-4" />
                          }
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openServiceModal(service);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination for List View */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredServices.length)} of {filteredServices.length} services
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Topology View */}
      {viewType === 'topology' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Service Dependency Topology</h3>
            <p className="text-sm text-gray-600 mt-1">
              Interactive visualization of service dependencies and health status
            </p>
          </div>
          <ServiceTopology />
        </motion.div>
      )}

      {/* Service Detail Modal */}
      <ServiceDetailModal 
        service={selectedService}
        isOpen={isServiceModalOpen}
        onClose={closeServiceModal}
      />
    </div>
  );
} 