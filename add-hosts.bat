@echo off
echo ========================================
echo   Adicionando entrada no arquivo hosts
echo ========================================
echo.

echo Adicionando: 127.0.0.1 central-social-shopee.local
echo 127.0.0.1 central-social-shopee.local >> C:\Windows\System32\drivers\etc\hosts

echo.
echo Entrada adicionada com sucesso!
echo.

echo Verificando se foi adicionada:
findstr "central-social-shopee.local" C:\Windows\System32\drivers\etc\hosts

echo.
echo Pronto! Agora teste: http://central-social-shopee.local/api
echo.

pause
