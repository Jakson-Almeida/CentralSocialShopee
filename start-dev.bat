@echo off
echo ========================================
echo   Central Social Shopee - Dev Server
echo ========================================
echo.

echo Iniciando o servidor de desenvolvimento...
echo.

echo 1. Iniciando o Frontend (React)...
cd frontend
start "Frontend - React" cmd /k "npm start"
cd ..

echo.
echo 2. Configurando o Backend (PHP)...
echo    - Certifique-se de que o Apache esta rodando
echo    - Configure o VirtualHost para apontar para a pasta backend
echo    - Acesse: http://localhost:8000/api?setup=1 para criar as tabelas
echo.

echo 3. URLs de acesso:
echo    - Frontend: http://localhost:3000
echo    - Backend:  http://localhost:8000/api
echo.

echo 4. Para parar os servidores:
echo    - Feche as janelas do CMD ou pressione Ctrl+C
echo.

pause
