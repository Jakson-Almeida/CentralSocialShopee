<?php
class Database {
    private $host = 'localhost';
    private $db_name = 'central_social_shopee';
    private $username = 'root';
    private $password = '';
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }

    public function createTables() {
        try {
            $this->conn = $this->getConnection();
            
            // Tabela de usuários
            $sql = "CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                google_id VARCHAR(255) UNIQUE NOT NULL,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                picture TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )";
            $this->conn->exec($sql);

            // Tabela de posts
            $sql = "CREATE TABLE IF NOT EXISTS posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                image_url TEXT NOT NULL,
                status ENUM('pending', 'scheduled', 'published') DEFAULT 'pending',
                scheduled_date DATETIME NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )";
            $this->conn->exec($sql);

            echo "Tables created successfully\n";
        } catch(PDOException $exception) {
            echo "Error creating tables: " . $exception->getMessage();
        }
    }
}

// Para desenvolvimento, criar as tabelas automaticamente
if (php_sapi_name() === 'cli' || isset($_GET['setup'])) {
    $database = new Database();
    $database->createTables();
}
?>
