import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Leaf,
  Building2,
  TrendingUp,
  Target,
  ShieldCheck,
  X,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { advisoryServices } from '../utils/mockData';

const iconMap = {
  brain: Brain,
  leaf: Leaf,
  building: Building2,
  'trending-up': TrendingUp,
  target: Target,
  'shield-check': ShieldCheck,
};

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
};

const Advisory = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gradient mb-4">InfAIra Advisory</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Strategic consulting services to transform your facility management with AI and sustainability
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advisoryServices.map((service, index) => {
          const Icon = iconMap[service.icon];
          const colors = colorMap[service.color];

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-6 cursor-pointer group"
              onClick={() => setSelectedService(service)}
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 ${colors.text}`} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>

              {/* Metrics */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-500">Completion</p>
                  <p className="text-lg font-bold text-gray-900">{service.metrics.completion}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Score</p>
                  <p className="text-lg font-bold text-gray-900">{service.metrics.score}/100</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${service.metrics.completion}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className={`h-2 rounded-full bg-gradient-to-r ${
                    service.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    service.color === 'green' ? 'from-green-500 to-green-600' :
                    service.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    service.color === 'orange' ? 'from-orange-500 to-orange-600' :
                    service.color === 'red' ? 'from-red-500 to-red-600' :
                    'from-indigo-500 to-indigo-600'
                  }`}
                />
              </div>

              {/* CTA */}
              <button className="w-full flex items-center justify-center space-x-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`${colorMap[selectedService.color].bg} p-6 border-b ${colorMap[selectedService.color].border}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-white rounded-xl flex items-center justify-center`}>
                      {(() => {
                        const Icon = iconMap[selectedService.icon];
                        return <Icon className={`w-8 h-8 ${colorMap[selectedService.color].text}`} />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedService.title}</h2>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="badge badge-success">
                          {selectedService.metrics.completion}% Complete
                        </span>
                        <span className="badge badge-info">
                          Score: {selectedService.metrics.score}/100
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
                  <p className="text-gray-600">{selectedService.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
                  <ul className="space-y-2">
                    {[
                      'Comprehensive analysis and assessment',
                      'Data-driven strategic recommendations',
                      'Industry best practices implementation',
                      'Measurable ROI and performance metrics',
                      'Ongoing support and optimization',
                    ].map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Deliverables</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Strategic Roadmap', 'Implementation Plan', 'KPI Dashboard', 'Training Materials'].map(
                      (deliverable, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <p className="text-sm font-medium text-gray-900">{deliverable}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button className="btn-primary flex-1">Get Started</button>
                  <button className="btn-secondary flex-1">Schedule Consultation</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Advisory;
