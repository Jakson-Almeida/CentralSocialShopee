import React, { useState, useEffect } from 'react';
import PostCard from '../PostCard/PostCard';

interface Post {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  status: 'pending' | 'scheduled' | 'published';
  scheduledDate?: string;
}

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Simulação de dados dos posts
    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'Retrato Masculino em Close-up',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
        description: 'Luz suave, olhar direto - perfeito para produtos de beleza masculina',
        status: 'pending'
      },
      {
        id: '2',
        title: 'Close-up de Jovem Sorrindo',
        imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face',
        description: 'Fundo desfocado, tons frios - ideal para moda jovem',
        status: 'scheduled',
        scheduledDate: '2024-01-15'
      },
      {
        id: '3',
        title: 'Retrato Feminino em Close',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
        description: 'Contraste alto, foco nos olhos - destaque para maquiagem',
        status: 'published'
      },
      {
        id: '4',
        title: 'Retrato de Estúdio Masculino',
        imageUrl: 'https://images.pexels.com/photos/27368188/pexels-photo-27368188.jpeg?w=400&h=600&fit=crop&crop=face',
        description: 'Fundo escuro, expressão séria - elegante para produtos premium',
        status: 'pending'
      },
      {
        id: '5',
        title: 'Close-up Feminino Pensativo',
        imageUrl: 'https://images.pexels.com/photos/30055488/pexels-photo-30055488.jpeg?w=400&h=600&fit=crop&crop=face',
        description: 'Brincos, pele iluminada - sofisticado para joias',
        status: 'scheduled',
        scheduledDate: '2024-01-20'
      },
      {
        id: '6',
        title: 'Retrato PB Artístico',
        imageUrl: 'https://images.pexels.com/photos/15148473/pexels-photo-15148473.jpeg?w=400&h=600&fit=crop&crop=face',
        description: 'Detalhe de olho e lábios - dramático para cosméticos',
        status: 'pending'
      },
      {
        id: '7',
        title: 'Retrato de Rua Feminino',
        imageUrl: 'https://cdn.pixabay.com/photo/2022/11/29/11/30/woman-7624348_1280.jpg?w=400&h=600&fit=crop&crop=face',
        description: 'Close-up, luz natural - autêntico para lifestyle',
        status: 'pending'
      },
      {
        id: '8',
        title: 'Retrato PB Masculino',
        imageUrl: 'https://cdn.pixabay.com/photo/2020/03/24/20/05/men-4963138_1280.jpg?w=400&h=600&fit=crop&crop=face',
        description: 'Clima dramático, meia-luz - intenso para perfumes',
        status: 'scheduled',
        scheduledDate: '2024-01-25'
      }
    ];

    setPosts(mockPosts);
  }, []);

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.status === filter);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard de Posts</h2>
        <div className="filter-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos os Posts</option>
            <option value="pending">Pendentes</option>
            <option value="scheduled">Agendados</option>
            <option value="published">Publicados</option>
          </select>
        </div>
      </div>

      <div className="posts-grid">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="no-posts">
          <p>Nenhum post encontrado para o filtro selecionado.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

