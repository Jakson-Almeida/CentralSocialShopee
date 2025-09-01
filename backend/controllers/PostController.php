<?php
require_once '../config/database.php';

class PostController {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    public function getPosts() {
        try {
            // Por enquanto, retornamos posts simulados
            // Em produção, isso viria do banco de dados
            $posts = [
                [
                    'id' => '1',
                    'title' => 'Retrato Masculino em Close-up',
                    'imageUrl' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
                    'description' => 'Luz suave, olhar direto - perfeito para produtos de beleza masculina',
                    'status' => 'pending'
                ],
                [
                    'id' => '2',
                    'title' => 'Close-up de Jovem Sorrindo',
                    'imageUrl' => 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face',
                    'description' => 'Fundo desfocado, tons frios - ideal para moda jovem',
                    'status' => 'scheduled',
                    'scheduledDate' => '2024-01-15'
                ],
                [
                    'id' => '3',
                    'title' => 'Retrato Feminino em Close',
                    'imageUrl' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
                    'description' => 'Contraste alto, foco nos olhos - destaque para maquiagem',
                    'status' => 'published'
                ],
                [
                    'id' => '4',
                    'title' => 'Retrato de Estúdio Masculino',
                    'imageUrl' => 'https://images.pexels.com/photos/27368188/pexels-photo-27368188.jpeg?w=400&h=600&fit=crop&crop=face',
                    'description' => 'Fundo escuro, expressão séria - elegante para produtos premium',
                    'status' => 'pending'
                ],
                [
                    'id' => '5',
                    'title' => 'Close-up Feminino Pensativo',
                    'imageUrl' => 'https://images.pexels.com/photos/30055488/pexels-photo-30055488.jpeg?w=400&h=600&fit=crop&crop=face',
                    'description' => 'Brincos, pele iluminada - sofisticado para joias',
                    'status' => 'scheduled',
                    'scheduledDate' => '2024-01-20'
                ],
                [
                    'id' => '6',
                    'title' => 'Retrato PB Artístico',
                    'imageUrl' => 'https://images.pexels.com/photos/15148473/pexels-photo-15148473.jpeg?w=400&h=600&fit=crop&crop=face',
                    'description' => 'Detalhe de olho e lábios - dramático para cosméticos',
                    'status' => 'pending'
                ],
                [
                    'id' => '7',
                    'title' => 'Retrato de Rua Feminino',
                    'imageUrl' => 'https://cdn.pixabay.com/photo/2022/11/29/11/30/woman-7624348_1280.jpg?w=400&h=600&fit=crop&crop=face',
                    'description' => 'Close-up, luz natural - autêntico para lifestyle',
                    'status' => 'pending'
                ],
                [
                    'id' => '8',
                    'title' => 'Retrato PB Masculino',
                    'imageUrl' => 'https://cdn.pixabay.com/photo/2020/03/24/20/05/men-4963138_1280.jpg?w=400&h=600&fit=crop&crop=face',
                    'description' => 'Clima dramático, meia-luz - intenso para perfumes',
                    'status' => 'scheduled',
                    'scheduledDate' => '2024-01-25'
                ]
            ];

            echo json_encode([
                'success' => true,
                'posts' => $posts,
                'total' => count($posts)
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error fetching posts: ' . $e->getMessage()]);
        }
    }

    public function createPost() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !isset($input['title']) || !isset($input['imageUrl'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            return;
        }

        try {
            // Em produção, aqui seria feita a inserção no banco
            $post = [
                'id' => uniqid(),
                'title' => $input['title'],
                'imageUrl' => $input['imageUrl'],
                'description' => $input['description'] ?? '',
                'status' => 'pending',
                'created_at' => date('Y-m-d H:i:s')
            ];

            echo json_encode([
                'success' => true,
                'post' => $post,
                'message' => 'Post created successfully'
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error creating post: ' . $e->getMessage()]);
        }
    }

    public function schedulePost() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !isset($input['postId']) || !isset($input['scheduledDate'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            return;
        }

        try {
            // Em produção, aqui seria feita a atualização no banco
            echo json_encode([
                'success' => true,
                'message' => 'Post scheduled successfully',
                'postId' => $input['postId'],
                'scheduledDate' => $input['scheduledDate']
            ]);

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Error scheduling post: ' . $e->getMessage()]);
        }
    }
}
?>

