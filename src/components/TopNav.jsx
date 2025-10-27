import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';

const TopNav = ({ onMenuClick }) => {
  const { currentUser, logout, login } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const users = [
    { id: 'admin', name: 'InfAIra Admin', role: 'Admin', initials: 'IA', color: 'bg-blue-500' },
    { id: 'fmOps', name: 'InfAIra FM Ops', role: 'FM Operations', initials: 'IF', color: 'bg-green-500' },
    { id: 'viewer', name: 'InfAIra Viewer', role: 'Viewer', initials: 'IV', color: 'bg-gray-500' },
  ];
  
  const handleUserSwitch = (userId) => {
    login(userId);
    setIsDropdownOpen(false);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'FM Operations':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'Viewer':
        return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
    >
      <div className="flex items-center justify-between h-20 pl-2 pr-4">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {/* InfAIra Logo */}
            <img 
              src={require('../assets/inf-logo.png')} 
              alt="InfAIra Logo" 
              className="w-14 h-14 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-800 bg-clip-text text-transparent">InfAIra</h1>
              <p className="text-xs font-medium text-gray-500 tracking-wide">Infinite Intelligence in Infrastructure</p>
            </div>
          </motion.div>
        </div>

        {/* Right side - User Profile */}
        <div className="flex items-center space-x-3">
          {/* User Profile */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              <div className="relative">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.username}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white"></div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900">{currentUser?.username}</p>
                <p className="text-xs text-gray-500">{currentUser?.role}</p>
              </div>
              <ChevronDown
                className={`hidden md:block w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    {/* Header with gradient */}
                    <div className="relative p-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-white border-b border-gray-100">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img
                            src={currentUser?.avatar}
                            alt={currentUser?.username}
                            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full ring-4 ring-white"></div>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-lg">{currentUser?.username}</p>
                          <p className="text-sm text-gray-600 mt-0.5">{currentUser?.email}</p>
                          <div className="mt-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(currentUser?.role)} shadow-sm`}>
                              {currentUser?.role}
                            </span>
                            {currentUser?.readOnly && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white ml-2 shadow-sm">Read Only</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <button
                        onClick={() => {
                          /* Profile settings */
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-200 text-left group"
                      >
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Profile Settings</p>
                          <p className="text-xs text-gray-500">Manage your account</p>
                        </div>
                      </button>
                    </div>

                    {/* User Switcher Section */}
                    <div className="px-4 py-2 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Switch User (Demo)</p>
                      <div className="space-y-1">
                        {users.map((user) => (
                          <button
                            key={user.id}
                            onClick={() => handleUserSwitch(user.id)}
                            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left ${
                              currentUser?.role === user.role
                                ? 'bg-blue-50 ring-2 ring-blue-500'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className={`w-10 h-10 ${user.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                              {user.initials}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.role}</p>
                            </div>
                            {currentUser?.role === user.role && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logout */}
                    <div className="p-2 border-t border-gray-100">
                      <button
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl hover:bg-red-50 transition-all duration-200 text-left group"
                      >
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                          <LogOut className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-red-600">Logout</p>
                          <p className="text-xs text-red-400">Sign out of your account</p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default TopNav;
