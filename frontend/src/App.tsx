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
  picture: string;
  isAuthenticated: boolean;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (isLoading) {
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
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                user ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/auth" replace />
                )
              } 
            />
            <Route 
              path="/auth" 
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <GoogleAuth onLogin={handleLogin} />
                )
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
