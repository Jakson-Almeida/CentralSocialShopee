import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  isAuthenticated: boolean;
}

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>Central Social Shopee</h1>
        </div>
        
        {user && (
          <div className="user-section">
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <img 
                src={user.picture} 
                alt={user.name} 
                className="user-avatar"
              />
            </div>
            <button className="logout-btn" onClick={onLogout}>
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
