@echo off
echo ========================================
echo   Central Social Shopee - Apache Test
echo ========================================
echo.

echo Testando configuracao do Apache...
echo.

echo 1. Verificando se o Apache esta rodando...
netstat -ano | findstr :80 >nul
if errorlevel 1 (
    echo [ERRO] Apache nao esta rodando!
    echo Por favor, inicie o Apache no XAMPP Control Panel
    echo.
) else (
    echo [OK] Apache esta rodando na porta 80
)

echo.

echo 2. Verificando se o MySQL esta rodando...
netstat -ano | findstr :3306 >nul
if errorlevel 1 (
    echo [ERRO] MySQL nao esta rodando!
    echo Por favor, inicie o MySQL no XAMPP Control Panel
    echo.
) else (
    echo [OK] MySQL esta rodando na porta 3306
)

echo.

echo 3. Testando VirtualHost...
echo Testando: http://central-social-shopee.local/api
curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://central-social-shopee.local/api
if errorlevel 1 (
    echo [ERRO] VirtualHost nao esta funcionando!
    echo Verifique se:
    echo - O arquivo hosts esta configurado
    echo - O VirtualHost esta habilitado
    echo - O Apache foi reiniciado
    echo.
) else (
    echo [OK] VirtualHost esta funcionando!
)

echo.

echo 4. Testando phpMyAdmin...
echo Testando: http://localhost/phpmyadmin
curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost/phpmyadmin
if errorlevel 1 (
    echo [ERRO] phpMyAdmin nao esta acessivel!
    echo.
) else (
    echo [OK] phpMyAdmin esta acessivel!
)

echo.

echo 5. Verificando extensoes PHP...
echo.
php -m | findstr "pdo_mysql" >nul
if errorlevel 1 (
    echo [ERRO] Extensao pdo_mysql nao encontrada!
) else (
    echo [OK] Extensao pdo_mysql encontrada!
)

php -m | findstr "mysqli" >nul
if errorlevel 1 (
    echo [ERRO] Extensao mysqli nao encontrada!
) else (
    echo [OK] Extensao mysqli encontrada!
)

php -m | findstr "openssl" >nul
if errorlevel 1 (
    echo [ERRO] Extensao openssl nao encontrada!
) else (
    echo [OK] Extensao openssl encontrada!
)

echo.

echo 6. Verificando arquivo hosts...
findstr /C:"central-social-shopee.local" "C:\Windows\System32\drivers\etc\hosts" >nul
if errorlevel 1 (
    echo [ERRO] Entrada nao encontrada no arquivo hosts!
    echo Adicione: 127.0.0.1 central-social-shopee.local
    echo.
) else (
    echo [OK] Entrada encontrada no arquivo hosts!
)

echo.

echo 7. Verificando mod_rewrite...
findstr /C:"LoadModule rewrite_module" "C:\xampp\apache\conf\httpd.conf" >nul
if errorlevel 1 (
    echo [ERRO] mod_rewrite nao esta habilitado!
    echo Habilite no arquivo httpd.conf
    echo.
) else (
    echo [OK] mod_rewrite esta habilitado!
)

echo.

echo ========================================
echo   RESUMO DOS TESTES:
echo ========================================
echo.

echo URLs para testar manualmente:
echo - Frontend: http://localhost:3000
echo - Backend:  http://central-social-shopee.local/api
echo - phpMyAdmin: http://localhost/phpmyadmin
echo - Setup DB: http://central-social-shopee.local/api?setup=1
echo.

echo Se todos os testes passaram, seu ambiente esta pronto!
echo Caso contrario, verifique os erros acima e corrija.
echo.

pause

