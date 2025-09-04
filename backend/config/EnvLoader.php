<?php
/**
 * Classe para carregar variáveis de ambiente
 */
class EnvLoader {
    private static $loaded = false;
    private static $variables = [];

    /**
     * Carrega as variáveis de ambiente do arquivo .env
     */
    public static function load($envFile = null) {
        if (self::$loaded) {
            return;
        }

        if ($envFile === null) {
            $envFile = __DIR__ . '/../config.env';
        }

        if (!file_exists($envFile)) {
            throw new Exception("Environment file not found: " . $envFile);
        }

        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        
        foreach ($lines as $line) {
            // Ignorar comentários
            if (strpos(trim($line), '#') === 0) {
                continue;
            }

            // Verificar se a linha contém um =
            if (strpos($line, '=') !== false) {
                list($key, $value) = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);
                
                // Remover aspas se existirem
                if ((substr($value, 0, 1) === '"' && substr($value, -1) === '"') ||
                    (substr($value, 0, 1) === "'" && substr($value, -1) === "'")) {
                    $value = substr($value, 1, -1);
                }
                
                self::$variables[$key] = $value;
                putenv("$key=$value");
                $_ENV[$key] = $value;
            }
        }

        self::$loaded = true;
    }

    /**
     * Obtém uma variável de ambiente
     */
    public static function get($key, $default = null) {
        if (!self::$loaded) {
            self::load();
        }

        return self::$variables[$key] ?? getenv($key) ?: $default;
    }

    /**
     * Verifica se uma variável existe
     */
    public static function has($key) {
        if (!self::$loaded) {
            self::load();
        }

        return isset(self::$variables[$key]) || getenv($key) !== false;
    }
}
?>
