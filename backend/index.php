<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config/database.php';
require_once 'controllers/AuthController.php';
require_once 'controllers/PostController.php';

$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = str_replace('/api', '', $path);

$method = $_SERVER['REQUEST_METHOD'];

// Roteamento básico
try {
    switch ($path) {
        case '/auth/google':
            if ($method === 'POST') {
                $controller = new AuthController();
                $controller->googleAuth();
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case '/posts':
            $controller = new PostController();
            if ($method === 'GET') {
                $controller->getPosts();
            } elseif ($method === 'POST') {
                $controller->createPost();
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        case '/posts/schedule':
            if ($method === 'POST') {
                $controller = new PostController();
                $controller->schedulePost();
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Route not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error: ' . $e->getMessage()]);
}
?>
