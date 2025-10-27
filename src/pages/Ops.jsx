import { motion } from 'framer-motion';
import {
  Calendar,
  AlertTriangle,
  Package,
  ClipboardList,
  TrendingUp,
  DollarSign,
  Wrench,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { operationsData } from '../utils/mockData';

const Ops = () => {
  const { maintenanceCalendar, afddAlerts, assetPortfolio, workOrders, optimizationRecommendations, performanceTrends, costSavings } = operationsData;

  const priorityColors = {
    critical: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' },
    high: { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
    medium: { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200' },
    low: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
  };

  const severityColors = {
    critical: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' },
    high: { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
    medium: { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200' },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gradient mb-4">InfAIra Ops</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Operational intelligence with predictive maintenance and automated fault detection
        </p>
      </motion.div>

      {/* Cost Savings Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 bg-gradient-to-r from-green-50 to-emerald-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Cost Savings Through Optimization</h2>
              <p className="text-sm text-gray-600">AI-driven operational efficiency improvements</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-green-600">₹{(costSavings.yearly * 84).toLocaleString('en-IN')}</p>
            <p className="text-sm text-gray-600">Annual Savings</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Monthly</p>
            <p className="text-2xl font-bold text-gray-900">₹{(costSavings.monthly * 84).toLocaleString('en-IN')}</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Yearly</p>
            <p className="text-2xl font-bold text-gray-900">₹{(costSavings.yearly * 84).toLocaleString('en-IN')}</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-600">Projected</p>
            <p className="text-2xl font-bold text-gray-900">₹{(costSavings.projected * 84).toLocaleString('en-IN')}</p>
          </div>
        </div>
      </motion.div>

      {/* Work Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Open', value: workOrders.open, icon: ClipboardList, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { label: 'In Progress', value: workOrders.inProgress, icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
          { label: 'Completed', value: workOrders.completed, icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-50' },
          { label: 'Overdue', value: workOrders.overdue, icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6"
            >
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* AFDD Alerts & Maintenance Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AFDD Alerts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">AFDD Alerts</h2>
            <span className="badge badge-danger">{afddAlerts.length}</span>
          </div>
          <div className="space-y-3">
            {afddAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-4 rounded-lg border ${severityColors[alert.severity].bg} ${severityColors[alert.severity].border}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{alert.type}</p>
                    <p className="text-sm text-gray-700 mt-1">{alert.equipment}</p>
                  </div>
                  <span className={`badge text-xs ${severityColors[alert.severity].text} ${severityColors[alert.severity].bg}`}>
                    {alert.severity}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">Root Cause Analysis:</p>
                  <p className="text-sm font-medium text-gray-900">{alert.rootCause}</p>
                  <p className="text-xs text-gray-500 mt-2">Detected {alert.detected}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Maintenance Calendar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900">Upcoming Maintenance</h2>
          </div>
          <div className="space-y-3">
            {maintenanceCalendar.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-4 rounded-lg border ${priorityColors[task.priority].bg} ${priorityColors[task.priority].border}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-gray-900 flex-1">{task.task}</p>
                  <span className={`badge text-xs ${priorityColors[task.priority].text} ${priorityColors[task.priority].bg}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{task.date}</span>
                  </div>
                  <span className="badge badge-info text-xs">{task.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Asset Portfolio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Package className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">Asset Portfolio Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {Object.entries(assetPortfolio).map(([category, data], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="space-y-3"
            >
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 capitalize mb-2">{category}</p>
                <p className="text-3xl font-bold text-gray-900">{data.total}</p>
                <p className="text-xs text-gray-500">Total Assets</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Healthy</span>
                  <span className="font-semibold text-green-600">{data.healthy}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Attention</span>
                  <span className="font-semibold text-yellow-600">{data.attention}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Critical</span>
                  <span className="font-semibold text-red-600">{data.critical}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Efficiency</span>
                  <span className="text-sm font-bold text-primary-600">{data.efficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.efficiency}%` }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                    className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Trends & Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">Performance Trends (90 Days)</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).getDate().toString()}
                />
                <YAxis tick={{ fontSize: 12 }} domain={[70, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value) => [`${value.toFixed(1)}%`, 'Performance']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Optimization Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Wrench className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Optimization Recommendations</h2>
          </div>
          <div className="space-y-3">
            {optimizationRecommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="font-semibold text-gray-900 flex-1">{rec.title}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-purple-600">{rec.impact}</span>
                    <span className="text-xs text-gray-600">score</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-green-600">{rec.savings}</span>
                  <span
                    className={`badge text-xs ${
                      rec.complexity === 'low'
                        ? 'badge-success'
                        : rec.complexity === 'medium'
                        ? 'badge-warning'
                        : 'badge-danger'
                    }`}
                  >
                    {rec.complexity} complexity
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Ops;
