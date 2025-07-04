import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientManagement from './components/PatientManagement';
import AppointmentManagement from './components/AppointmentManagement';
import Calendar from './components/Calendar';
import PatientView from './components/PatientView';
import Navbar from './components/Navbar';
import './App.css';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'Admin') return <Navigate to="/patient-view" />;
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            {user?.role === 'Admin' ? <Dashboard /> : <PatientView />}
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute adminOnly>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/patients" element={
          <ProtectedRoute adminOnly>
            <PatientManagement />
          </ProtectedRoute>
        } />
        <Route path="/appointments" element={
          <ProtectedRoute adminOnly>
            <AppointmentManagement />
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={
          <ProtectedRoute adminOnly>
            <Calendar />
          </ProtectedRoute>
        } />
        <Route path="/patient-view" element={
          <ProtectedRoute>
            <PatientView />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;