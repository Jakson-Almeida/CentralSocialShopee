<?php
require_once __DIR__ . '/EnvLoader.php';

// Carregar variáveis de ambiente
EnvLoader::load();

// Google OAuth Configuration
class GoogleOAuthConfig {
    // Credenciais carregadas das variáveis de ambiente
    const CLIENT_ID = null; // Será carregado dinamicamente
    const CLIENT_SECRET = null; // Será carregado dinamicamente
    const REDIRECT_URI = null; // Será carregado dinamicamente
    
    // URLs do Google OAuth
    const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
    const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';
    
    // Escopo necessário
    const SCOPE = 'email profile';
    
    public static function getAuthUrl() {
        $params = [
            'client_id' => EnvLoader::get('GOOGLE_CLIENT_ID'),
            'redirect_uri' => EnvLoader::get('GOOGLE_REDIRECT_URI'),
            'scope' => self::SCOPE,
            'response_type' => 'code',
            'access_type' => 'offline',
            'prompt' => 'consent'
        ];
        
        return self::GOOGLE_AUTH_URL . '?' . http_build_query($params);
    }
    
    public static function getTokenUrl() {
        return self::GOOGLE_TOKEN_URL;
    }
    
    public static function getUserInfoUrl() {
        return self::GOOGLE_USERINFO_URL;
    }
}
?>
