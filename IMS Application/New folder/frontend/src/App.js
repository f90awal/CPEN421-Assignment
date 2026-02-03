import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Inventory from './pages/Inventory';
import ItemForm from './pages/ItemForm';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    
    // Check auth on mount
    checkAuth();
    
    // Listen for storage changes (from other tabs)
    window.addEventListener('storage', checkAuth);
    
    // Listen for custom auth-change event (from same tab)
    window.addEventListener('auth-change', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
      <Route path="/inventory/new" element={<ProtectedRoute><ItemForm /></ProtectedRoute>} />
      <Route path="/inventory/edit/:id" element={<ProtectedRoute><ItemForm /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/inventory" />} />
    </Routes>
  );
}
