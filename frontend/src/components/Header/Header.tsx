import React from 'react';
import './Header.css';

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  isAuthenticated: boolean;
}

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">Central Social Shopee</span>
          </div>
        </div>
        
        <div className="user-section">
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
          </div>
          
          <div className="user-avatar">
            {user.picture ? (
              <img 
                src={user.picture} 
                alt={user.name} 
                className="avatar-image"
              />
            ) : (
              <div className="avatar-placeholder">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <button 
            className="logout-btn" 
            onClick={handleLogout}
            title="Sair"
          >
            <svg className="logout-icon" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

