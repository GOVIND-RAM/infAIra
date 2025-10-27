import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Advisory from './pages/Advisory';
import CVS from './pages/CVS';
import Twin from './pages/Twin';
import Command from './pages/Command';
import Sustain from './pages/Sustain';
import Ops from './pages/Ops';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="advisory" element={<Advisory />} />
              <Route path="cvs" element={<CVS />} />
              <Route path="twin" element={<Twin />} />
              <Route path="command" element={<Command />} />
              <Route path="sustain" element={<Sustain />} />
              <Route path="ops" element={<Ops />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
