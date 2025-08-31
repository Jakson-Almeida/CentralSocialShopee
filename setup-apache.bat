@echo off
echo ========================================
echo   Central Social Shopee - Apache Setup
echo ========================================
echo.

echo Verificando se o XAMPP esta instalado...
if not exist "C:\xampp\apache\bin\httpd.exe" (
    echo.
    echo ERRO: XAMPP nao encontrado!
    echo.
    echo Por favor, instale o XAMPP primeiro:
    echo 1. Acesse: https://www.apachefriends.org/download.html
    echo 2. Baixe e instale o XAMPP para Windows
    echo 3. Execute este script novamente
    echo.
    pause
    exit /b 1
)

echo XAMPP encontrado! Configurando...
echo.

echo 1. Configurando VirtualHost...
echo.

REM Criar backup do arquivo original
if not exist "C:\xampp\apache\conf\extra\httpd-vhosts.conf.backup" (
    copy "C:\xampp\apache\conf\extra\httpd-vhosts.conf" "C:\xampp\apache\conf\extra\httpd-vhosts.conf.backup"
)

REM Adicionar VirtualHost ao arquivo
echo # Central Social Shopee VirtualHost >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo. >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo ^<VirtualHost *:80^> >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo     ServerName central-social-shopee.local >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo     ServerAdmin webmaster@localhost >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo     DocumentRoot "C:/Users/DELL/Documents/GitHub/CentralSocialShopee/backend" >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo. >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo     ^<Directory "C:/Users/DELL/Documents/GitHub/CentralSocialShopee/backend"^> >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo         Options Indexes FollowSymLinks MultiViews >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo         AllowOverride All >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo         Require all granted >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo     ^</Directory^> >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo. >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo     ErrorLog "logs/central-social-shopee-error.log" >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo     CustomLog "logs/central-social-shopee-access.log" combined >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
echo ^</VirtualHost^> >> "C:\xampp\apache\conf\extra\httpd-vhosts.conf"

echo VirtualHost configurado!
echo.

echo 2. Habilitando mod_rewrite...
echo.

REM Verificar se mod_rewrite já está habilitado
findstr /C:"LoadModule rewrite_module" "C:\xampp\apache\conf\httpd.conf" >nul
if errorlevel 1 (
    echo mod_rewrite nao encontrado. Habilitando...
    REM Descomentar a linha do mod_rewrite
    powershell -Command "(Get-Content 'C:\xampp\apache\conf\httpd.conf') -replace '#LoadModule rewrite_module', 'LoadModule rewrite_module' | Set-Content 'C:\xampp\apache\conf\httpd.conf'"
    echo mod_rewrite habilitado!
) else (
    echo mod_rewrite ja esta habilitado!
)

echo.

echo 3. Configurando arquivo hosts...
echo.

REM Verificar se a entrada já existe
findstr /C:"central-social-shopee.local" "C:\Windows\System32\drivers\etc\hosts" >nul
if errorlevel 1 (
    echo Adicionando entrada ao arquivo hosts...
    echo 127.0.0.1 central-social-shopee.local >> "C:\Windows\System32\drivers\etc\hosts"
    echo Entrada adicionada ao hosts!
) else (
    echo Entrada ja existe no arquivo hosts!
)

echo.

echo 4. Verificando extensoes PHP...
echo.

REM Verificar extensões necessárias
echo Verificando extensoes PHP necessarias...
php -m | findstr "pdo_mysql" >nul
if errorlevel 1 (
    echo AVISO: Extensao pdo_mysql nao encontrada!
    echo Edite C:\xampp\php\php.ini e habilite: extension=pdo_mysql
)

php -m | findstr "mysqli" >nul
if errorlevel 1 (
    echo AVISO: Extensao mysqli nao encontrada!
    echo Edite C:\xampp\php\php.ini e habilite: extension=mysqli
)

echo.

echo 5. Configuracao concluida!
echo.

echo ========================================
echo   PRÓXIMOS PASSOS:
echo ========================================
echo.
echo 1. Abra o XAMPP Control Panel
echo 2. Inicie o Apache (clique em Start)
echo 3. Inicie o MySQL (clique em Start)
echo 4. Acesse: http://localhost/phpmyadmin
echo 5. Crie o banco: central_social_shopee
echo 6. Importe o arquivo: database/schema.sql
echo 7. Teste: http://central-social-shopee.local/api
echo.

echo URLs de acesso:
echo - Frontend: http://localhost:3000
echo - Backend:  http://central-social-shopee.local/api
echo - phpMyAdmin: http://localhost/phpmyadmin
echo.

echo Configuracao concluida com sucesso!
echo.

pause
