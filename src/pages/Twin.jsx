import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Thermometer, Users, Zap, Activity, Eye, Layers } from 'lucide-react';
import { sensorData } from '../utils/mockData';

// 3D Building Component - Realistic Modern Office Tower
const Building = ({ selectedZone, onZoneClick }) => {
  const buildingRef = useRef();
  const [hoveredSensor, setHoveredSensor] = useState(null);
  
  useFrame((state) => {
    if (buildingRef.current) {
      buildingRef.current.rotation.y += 0.002;
    }
  });

  // Create realistic window grid
  const createWindows = (width, height, floors, windowsPerFloor) => {
    const windows = [];
    const floorHeight = height / floors;
    const windowWidth = (width - 0.8) / windowsPerFloor;
    
    for (let floor = 0; floor < floors; floor++) {
      for (let win = 0; win < windowsPerFloor; win++) {
        const x = -width / 2 + 0.4 + windowWidth * win + windowWidth / 2;
        const y = floorHeight * floor + floorHeight / 2;
        windows.push({ x, y, floor, win });
      }
    }
    return windows;
  };

  return (
    <group ref={buildingRef}>
      {/* Main Building Structure - Realistic proportions */}
      <Box args={[4.5, 10, 4.5]} position={[0, 5, 0]}>
        <meshPhysicalMaterial 
          color="#f8fafc"
          metalness={0.2}
          roughness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
        />
      </Box>

      {/* Glass Curtain Wall - Front */}
      <Box args={[4.4, 9.8, 0.05]} position={[0, 5, 2.26]}>
        <meshPhysicalMaterial 
          color="#38bdf8"
          metalness={0.9}
          roughness={0.05}
          opacity={0.3}
          transparent
          transmission={0.9}
          thickness={0.5}
        />
      </Box>

      {/* Glass Curtain Wall - Back */}
      <Box args={[4.4, 9.8, 0.05]} position={[0, 5, -2.26]}>
        <meshPhysicalMaterial 
          color="#38bdf8"
          metalness={0.9}
          roughness={0.05}
          opacity={0.3}
          transparent
          transmission={0.9}
          thickness={0.5}
        />
      </Box>

      {/* Glass Curtain Wall - Left */}
      <Box args={[0.05, 9.8, 4.4]} position={[-2.26, 5, 0]}>
        <meshPhysicalMaterial 
          color="#38bdf8"
          metalness={0.9}
          roughness={0.05}
          opacity={0.3}
          transparent
          transmission={0.9}
          thickness={0.5}
        />
      </Box>

      {/* Glass Curtain Wall - Right */}
      <Box args={[0.05, 9.8, 4.4]} position={[2.26, 5, 0]}>
        <meshPhysicalMaterial 
          color="#38bdf8"
          metalness={0.9}
          roughness={0.05}
          opacity={0.3}
          transparent
          transmission={0.9}
          thickness={0.5}
        />
      </Box>

      {/* Floor Slabs - Horizontal bands */}
      {[0.2, 2, 3.8, 5.6, 7.4, 9.2, 10].map((y, i) => (
        <Box key={`floor-${i}`} args={[4.6, 0.15, 4.6]} position={[0, y, 0]}>
          <meshStandardMaterial 
            color="#475569"
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
      ))}

      {/* Window Frames - Front facade */}
      {createWindows(4.2, 9.5, 6, 5).map((win, i) => (
        <Box 
          key={`win-front-${i}`} 
          args={[0.65, 1.3, 0.03]} 
          position={[win.x, win.y + 0.5, 2.28]}
        >
          <meshStandardMaterial 
            color={Math.random() > 0.3 ? "#fef3c7" : "#1e293b"}
            emissive={Math.random() > 0.3 ? "#fbbf24" : "#000000"}
            emissiveIntensity={Math.random() > 0.3 ? 0.4 : 0}
          />
        </Box>
      ))}

      {/* Window Frames - Back facade */}
      {createWindows(4.2, 9.5, 6, 5).map((win, i) => (
        <Box 
          key={`win-back-${i}`} 
          args={[0.65, 1.3, 0.03]} 
          position={[win.x, win.y + 0.5, -2.28]}
        >
          <meshStandardMaterial 
            color={Math.random() > 0.3 ? "#fef3c7" : "#1e293b"}
            emissive={Math.random() > 0.3 ? "#fbbf24" : "#000000"}
            emissiveIntensity={Math.random() > 0.3 ? 0.4 : 0}
          />
        </Box>
      ))}

      {/* Rooftop Structure */}
      <Box args={[3, 0.4, 3]} position={[0, 10.3, 0]}>
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </Box>

      {/* Rooftop Equipment */}
      <Box args={[0.8, 0.6, 0.8]} position={[-0.8, 10.8, -0.8]}>
        <meshStandardMaterial color="#64748b" />
      </Box>
      <Box args={[0.6, 0.8, 0.6]} position={[0.9, 10.9, 0.7]}>
        <meshStandardMaterial color="#64748b" />
      </Box>

      {/* Communication Antenna */}
      <Box args={[0.08, 2, 0.08]} position={[0, 11.5, 0]}>
        <meshStandardMaterial color="#dc2626" metalness={0.9} />
      </Box>
      <Sphere args={[0.12, 16, 16]} position={[0, 12.5, 0]}>
        <meshStandardMaterial 
          color="#dc2626" 
          emissive="#dc2626" 
          emissiveIntensity={1}
        />
      </Sphere>

      {/* Interactive IoT Sensors */}
      {sensorData.temperature.slice(0, 8).map((sensor, i) => {
        const floor = Math.floor(i / 2);
        const side = i % 2;
        const x = side === 0 ? -2.5 : 2.5;
        const y = 2 + floor * 2;
        const z = ((i % 4) - 1.5) * 1.2;
        
        const status = sensor.status === 'warning' ? '#f59e0b' : '#10b981';
        const isHovered = hoveredSensor === i;
        
        return (
          <group key={i}>
            <Sphere
              args={[isHovered ? 0.2 : 0.15, 16, 16]}
              position={[x, y, z]}
              onClick={() => onZoneClick(sensor)}
              onPointerOver={() => setHoveredSensor(i)}
              onPointerOut={() => setHoveredSensor(null)}
            >
              <meshStandardMaterial
                color={status}
                emissive={status}
                emissiveIntensity={isHovered ? 1.5 : 1}
              />
            </Sphere>
            
            {isHovered && (
              <Sphere args={[0.35, 16, 16]} position={[x, y, z]}>
                <meshBasicMaterial color={status} opacity={0.2} transparent />
              </Sphere>
            )}
          </group>
        );
      })}

      {/* Ground Plaza */}
      <Box args={[15, 0.1, 15]} position={[0, 0.05, 0]}>
        <meshStandardMaterial 
          color="#e2e8f0"
          metalness={0.1}
          roughness={0.9}
        />
      </Box>

      {/* Concrete Base/Podium */}
      <Box args={[5, 0.3, 5]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </Box>

      {/* Entrance Canopy */}
      <Box args={[2, 0.1, 1.5]} position={[0, 1.5, 3]}>
        <meshStandardMaterial color="#1e293b" metalness={0.5} />
      </Box>
      <Box args={[0.15, 1.5, 0.15]} position={[-0.8, 0.75, 3]}>
        <meshStandardMaterial color="#475569" />
      </Box>
      <Box args={[0.15, 1.5, 0.15]} position={[0.8, 0.75, 3]}>
        <meshStandardMaterial color="#475569" />
      </Box>

      {/* Landscaping - Modern trees */}
      {[
        [-6, 0.5, -6], [6, 0.5, -6], [-6, 0.5, 6], [6, 0.5, 6],
        [-6, 0.5, 0], [6, 0.5, 0], [0, 0.5, -6], [0, 0.5, 6]
      ].map((pos, i) => (
        <group key={`tree-${i}`}>
          <Box args={[0.2, 1, 0.2]} position={[pos[0], pos[1] - 0.4, pos[2]]}>
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </Box>
          <Sphere args={[0.6, 12, 12]} position={pos}>
            <meshStandardMaterial color="#15803d" roughness={0.8} />
          </Sphere>
        </group>
      ))}

      {/* Parking lot lines */}
      {[-8, -6, -4, 4, 6, 8].map((x, i) => (
        <Box key={`parking-${i}`} args={[0.1, 0.02, 3]} position={[x, 0.06, -10]}>
          <meshBasicMaterial color="#fbbf24" />
        </Box>
      ))}
    </group>
  );
};

const Twin = () => {
  const [viewMode, setViewMode] = useState('Energy');
  const [selectedZone, setSelectedZone] = useState(null);

  const viewModes = [
    { id: 'Thermal', icon: Thermometer, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'Occupancy', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'Energy', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { id: 'Structural', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gradient mb-4">InfAIra Twin</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Interactive Digital Twin for real-time facility monitoring and predictive analytics
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Viewer */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">3D Building Model</h2>
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">Interactive View</span>
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="h-[500px] bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 rounded-xl overflow-hidden shadow-inner">
            <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
              <Suspense fallback={null}>
                {/* Enhanced Lighting for white theme */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 15, 5]} intensity={1.2} castShadow />
                <directionalLight position={[-10, 10, -5]} intensity={0.4} />
                <pointLight position={[0, 20, 0]} intensity={0.5} color="#38bdf8" />
                <hemisphereLight args={['#ffffff', '#60a5fa', 0.4]} />
                
                <Building selectedZone={selectedZone} onZoneClick={setSelectedZone} />
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={6}
                  maxDistance={25}
                  autoRotate={false}
                  autoRotateSpeed={0.5}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* View Mode Toolbar */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            {viewModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <motion.button
                  key={mode.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(mode.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === mode.id
                      ? `${mode.bg} ${mode.color} shadow-md`
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{mode.id}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Side Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {/* Real-time Sensors */}
          <div className="glass-card p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Thermometer className="w-5 h-5 mr-2 text-red-600" />
              Temperature Zones
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
              {sensorData.temperature.map((sensor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg border ${
                    sensor.status === 'warning'
                      ? 'bg-warning-50 border-warning-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{sensor.zone}</span>
                    <span className={`text-sm font-bold ${
                      sensor.status === 'warning' ? 'text-warning-600' : 'text-gray-900'
                    }`}>
                      {sensor.value.toFixed(1)}°C
                    </span>
                  </div>
                  {sensor.status === 'warning' && (
                    <p className="text-xs text-warning-600 mt-1">Above threshold</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="glass-card p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-600" />
              System Status
            </h3>
            <div className="space-y-3">
              {[
                { name: 'HVAC Systems', status: 'Operational', value: 92 },
                { name: 'Lighting', status: 'Operational', value: 88 },
                { name: 'Security', status: 'Active', value: 100 },
                { name: 'Fire Safety', status: 'Active', value: 100 },
              ].map((system, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{system.name}</span>
                    <span className="badge badge-success text-xs">{system.status}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${system.value}%` }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                      className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-green-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Energy Metrics */}
          <div className="glass-card p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-600" />
              Energy Metrics
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Current Consumption</p>
                <p className="text-2xl font-bold text-gray-900">{sensorData.energy.current} kW</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Peak</p>
                  <p className="text-lg font-bold text-gray-900">{sensorData.energy.peak} kW</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Average</p>
                  <p className="text-lg font-bold text-gray-900">{sensorData.energy.average} kW</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  sensorData.energy.trend === 'decreasing' ? 'bg-green-500' : 'bg-red-500'
                } animate-pulse`} />
                <span className="text-sm text-gray-600">
                  Trend: <span className="font-medium capitalize">{sensorData.energy.trend}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Predictive Alerts */}
          <div className="glass-card p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Layers className="w-5 h-5 mr-2 text-purple-600" />
              Predictive Alerts
            </h3>
            <div className="space-y-2">
              {[
                { message: 'HVAC maintenance due in 3 days', severity: 'info' },
                { message: 'Unusual energy spike detected', severity: 'warning' },
              ].map((alert, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm ${
                    alert.severity === 'warning'
                      ? 'bg-warning-50 text-warning-800 border border-warning-200'
                      : 'bg-blue-50 text-blue-800 border border-blue-200'
                  }`}
                >
                  {alert.message}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Twin;
