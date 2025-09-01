import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import GoogleAuth from './components/Auth/GoogleAuth';
import './App.css';

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  isAuthenticated: boolean;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/api';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');
    
    if (savedUser && authToken) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      // Chamar endpoint de logout no backend
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Limpar dados locais
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {user && <Header user={user} onLogout={handleLogout} />}
        
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                <Dashboard />
              ) : (
                <GoogleAuth onLogin={handleLogin} />
              )
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              user ? <Dashboard /> : <Navigate to="/" replace />
            } 
          />
          
          <Route 
            path="/auth/callback" 
            element={
              user ? <Navigate to="/dashboard" replace /> : <GoogleAuth onLogin={handleLogin} />
            } 
          />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
