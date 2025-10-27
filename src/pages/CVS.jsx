import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Eye, CheckCircle, X } from 'lucide-react';
import { cvsSolutions } from '../utils/mockData';

const CVS = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSolution, setSelectedSolution] = useState(null);

  const categories = ['All', 'Safety', 'Security', 'Analytics', 'Operations'];

  const filteredSolutions =
    selectedCategory === 'All'
      ? cvsSolutions
      : cvsSolutions.filter((sol) => sol.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gradient mb-4">InfAIra CVS</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Advanced Computer Vision Solutions for intelligent facility monitoring and management
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center space-x-2 flex-wrap gap-2"
      >
        <Filter className="w-5 h-5 text-gray-500" />
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Solutions Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSolutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-card overflow-hidden cursor-pointer group"
              onClick={() => setSelectedSolution(solution)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={solution.image}
                  alt={solution.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="badge bg-white/90 text-gray-900 backdrop-blur-sm">
                    {solution.category}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className="badge badge-success">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                    Active
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{solution.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{solution.description}</p>

                {/* Accuracy */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Accuracy</span>
                    <span className="text-sm font-bold text-primary-600">{solution.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${solution.accuracy}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-success-500"
                    />
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-1 mb-4">
                  {solution.benefits.slice(0, 2).map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full flex items-center justify-center space-x-2 py-2 bg-primary-50 text-primary-600 rounded-lg font-medium hover:bg-primary-100 transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSolution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSolution(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedSolution.image}
                  alt={selectedSolution.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <button
                  onClick={() => setSelectedSolution(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-900" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedSolution.name}</h2>
                  <div className="flex items-center space-x-2">
                    <span className="badge bg-white/90 text-gray-900">{selectedSolution.category}</span>
                    <span className="badge badge-success">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedSolution.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance</h3>
                  <div className="bg-gradient-to-br from-primary-50 to-success-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Accuracy Rate</span>
                      <span className="text-2xl font-bold text-primary-600">{selectedSolution.accuracy}%</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-primary-500 to-success-500"
                        style={{ width: `${selectedSolution.accuracy}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
                  <ul className="space-y-2">
                    {selectedSolution.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Processing Speed', value: '30 FPS' },
                      { label: 'Resolution', value: 'Up to 4K' },
                      { label: 'Detection Range', value: '50 meters' },
                      { label: 'Response Time', value: '<100ms' },
                    ].map((spec, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-500">{spec.label}</p>
                        <p className="text-sm font-semibold text-gray-900">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button className="btn-primary flex-1">Deploy Solution</button>
                  <button className="btn-secondary flex-1">Request Demo</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CVS;
