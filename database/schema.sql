-- Schema do banco de dados para Central Social Shopee
-- Execute este arquivo para criar o banco e as tabelas

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS `central_social_shopee` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `central_social_shopee`;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `google_id` VARCHAR(255) UNIQUE NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `picture` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX `idx_google_id` (`google_id`),
    INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de posts
CREATE TABLE IF NOT EXISTS `posts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `image_url` TEXT NOT NULL,
    `status` ENUM('pending', 'scheduled', 'published') DEFAULT 'pending',
    `scheduled_date` DATETIME NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_status` (`status`),
    INDEX `idx_scheduled_date` (`scheduled_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de configurações (para futuras funcionalidades)
CREATE TABLE IF NOT EXISTS `settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(255) UNIQUE NOT NULL,
    `value` TEXT,
    `description` VARCHAR(500),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX `idx_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir configurações padrão
INSERT INTO `settings` (`key`, `value`, `description`) VALUES
('app_name', 'Central Social Shopee', 'Nome da aplicação'),
('app_version', '1.0.0', 'Versão da aplicação'),
('max_posts_per_user', '100', 'Máximo de posts por usuário'),
('allowed_image_formats', 'jpg,jpeg,png,gif,webp', 'Formatos de imagem permitidos'),
('max_image_size_mb', '10', 'Tamanho máximo de imagem em MB');

-- Inserir usuário de teste (opcional)
INSERT INTO `users` (`google_id`, `name`, `email`, `picture`) VALUES
('test_user_123', 'Usuário Teste', 'teste@exemplo.com', 'https://via.placeholder.com/150/4A90E2/FFFFFF?text=U');

-- Inserir posts de exemplo
INSERT INTO `posts` (`user_id`, `title`, `description`, `image_url`, `status`) VALUES
(1, 'Retrato Masculino em Close-up', 'Luz suave, olhar direto - perfeito para produtos de beleza masculina', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face', 'pending'),
(1, 'Close-up de Jovem Sorrindo', 'Fundo desfocado, tons frios - ideal para moda jovem', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face', 'scheduled'),
(1, 'Retrato Feminino em Close', 'Contraste alto, foco nos olhos - destaque para maquiagem', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face', 'published');

-- Atualizar posts agendados com datas
UPDATE `posts` SET `scheduled_date` = '2024-01-15 10:00:00' WHERE `id` = 2;

-- Mostrar estrutura das tabelas criadas
SHOW TABLES;
DESCRIBE `users`;
DESCRIBE `posts`;
DESCRIBE `settings`;

