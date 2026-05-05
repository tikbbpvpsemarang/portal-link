import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicPage from './pages/PublicPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import AdminMessages from './pages/AdminMessages';

// Komponen untuk memproteksi rute admin
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/messages" element={
          <ProtectedRoute>
            <AdminMessages />
          </ProtectedRoute>
        } />
        {/* Redirect sembarang rute ke halaman depan */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
