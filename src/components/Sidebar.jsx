import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  Lightbulb,
  Camera,
  Box,
  Radio,
  Leaf,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../utils/AuthContext';

const navigationItems = [
  {
    id: 'advisory',
    name: 'Advisory',
    icon: Lightbulb,
    path: '/advisory',
    gradient: 'from-blue-500 to-blue-600',
    description: 'Strategic consulting',
  },
  {
    id: 'cvs',
    name: 'CVS',
    icon: Camera,
    path: '/cvs',
    gradient: 'from-purple-500 to-purple-600',
    description: 'Computer vision',
  },
  {
    id: 'twin',
    name: 'Twin',
    icon: Box,
    path: '/twin',
    gradient: 'from-indigo-500 to-indigo-600',
    description: 'Digital twin',
  },
  {
    id: 'command',
    name: 'Command',
    icon: Radio,
    path: '/command',
    gradient: 'from-orange-500 to-orange-600',
    description: 'Control center',
  },
  {
    id: 'sustain',
    name: 'Sustain',
    icon: Leaf,
    path: '/sustain',
    gradient: 'from-green-500 to-green-600',
    description: 'Sustainability',
  },
  {
    id: 'ops',
    name: 'Ops',
    icon: Settings,
    path: '/ops',
    gradient: 'from-red-500 to-red-600',
    description: 'Operations',
  },
];

const Sidebar = ({ isCollapsed, onToggle, isMobileOpen, onMobileClose }) => {
  const { hasPermission } = useAuth();

  const sidebarVariants = {
    expanded: { width: 256 },
    collapsed: { width: 80 },
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 },
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onMobileClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed left-0 top-20 bottom-0 bg-white/98 backdrop-blur-xl border-r border-gray-100 z-40 shadow-xl
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation items */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const hasAccess = hasPermission(item.id);

              // Hide items user doesn't have access to
              if (!hasAccess) return null;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={onMobileClose}
                    className={({ isActive }) =>
                      `flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'} px-4 py-3.5 rounded-2xl transition-all duration-300 group relative
                      ${
                        isActive
                          ? 'bg-gradient-to-r ' + item.gradient + ' text-white shadow-lg shadow-' + item.gradient.split('-')[1] + '-500/30'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`
                    }
                    title={isCollapsed ? `${item.name} - ${item.description}` : ''}
                  >
                    {({ isActive }) => (
                      <>
                        {/* Animated background on hover */}
                        {!isActive && (
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                          />
                        )}

                        {/* Icon with background */}
                        <div className={`relative flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/20' 
                            : 'bg-gray-100 group-hover:bg-white group-hover:shadow-md'
                        }`}>
                          {isActive ? (
                            <Icon className="w-5 h-5 text-white" />
                          ) : (
                            <Icon className={`w-5 h-5 text-${item.gradient.split('-')[1]}-600`} />
                          )}
                        </div>

                        {/* Label and description */}
                        {!isCollapsed && (
                          <motion.div
                            variants={itemVariants}
                            className="flex-1 min-w-0"
                          >
                            <p className={`font-semibold text-sm truncate transition-colors ${
                              isActive ? 'text-white' : 'text-gray-900 group-hover:text-gray-900'
                            }`}>
                              {item.name}
                            </p>
                            <p className={`text-xs truncate transition-colors ${
                              isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-gray-600'
                            }`}>
                              {item.description}
                            </p>
                          </motion.div>
                        )}

                        {/* Active indicator */}
                        {isActive && !isCollapsed && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="flex-shrink-0"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          >
                            <Sparkles className="w-4 h-4 text-white" />
                          </motion.div>
                        )}

                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                          <span className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none shadow-xl z-[9999]">
                            <span className="font-semibold">{item.name}</span>
                            <span className="text-gray-300 text-xs ml-2">• {item.description}</span>
                            <span className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></span>
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <motion.div
              variants={itemVariants}
              className="p-4 border-t border-gray-100"
            >
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onToggle}
                  className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200"
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {/* Toggle button for collapsed state */}
          {isCollapsed && (
            <div className="hidden lg:flex justify-center p-6 border-t border-gray-100">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggle}
                className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
