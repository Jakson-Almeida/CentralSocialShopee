<?php
require_once '../config/database.php';

class AuthController {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    public function googleAuth() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !isset($input['google_id']) || !isset($input['name']) || !isset($input['email'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            return;
        }

        try {
            // Verificar se o usuário já existe
            $stmt = $this->conn->prepare("SELECT * FROM users WHERE google_id = ? OR email = ?");
            $stmt->execute([$input['google_id'], $input['email']]);
            $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existingUser) {
                // Atualizar usuário existente
                $stmt = $this->conn->prepare("
                    UPDATE users 
                    SET name = ?, picture = ?, updated_at = CURRENT_TIMESTAMP 
                    WHERE id = ?
                ");
                $stmt->execute([$input['name'], $input['picture'] ?? null, $existingUser['id']]);
                
                $user = [
                    'id' => $existingUser['id'],
                    'google_id' => $existingUser['google_id'],
                    'name' => $input['name'],
                    'email' => $existingUser['email'],
                    'picture' => $input['picture'] ?? $existingUser['picture'],
                    'isAuthenticated' => true
                ];
            } else {
                // Criar novo usuário
                $stmt = $this->conn->prepare("
                    INSERT INTO users (google_id, name, email, picture) 
                    VALUES (?, ?, ?, ?)
                ");
                $stmt->execute([
                    $input['google_id'],
                    $input['name'],
                    $input['email'],
                    $input['picture'] ?? null
                ]);
                
                $userId = $this->conn->lastInsertId();
                $user = [
                    'id' => $userId,
                    'google_id' => $input['google_id'],
                    'name' => $input['name'],
                    'email' => $input['email'],
                    'picture' => $input['picture'] ?? null,
                    'isAuthenticated' => true
                ];
            }

            echo json_encode([
                'success' => true,
                'user' => $user,
                'message' => 'Authentication successful'
            ]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function validateToken($token) {
        // Em produção, aqui seria feita a validação do token JWT
        // Por enquanto, retornamos true para simulação
        return true;
    }
}
?>

