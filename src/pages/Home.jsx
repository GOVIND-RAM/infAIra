import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Camera, Box, Radio, Leaf, Settings, ArrowRight } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const solutions = [
    {
      id: 'advisory',
      name: 'InfAIra Advisory',
      description: 'Strategic consulting for AI adoption and ESG compliance',
      icon: Lightbulb,
      color: 'from-blue-500 to-blue-600',
      path: '/advisory',
    },
    {
      id: 'cvs',
      name: 'InfAIra CVS',
      description: 'Computer Vision Solutions for intelligent monitoring',
      icon: Camera,
      color: 'from-purple-500 to-purple-600',
      path: '/cvs',
    },
    {
      id: 'twin',
      name: 'InfAIra Twin',
      description: 'Digital Twin for real-time facility visualization',
      icon: Box,
      color: 'from-indigo-500 to-indigo-600',
      path: '/twin',
    },
    {
      id: 'command',
      name: 'InfAIra Command',
      description: 'Command center for comprehensive facility control',
      icon: Radio,
      color: 'from-orange-500 to-orange-600',
      path: '/command',
    },
    {
      id: 'sustain',
      name: 'InfAIra Sustain',
      description: 'Sustainability analytics and ESG reporting',
      icon: Leaf,
      color: 'from-green-500 to-green-600',
      path: '/sustain',
    },
    {
      id: 'ops',
      name: 'InfAIra Ops',
      description: 'Operational intelligence with predictive maintenance',
      icon: Settings,
      color: 'from-red-500 to-red-600',
      path: '/ops',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6"
        >
          <img 
            src={require('../assets/inf-logo.png')} 
            alt="InfAIra Logo" 
            className="w-40 h-40 mx-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
        <h1 className="text-5xl font-bold text-gradient mb-4">Welcome to InfAIra</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Infinite Intelligence in Infrastructure
        </p>
        <p className="text-lg text-gray-500 mt-2">
          Transform your buildings into smart, sustainable, and efficient spaces
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { label: 'Energy Saved', value: '23.5%', color: 'text-yellow-600' },
          { label: 'Cost Reduction', value: '₹1.25Cr', color: 'text-green-600' },
          { label: 'Carbon Offset', value: '1,247t', color: 'text-blue-600' },
          { label: 'Efficiency', value: '92%', color: 'text-purple-600' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="glass-card p-6 text-center"
          >
            <p className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Solutions Grid */}
      <div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Our Solutions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const hasAccess = hasPermission(solution.id);

            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={hasAccess ? { y: -8, scale: 1.02 } : {}}
                className={`glass-card p-6 group relative overflow-hidden ${
                  hasAccess ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => hasAccess && navigate(solution.path)}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{solution.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{solution.description}</p>

                {/* CTA */}
                {hasAccess ? (
                  <div className="flex items-center space-x-2 text-primary-600 font-medium">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No Access</div>
                )}

                {/* Lock Overlay */}
                {!hasAccess && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="glass-card p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose InfAIra?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'AI-Powered Intelligence',
              description: 'Advanced machine learning algorithms for predictive analytics and optimization',
            },
            {
              title: 'Real-Time Monitoring',
              description: 'Comprehensive visibility into all facility operations with instant alerts',
            },
            {
              title: 'Sustainability Focus',
              description: 'ESG compliance and green building certification support',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">✓</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
