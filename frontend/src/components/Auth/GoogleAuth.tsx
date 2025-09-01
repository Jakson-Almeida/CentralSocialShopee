import React, { useEffect } from 'react';
import './GoogleAuth.css';

interface GoogleAuthProps {
  onLogin: (user: any) => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ onLogin }) => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost/api';

  useEffect(() => {
    // Verificar se há um código de autorização na URL (callback do Google)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      handleGoogleCallback(code);
    }
  }, []);

  const handleGoogleLogin = async () => {
    try {
      // Iniciar o fluxo OAuth
      const response = await fetch(`${API_URL}/auth/google/start`);
      const data = await response.json();
      
      if (data.success && data.authUrl) {
        // Redirecionar para o Google OAuth
        window.location.href = data.authUrl;
      } else {
        console.error('Failed to get auth URL:', data.error);
      }
    } catch (error) {
      console.error('Error starting Google OAuth:', error);
    }
  };

  const handleGoogleCallback = async (code: string) => {
    try {
      // Enviar código para o backend
      const response = await fetch(`${API_URL}/auth/google/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      
      if (data.success && data.user) {
        // Salvar token no localStorage
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        
        // Salvar dados do usuário
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Chamar callback de login
        onLogin(data.user);
        
        // Limpar URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        console.error('Authentication failed:', data.error);
      }
    } catch (error) {
      console.error('Error processing Google callback:', error);
    }
  };

  return (
    <div className="google-auth">
      <div className="auth-container">
        <h2>Central Social Shopee</h2>
        <p>Faça login para gerenciar seus posts</p>
        
        <button 
          className="google-login-btn" 
          onClick={handleGoogleLogin}
        >
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Entrar com Google
        </button>
        
        <div className="auth-info">
          <p>✅ Login seguro com Google</p>
          <p>🔒 Suas informações estão protegidas</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;
