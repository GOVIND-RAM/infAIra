import { motion } from 'framer-motion';
import { TrendingDown, Droplet, Zap, Recycle, Award, Target, TrendingUp, Lightbulb, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, 
  ReferenceLine
} from 'recharts';
import { sustainabilityData } from '../utils/mockData';
import { useState } from 'react';

const Sustain = () => {
  const { heroMetrics, monthlyTrends, goals, greenMarkScore, achievements, recommendations } = sustainabilityData;
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);
  const [activeChart, setActiveChart] = useState(null);

  // Enhanced data processing with anomaly detection
  const processChartData = (data, threshold, metric) => {
    const avg = data.reduce((sum, d) => sum + d.value, 0) / data.length;
    const stdDev = Math.sqrt(
      data.reduce((sum, d) => sum + Math.pow(d.value - avg, 2), 0) / data.length
    );
    
    return data.map((point, idx) => {
      const isAnomaly = Math.abs(point.value - avg) > stdDev * 1.5;
      const isHigh = point.value > threshold;
      const trend = idx > 0 ? point.value - data[idx - 1].value : 0;
      
      return {
        ...point,
        average: avg,
        threshold: threshold,
        isAnomaly,
        isHigh,
        status: isAnomaly ? 'warning' : isHigh ? 'alert' : 'normal',
        trend,
        deviation: ((point.value - avg) / avg * 100).toFixed(1)
      };
    });
  };

  const chartConfigs = [
    {
      title: 'Energy Consumption',
      data: processChartData(monthlyTrends.energy, 1300, 'energy'),
      color: '#fbbf24',
      unit: 'kWh',
      threshold: 1300,
      icon: Zap,
      description: 'Last 7 days energy consumption with target threshold',
      insights: 'Monitor spikes and optimize during peak hours',
      chartType: 'bar' // Bar chart for energy
    },
    {
      title: 'Water Usage',
      data: processChartData(monthlyTrends.water, 16000, 'water'),
      color: '#3b82f6',
      unit: 'L',
      threshold: 16000,
      icon: Droplet,
      description: 'Water consumption tracking with conservation goals',
      insights: 'Identify leaks and optimize irrigation schedules',
      chartType: 'area' // Area chart for water flow
    },
    {
      title: 'Carbon Emissions',
      data: processChartData(monthlyTrends.carbon, 160, 'carbon'),
      color: '#10b981',
      unit: 'kg CO₂',
      threshold: 160,
      icon: TrendingDown,
      description: 'Carbon footprint monitoring for net-zero goals',
      insights: 'Track progress toward carbon neutrality targets',
      chartType: 'area' // Area chart for emissions
    },
    {
      title: 'Waste Generated',
      data: processChartData(monthlyTrends.waste, 520, 'waste'),
      color: '#a78bfa',
      unit: 'kg',
      threshold: 520,
      icon: Recycle,
      description: 'Waste generation with recycling rate tracking',
      insights: 'Maximize waste diversion and reduce landfill',
      chartType: 'bar' // Bar chart for waste
    },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label, config }) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      const date = new Date(data.date);
      
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-4 shadow-xl border-2 border-white"
        >
          <p className="font-bold text-gray-900 mb-2">
            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-sm text-gray-600">Value:</span>
              <span className="font-bold" style={{ color: config.color }}>
                {data.value.toFixed(1)} {config.unit}
              </span>
            </div>
            
            <div className="flex items-center justify-between space-x-4">
              <span className="text-sm text-gray-600">Average:</span>
              <span className="font-semibold text-gray-700">
                {data.average.toFixed(1)} {config.unit}
              </span>
            </div>
            
            <div className="flex items-center justify-between space-x-4">
              <span className="text-sm text-gray-600">Deviation:</span>
              <span className={`font-semibold ${Math.abs(data.deviation) > 10 ? 'text-red-600' : 'text-green-600'}`}>
                {data.deviation > 0 ? '+' : ''}{data.deviation}%
              </span>
            </div>

            {data.trend !== 0 && (
              <div className="flex items-center justify-between space-x-4">
                <span className="text-sm text-gray-600">Trend:</span>
                <span className={`font-semibold flex items-center ${data.trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {data.trend > 0 ? '↑' : '↓'} {Math.abs(data.trend).toFixed(1)}
                </span>
              </div>
            )}
            
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                {data.status === 'warning' && (
                  <>
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="text-xs text-yellow-600 font-semibold">Anomaly Detected</span>
                  </>
                )}
                {data.status === 'alert' && (
                  <>
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-xs text-red-600 font-semibold">Above Threshold</span>
                  </>
                )}
                {data.status === 'normal' && (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600 font-semibold">Within Range</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gradient mb-4">InfAIra Sustain</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          ESG analytics and sustainability performance tracking for green building compliance
        </p>
      </motion.div>

      {/* Hero Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Carbon Saved',
            value: heroMetrics.carbonSaved,
            unit: 'tons CO₂',
            icon: TrendingDown,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            gradient: 'from-green-500 to-green-600',
          },
          {
            label: 'Energy Efficiency',
            value: heroMetrics.efficiencyImprovement,
            unit: '% improvement',
            icon: Zap,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            gradient: 'from-yellow-500 to-yellow-600',
          },
          {
            label: 'Water Conservation',
            value: (heroMetrics.waterConservation / 1000).toFixed(1),
            unit: 'k liters',
            icon: Droplet,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            gradient: 'from-blue-500 to-blue-600',
          },
          {
            label: 'Waste Diverted',
            value: heroMetrics.wasteDiverted,
            unit: '% recycled',
            icon: Recycle,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            gradient: 'from-purple-500 to-purple-600',
          },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <div className="flex items-baseline space-x-2">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-3xl font-bold text-gray-900"
                >
                  {metric.value}
                </motion.p>
                <span className="text-sm text-gray-600">{metric.unit}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Green Mark Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Green Building Certification</h2>
              <p className="text-sm text-gray-600">Indian Green Building Council (IGBC)</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-gradient">{greenMarkScore}</p>
            <p className="text-sm text-gray-600">Platinum Status</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${greenMarkScore}%` }}
            transition={{ delay: 0.6, duration: 1 }}
            className="h-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-end pr-2"
          >
            <span className="text-xs font-bold text-white">{greenMarkScore}%</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Interactive Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartConfigs.map((config, index) => {
          const Icon = config.icon;
          const anomalies = config.data.filter(d => d.isAnomaly || d.isHigh).length;
          const lastValue = config.data[config.data.length - 1];
          const trendDirection = lastValue.trend > 0 ? 'increasing' : 'decreasing';
          
          return (
          <motion.div
              key={config.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}
              className={`glass-card p-6 cursor-pointer transition-all ${
                activeChart === config.title ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => setActiveChart(activeChart === config.title ? null : config.title)}
            >
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: config.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{config.title}</h3>
                    <p className="text-xs text-gray-500">{config.description}</p>
                  </div>
                </div>
                
                {anomalies > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center space-x-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-bold">{anomalies}</span>
                  </motion.div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Current</p>
                  <p className="text-sm font-bold" style={{ color: config.color }}>
                    {lastValue.value.toFixed(0)} {config.unit}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Average</p>
                  <p className="text-sm font-bold text-gray-700">
                    {lastValue.average.toFixed(0)} {config.unit}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Trend</p>
                  <p className={`text-sm font-bold flex items-center justify-center ${
                    lastValue.trend > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {lastValue.trend > 0 ? '↑' : '↓'} {Math.abs(lastValue.trend).toFixed(0)}
                  </p>
                </div>
              </div>

              {/* Interactive Chart - Bar & Area Charts */}
              <div className="h-56 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  {config.chartType === 'bar' ? (
                    // BAR CHART - Energy & Waste
                    <BarChart 
                      data={config.data}
                      onMouseMove={(e) => {
                        if (e.activePayload && e.activePayload[0]) {
                          setSelectedDataPoint(e.activePayload[0].payload);
                        }
                      }}
                      onMouseLeave={() => setSelectedDataPoint(null)}
                      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id={`bar-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={config.color} stopOpacity={0.6} />
                          <stop offset="95%" stopColor={config.color} stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 14, fill: '#374151', fontWeight: 600 }}
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                          return days[date.getDay()];
                        }}
                        interval={0}
                      />
                      <YAxis 
                        tick={{ fontSize: 14, fill: '#374151', fontWeight: 600 }}
                        tickFormatter={(value) => Math.round(value).toLocaleString()}
                        allowDecimals={false}
                        width={70}
                      />
                      <Tooltip content={<CustomTooltip config={config} />} />
                      <ReferenceLine 
                        y={config.threshold} 
                        stroke="#ef4444" 
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        label={{ value: 'Target', position: 'insideTopRight', fill: '#ef4444', fontSize: 11, fontWeight: 'bold' }}
                      />
                      <ReferenceLine 
                        y={config.data[0].average} 
                        stroke="#6b7280" 
                        strokeDasharray="3 3"
                        strokeWidth={1}
                        label={{ value: 'Avg', position: 'insideBottomRight', fill: '#6b7280', fontSize: 10 }}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[8, 8, 0, 0]} 
                        fill={config.color}
                        animationDuration={1000}
                      />
                    </BarChart>
                  ) : config.chartType === 'area' ? (
                    // AREA CHART - Water & Carbon
                    <AreaChart 
                      data={config.data}
                      onMouseMove={(e) => {
                        if (e.activePayload && e.activePayload[0]) {
                          setSelectedDataPoint(e.activePayload[0].payload);
                        }
                      }}
                      onMouseLeave={() => setSelectedDataPoint(null)}
                      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id={`area-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={config.color} stopOpacity={0.6} />
                          <stop offset="95%" stopColor={config.color} stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 14, fill: '#374151', fontWeight: 600 }}
                        tickFormatter={(value) => {
                          const date = new Date(value);
                          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                          return days[date.getDay()];
                        }}
                        interval={0}
                      />
                      <YAxis 
                        tick={{ fontSize: 14, fill: '#374151', fontWeight: 600 }}
                        tickFormatter={(value) => Math.round(value).toLocaleString()}
                        allowDecimals={false}
                        width={70}
                      />
                      <Tooltip content={<CustomTooltip config={config} />} />
                      <ReferenceLine 
                        y={config.threshold} 
                        stroke="#ef4444" 
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        label={{ value: 'Target', position: 'insideTopRight', fill: '#ef4444', fontSize: 11, fontWeight: 'bold' }}
                      />
                      <ReferenceLine 
                        y={config.data[0].average} 
                        stroke="#6b7280" 
                        strokeDasharray="3 3"
                        strokeWidth={1}
                        label={{ value: 'Avg', position: 'insideBottomRight', fill: '#6b7280', fontSize: 10 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                        stroke={config.color}
                        strokeWidth={3}
                        fill={`url(#area-gradient-${index})`}
                        animationDuration={1000}
                        dot={(props) => {
                          const { cx, cy, payload } = props;
                          if (payload.isAnomaly || payload.isHigh) {
                            return (
                              <circle
                                cx={cx}
                                cy={cy}
                                r={5}
                                fill={payload.isHigh ? '#ef4444' : '#f59e0b'}
                                stroke="#fff"
                                strokeWidth={2}
                              />
                            );
                          }
                          return null;
                        }}
                      />
                    </AreaChart>
                  ) : null}
              </ResponsiveContainer>
            </div>

              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: activeChart === config.title ? 1 : 0,
                  height: activeChart === config.title ? 'auto' : 0
                }}
                className="overflow-hidden"
              >
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-blue-900 mb-1">AI Insight</p>
                      <p className="text-xs text-blue-700">{config.insights}</p>
                      {anomalies > 0 && (
                        <p className="text-xs text-yellow-700 mt-2 font-semibold">
                          ⚠️ {anomalies} anomalies detected in the last 7 days. Hover over data points for details.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
          </motion.div>
          );
        })}
      </div>

      {/* Goals Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="glass-card p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Target className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-bold text-gray-900">Sustainability Goals</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{goal.name}</p>
                  <p className="text-sm text-gray-600">Target by {goal.deadline}</p>
                </div>
                <span className="text-2xl font-bold text-primary-600">{goal.current}%</span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.current}%` }}
                    transition={{ delay: 1 + index * 0.1 + 0.3, duration: 0.8 }}
                    className={`h-3 rounded-full ${
                      goal.current >= 75
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : goal.current >= 50
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                        : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                  />
                </div>
                <div
                  className="absolute top-0 h-3 w-0.5 bg-gray-400"
                  style={{ left: `${goal.target}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Current: {goal.current}%</span>
                <span>Target: {goal.target}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Award className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-bold text-gray-900">Recent Achievements</h2>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon === 'award' ? Award :
                           achievement.icon === 'zap' ? Zap :
                           achievement.icon === 'recycle' ? Recycle : TrendingDown;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.date}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Lightbulb className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900">AI Recommendations</h2>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="p-4 bg-gradient-to-r from-blue-50 to-primary-50 rounded-lg border border-blue-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-gray-900 flex-1">{rec.title}</p>
                  <span
                    className={`badge text-xs ${
                      rec.impact === 'High'
                        ? 'badge-success'
                        : rec.impact === 'Medium'
                        ? 'badge-warning'
                        : 'badge-info'
                    }`}
                  >
                    {rec.impact} Impact
                  </span>
                </div>
                <p className="text-sm font-bold text-primary-600">{rec.savings}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sustain;
