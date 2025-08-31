import React from 'react';

interface Post {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  status: 'pending' | 'scheduled' | 'published';
  scheduledDate?: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'scheduled':
        return '#4A90E2';
      case 'published':
        return '#4CAF50';
      default:
        return '#999';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'scheduled':
        return 'Agendado';
      case 'published':
        return 'Publicado';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="post-card">
      <div className="post-image-container">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="post-image"
        />
        <div className="post-overlay">
          <div className="post-actions">
            <button className="action-btn edit">Editar</button>
            <button className="action-btn schedule">Agendar</button>
          </div>
        </div>
      </div>
      
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-description">{post.description}</p>
        
        <div className="post-meta">
          <span 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(post.status) }}
          >
            {getStatusText(post.status)}
          </span>
          
          {post.scheduledDate && (
            <span className="scheduled-date">
              {new Date(post.scheduledDate).toLocaleDateString('pt-BR')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
