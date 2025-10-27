import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Camera,
  Building2,
  Leaf,
  Users,
  Activity,
  AlertCircle,
  Thermometer,
  Maximize2,
  X,
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { commandCenterData } from '../utils/mockData';

const Command = () => {
  const [expandedWidget, setExpandedWidget] = useState(null);

  const widgets = [
    {
      id: 'energy',
      title: 'Energy Management',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      component: EnergyWidget,
    },
    {
      id: 'security',
      title: 'Security Overview',
      icon: Camera,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      component: SecurityWidget,
    },
    {
      id: 'facilities',
      title: 'Facilities Status',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      component: FacilitiesWidget,
    },
    {
      id: 'sustainability',
      title: 'Sustainability Metrics',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      component: SustainabilityWidget,
    },
    {
      id: 'occupancy',
      title: 'Occupancy Heatmap',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      component: OccupancyWidget,
    },
    {
      id: 'assets',
      title: 'Asset Performance',
      icon: Activity,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      component: AssetsWidget,
    },
    {
      id: 'alerts',
      title: 'Alert Feed',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      component: AlertsWidget,
    },
    {
      id: 'environmental',
      title: 'Environmental Sensors',
      icon: Thermometer,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      component: EnvironmentalWidget,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gradient mb-4">InfAIra Command</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Mission control dashboard for comprehensive facility monitoring and management
        </p>
      </motion.div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {widgets.map((widget, index) => {
          const Icon = widget.icon;
          const WidgetComponent = widget.component;

          return (
            <motion.div
              key={widget.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-5 relative group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${widget.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${widget.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm">{widget.title}</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setExpandedWidget(widget)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Maximize2 className="w-4 h-4 text-gray-600" />
                </motion.button>
              </div>

              {/* Widget Content */}
              <WidgetComponent />
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Widget Modal */}
      <AnimatePresence>
        {expandedWidget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedWidget(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-auto min-w-[800px] max-w-[1400px] max-h-[90vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`${expandedWidget.bgColor} p-8 border-b border-gray-200 flex items-center justify-between flex-shrink-0`}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                    {(() => {
                      const Icon = expandedWidget.icon;
                      return <Icon className={`w-8 h-8 ${expandedWidget.color}`} />;
                    })()}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{expandedWidget.title}</h2>
                </div>
                <button
                  onClick={() => setExpandedWidget(null)}
                  className="p-3 hover:bg-white/50 rounded-xl transition-colors"
                >
                  <X className="w-7 h-7 text-gray-600" />
                </button>
              </div>
              <div className="p-8 overflow-y-auto flex-1">
                <div className="text-lg">
                  <expandedWidget.component expanded />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Widget Components
function EnergyWidget({ expanded }) {
  const data = commandCenterData.energy;
  const chartData = data.trend.slice(-12).map((d, i) => ({ time: i, value: d.value }));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-gray-600">Consumption</p>
          <p className="text-xl font-bold text-gray-900">{data.consumption} kW</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Cost</p>
          <p className="text-xl font-bold text-gray-900">₹{(data.cost * 84).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
        </div>
      </div>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="#f59e0b" fill="url(#energyGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">Efficiency</span>
        <span className="badge badge-success">{data.efficiency}%</span>
      </div>
    </div>
  );
}

function SecurityWidget({ expanded }) {
  const data = commandCenterData.security;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">Cameras</p>
          <p className="text-xl font-bold text-gray-900">{data.active}/{data.cameras}</p>
        </div>
        <div className="p-3 bg-red-50 rounded-lg">
          <p className="text-xs text-gray-600">Alerts</p>
          <p className="text-xl font-bold text-red-600">{data.alerts}</p>
        </div>
      </div>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {data.incidents.slice(0, expanded ? undefined : 2).map((incident) => (
          <div
            key={incident.id}
            className={`p-2 rounded-lg text-xs ${
              incident.severity === 'high'
                ? 'bg-red-50 text-red-800'
                : incident.severity === 'medium'
                ? 'bg-yellow-50 text-yellow-800'
                : 'bg-blue-50 text-blue-800'
            }`}
          >
            <p className="font-medium">{incident.type}</p>
            <p className="text-xs opacity-75">{incident.zone} • {incident.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FacilitiesWidget({ expanded }) {
  const data = commandCenterData.facilities;

  return (
    <div className="space-y-3">
      {Object.entries(data).map(([key, system]) => (
        <div key={key} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-700 capitalize">{key}</span>
            <span className="badge badge-success text-xs">{system.status}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
              style={{ width: `${system.efficiency}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SustainabilityWidget({ expanded }) {
  const data = commandCenterData.sustainability;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="p-3 bg-green-50 rounded-lg">
        <p className="text-xs text-gray-600">Carbon</p>
        <p className="text-lg font-bold text-gray-900">{data.carbonFootprint}t</p>
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-gray-600">Water</p>
        <p className="text-lg font-bold text-gray-900">{(data.waterUsage / 1000).toFixed(1)}k L</p>
      </div>
      <div className="p-3 bg-yellow-50 rounded-lg">
        <p className="text-xs text-gray-600">Renewable</p>
        <p className="text-lg font-bold text-gray-900">{data.renewableEnergy}%</p>
      </div>
      <div className="p-3 bg-purple-50 rounded-lg">
        <p className="text-xs text-gray-600">Recycled</p>
        <p className="text-lg font-bold text-gray-900">{data.wasteRecycled}%</p>
      </div>
    </div>
  );
}

function OccupancyWidget({ expanded }) {
  const data = commandCenterData.occupancy;

  return (
    <div className="space-y-3">
      <div className="text-center">
        <p className="text-3xl font-bold text-gray-900">{data.current}</p>
        <p className="text-xs text-gray-600">of {data.capacity} capacity</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-green-500 to-yellow-500"
          style={{ width: `${data.percentage}%` }}
        />
      </div>
      <div className="grid grid-cols-5 gap-1">
        {data.heatmap.slice(0, 20).map((value, i) => {
          // Green-Yellow-Red gradient based on occupancy
          const getColor = (val) => {
            if (val < 50) return `rgba(34, 197, 94, ${val / 50})`; // Green
            if (val < 75) return `rgba(234, 179, 8, ${(val - 50) / 25})`; // Yellow
            return `rgba(239, 68, 68, ${(val - 75) / 25})`; // Red
          };
          return (
            <div
              key={i}
              className="aspect-square rounded"
              style={{
                backgroundColor: getColor(value),
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function AssetsWidget({ expanded }) {
  const data = commandCenterData.assets;

  return (
    <div className="space-y-2">
      {data.slice(0, expanded ? undefined : 5).map((asset) => (
        <div key={asset.id} className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-900 truncate">{asset.name}</p>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
              <div
                className={`h-1 rounded-full ${
                  asset.status === 'excellent' ? 'bg-green-500' :
                  asset.status === 'good' ? 'bg-blue-500' :
                  asset.status === 'fair' ? 'bg-yellow-500' :
                  asset.status === 'attention' ? 'bg-orange-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${asset.health}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-bold text-gray-900 ml-2">{asset.health}%</span>
        </div>
      ))}
    </div>
  );
}

function AlertsWidget({ expanded }) {
  const data = commandCenterData.alerts;

  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {data.slice(0, expanded ? undefined : 4).map((alert) => (
        <div
          key={alert.id}
          className={`p-2 rounded-lg text-xs ${
            alert.severity === 'critical'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : alert.severity === 'warning'
              ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          <p className="font-medium">{alert.message}</p>
          <p className="text-xs opacity-75 mt-1">{alert.time}</p>
        </div>
      ))}
    </div>
  );
}

function EnvironmentalWidget({ expanded }) {
  const data = commandCenterData.environmental;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="p-3 bg-red-50 rounded-lg">
        <p className="text-xs text-gray-600">Temperature</p>
        <p className="text-xl font-bold text-gray-900">{data.temperature}°C</p>
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-gray-600">Humidity</p>
        <p className="text-xl font-bold text-gray-900">{data.humidity}%</p>
      </div>
      <div className="p-3 bg-green-50 rounded-lg">
        <p className="text-xs text-gray-600">Air Quality</p>
        <p className="text-xl font-bold text-gray-900">{data.airQuality}</p>
      </div>
      <div className="p-3 bg-purple-50 rounded-lg">
        <p className="text-xs text-gray-600">CO₂</p>
        <p className="text-xl font-bold text-gray-900">{data.co2} ppm</p>
      </div>
    </div>
  );
}

export default Command;
