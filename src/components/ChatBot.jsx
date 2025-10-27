import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = ({ currentPage, graphData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate page-specific insights
  const getPageInsights = (page) => {
    const insights = {
      sustain: {
        greeting: "Welcome to Sustainability Dashboard! 🌱",
        highlights: [
          { icon: TrendingUp, text: "Carbon emissions reduced by 15% this quarter", type: "success" },
          { icon: AlertTriangle, text: "Energy consumption spiked 8% last week - investigation needed", type: "warning" },
          { icon: CheckCircle, text: "Water conservation target exceeded by 12%", type: "success" },
          { icon: Info, text: "Renewable energy usage at 65% - ahead of annual target", type: "info" }
        ],
        recommendations: [
          "Consider increasing solar panel capacity to reach 75% renewable energy",
          "Schedule energy audit for high-consumption areas identified last week",
          "Implement rainwater harvesting to further reduce water costs"
        ]
      },
      home: {
        greeting: "Welcome to InfAIra Dashboard! 👋",
        highlights: [
          { icon: CheckCircle, text: "All critical systems operational", type: "success" },
          { icon: Info, text: "45 active alerts across all facilities", type: "info" },
          { icon: TrendingUp, text: "Overall facility efficiency: 94.2%", type: "success" }
        ],
        recommendations: [
          "Review pending alerts in Command Center",
          "Check sustainability metrics for optimization opportunities"
        ]
      },
      command: {
        greeting: "Command Center Active 🎯",
        highlights: [
          { icon: AlertTriangle, text: "12 critical alerts require immediate attention", type: "warning" },
          { icon: CheckCircle, text: "Response time improved by 23%", type: "success" },
          { icon: Info, text: "87% of alerts resolved within SLA", type: "info" }
        ],
        recommendations: [
          "Prioritize critical security alerts in Zone A",
          "Review automation rules to reduce false positives"
        ]
      },
      cvs: {
        greeting: "Computer Vision Systems Dashboard 📹",
        highlights: [
          { icon: CheckCircle, text: "98.5% detection accuracy across all cameras", type: "success" },
          { icon: AlertTriangle, text: "3 PPE violations detected today", type: "warning" },
          { icon: Info, text: "Fire detection system active on all floors", type: "info" }
        ],
        recommendations: [
          "Schedule camera calibration for optimal night vision",
          "Review PPE compliance training for affected departments"
        ]
      },
      ops: {
        greeting: "Operations Dashboard Active ⚙️",
        highlights: [
          { icon: TrendingUp, text: "Equipment uptime at 96.7%", type: "success" },
          { icon: AlertTriangle, text: "Predictive maintenance due for 3 critical assets", type: "warning" },
          { icon: CheckCircle, text: "Workforce efficiency increased by 11%", type: "success" }
        ],
        recommendations: [
          "Schedule maintenance window for flagged equipment",
          "Optimize shift patterns based on workload analysis"
        ]
      },
      twin: {
        greeting: "Digital Twin Environment 🏢",
        highlights: [
          { icon: CheckCircle, text: "Real-time synchronization at 99.9%", type: "success" },
          { icon: Info, text: "Simulation models updated with latest sensor data", type: "info" },
          { icon: TrendingUp, text: "Space utilization optimized by 8%", type: "success" }
        ],
        recommendations: [
          "Run predictive scenarios for next quarter planning",
          "Review IoT sensor health for optimal data accuracy"
        ]
      },
      advisory: {
        greeting: "Advisory & Insights Hub 💡",
        highlights: [
          { icon: Info, text: "15 new recommendations generated this week", type: "info" },
          { icon: TrendingUp, text: "Cost savings opportunities: $45K identified", type: "success" },
          { icon: CheckCircle, text: "85% of previous recommendations implemented", type: "success" }
        ],
        recommendations: [
          "Review high-impact cost optimization strategies",
          "Schedule quarterly strategy session with stakeholders"
        ]
      }
    };

    return insights[page.toLowerCase()] || insights.home;
  };

  // Initialize with page insights when opened or page changes
  useEffect(() => {
    if (isOpen) {
      const insights = getPageInsights(currentPage);
      setTimeout(() => {
        const welcomeMessage = {
          type: 'bot',
          content: insights.greeting,
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
        
        setTimeout(() => {
          const highlightsMessage = {
            type: 'bot',
            content: 'highlights',
            highlights: insights.highlights,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, highlightsMessage]);
        }, 500);
      }, 300);
    }
  }, [isOpen, currentPage]);

  // Analyze graph data and provide insights
  const analyzeGraphData = (data, question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('issue') || lowerQuestion.includes('problem') || lowerQuestion.includes('alert')) {
      return {
        type: 'analysis',
        content: "Based on the current data analysis, here are the key issues identified:",
        issues: [
          "Energy consumption peaked at 1,420 kWh on day 5 - 18% above average",
          "Carbon emissions showed unusual spike correlating with energy peak",
          "Water usage increased 12% during the same period",
          "Recommendation: Investigate HVAC system efficiency and schedule maintenance"
        ]
      };
    }
    
    if (lowerQuestion.includes('trend') || lowerQuestion.includes('pattern')) {
      return {
        type: 'analysis',
        content: "Here are the trends I've identified from the data:",
        issues: [
          "Overall energy consumption shows 5% week-over-week reduction",
          "Carbon emissions tracking 15% below target - excellent progress",
          "Water conservation efforts showing consistent improvement",
          "Waste management efficiency improved by 8% this period"
        ]
      };
    }
    
    if (lowerQuestion.includes('recommend') || lowerQuestion.includes('suggest') || lowerQuestion.includes('improve')) {
      const insights = getPageInsights(currentPage);
      return {
        type: 'analysis',
        content: "Here are my recommendations for improvement:",
        issues: insights.recommendations
      };
    }

    if (lowerQuestion.includes('carbon') || lowerQuestion.includes('emission')) {
      return {
        type: 'analysis',
        content: "Carbon Emissions Analysis:",
        issues: [
          "Current emissions: 2.8 tons CO2e/day - within target range",
          "15% reduction achieved vs. last quarter",
          "Main contributors: HVAC (45%), Lighting (25%), Equipment (30%)",
          "Recommendation: Increase renewable energy percentage to reduce further"
        ]
      };
    }

    if (lowerQuestion.includes('energy')) {
      return {
        type: 'analysis',
        content: "Energy Consumption Insights:",
        issues: [
          "Average daily consumption: 1,250 kWh",
          "Peak hours: 2-5 PM (28% above average)",
          "65% sourced from renewable energy",
          "Potential savings: 8-12% through load shifting and optimization"
        ]
      };
    }

    if (lowerQuestion.includes('water')) {
      return {
        type: 'analysis',
        content: "Water Usage Analysis:",
        issues: [
          "Daily average: 850 gallons - 12% below target",
          "Exceeded conservation goals by 8%",
          "Leak detection system prevented estimated 2,000 gallon waste",
          "Opportunity: Implement greywater recycling for 15% additional savings"
        ]
      };
    }

    // Default response
    return {
      type: 'text',
      content: "I can help you analyze data and identify issues! Try asking me about:\n\n• Current issues or problems\n• Trends and patterns\n• Recommendations for improvement\n• Specific metrics (energy, carbon, water)\n• Graph insights\n\nHow can I assist you?"
    };
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = analyzeGraphData(graphData, inputValue);
      const botMessage = {
        type: 'bot',
        ...response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (message, index) => {
    if (message.type === 'user') {
      return (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-end mb-4"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] shadow-md">
            {message.content}
          </div>
        </motion.div>
      );
    }

    if (message.content === 'highlights') {
      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-start mb-4"
        >
          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold text-sm text-gray-800">Key Highlights</span>
            </div>
            <div className="space-y-2">
              {message.highlights.map((highlight, idx) => {
                const Icon = highlight.icon;
                const colors = {
                  success: 'text-green-600',
                  warning: 'text-yellow-600',
                  info: 'text-blue-600',
                  error: 'text-red-600'
                };
                return (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors[highlight.type]}`} />
                    <span className="text-gray-700">{highlight.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      );
    }

    if (message.type === 'analysis') {
      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-start mb-4"
        >
          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="font-semibold text-sm text-gray-800">Analysis</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">{message.content}</p>
            <ul className="space-y-1.5 ml-2">
              {message.issues?.map((issue, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex justify-start mb-4"
      >
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%] shadow-lg border border-gray-200">
          <p className="text-sm whitespace-pre-line text-gray-700">{message.content}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
          >
            <Bot className="w-6 h-6" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">InfAIra Assistant</h3>
                  <p className="text-white/80 text-xs">AI-Powered Insights</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <div key={index}>{renderMessage(message, index)}</div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start mb-4"
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-lg border border-gray-200">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about graphs, trends, or issues..."
                  className="flex-1 bg-gray-50 text-gray-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 border border-gray-200"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl px-4 py-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={inputValue.trim() === ''}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

