# 🚀 Guia Completo: Apache no Windows para Central Social Shopee

## 📋 Pré-requisitos
- Windows 10/11
- Acesso de administrador
- Conexão com internet

## 🛠️ Opção 1: XAMPP (Recomendado)

### 1. Download e Instalação
1. Acesse: https://www.apachefriends.org/download.html
2. Baixe o XAMPP para Windows (versão com PHP 8.x)
3. Execute o instalador como administrador
4. Durante a instalação, selecione pelo menos:
   - Apache
   - MySQL
   - PHP
   - phpMyAdmin

### 2. Configuração Inicial
```bash
# Local padrão de instalação
C:\xampp\
```

### 3. Iniciar Serviços
1. Abra o XAMPP Control Panel
2. Clique em "Start" para Apache
3. Clique em "Start" para MySQL
4. Verifique se ambos ficam verdes

### 4. Testar Instalação
- Acesse: http://localhost
- Deve aparecer a página do XAMPP

## 🔧 Configuração para o Projeto

### 1. Configurar VirtualHost
Edite o arquivo: `C:\xampp\apache\conf\extra\httpd-vhosts.conf`

```apache
# Adicione no final do arquivo:
<VirtualHost *:80>
    ServerName central-social-shopee.local
    ServerAdmin webmaster@localhost
    DocumentRoot "C:/Users/DELL/Documents/GitHub/CentralSocialShopee/backend"
    
    <Directory "C:/Users/DELL/Documents/GitHub/CentralSocialShopee/backend">
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
        
        # Configurações de segurança
        <Files "*.env">
            Require all denied
        </Files>
        
        <Files "*.sql">
            Require all denied
        </Files>
    </Directory>
    
    # Logs
    ErrorLog "logs/central-social-shopee-error.log"
    CustomLog "logs/central-social-shopee-access.log" combined
</VirtualHost>
```

### 2. Habilitar VirtualHost
Edite o arquivo: `C:\xampp\apache\conf\httpd.conf`

```apache
# Descomente a linha (remova o #):
Include conf/extra/httpd-vhosts.conf
```

### 3. Configurar Hosts
Edite o arquivo: `C:\Windows\System32\drivers\etc\hosts`

```bash
# Adicione no final:
127.0.0.1 central-social-shopee.local
```

### 4. Habilitar mod_rewrite
Edite o arquivo: `C:\xampp\apache\conf\httpd.conf`

```apache
# Descomente a linha (remova o #):
LoadModule rewrite_module modules/mod_rewrite.so
```

## 🗄️ Configuração do MySQL

### 1. Acessar phpMyAdmin
- URL: http://localhost/phpmyadmin
- Usuário: root
- Senha: (deixe em branco)

### 2. Criar Banco de Dados
```sql
CREATE DATABASE central_social_shopee 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Importar Schema
1. Selecione o banco `central_social_shopee`
2. Vá em "Importar"
3. Selecione o arquivo: `database/schema.sql`
4. Clique em "Executar"

## ⚙️ Configuração do PHP

### 1. Configurar Extensões
Edite o arquivo: `C:\xampp\php\php.ini`

```ini
# Habilitar extensões necessárias (remova o ; do início):
extension=pdo_mysql
extension=mysqli
extension=openssl
extension=mbstring
extension=curl

# Configurações de upload
upload_max_filesize = 10M
post_max_size = 10M
max_execution_time = 300
memory_limit = 256M
```

### 2. Configurar Timezone
```ini
date.timezone = America/Sao_Paulo
```

## 🚀 Testando a Configuração

### 1. Reiniciar Apache
1. No XAMPP Control Panel
2. Clique em "Stop" no Apache
3. Clique em "Start" no Apache

### 2. Testar URLs
- Frontend: http://localhost:3000
- Backend: http://central-social-shopee.local/api
- Setup DB: http://central-social-shopee.local/api?setup=1

### 3. Verificar Logs
- Logs do Apache: `C:\xampp\apache\logs\`
- Logs do projeto: `C:\xampp\apache\logs\central-social-shopee-error.log`

## 🔧 Configuração de Desenvolvimento

### 1. Criar Script de Inicialização
Crie o arquivo: `start-xampp.bat`

```batch
@echo off
echo ========================================
echo   Central Social Shopee - XAMPP Setup
echo ========================================
echo.

echo 1. Iniciando XAMPP...
cd C:\xampp
start xampp-control.exe

echo.
echo 2. Aguarde o XAMPP abrir e inicie:
echo    - Apache (clique em Start)
echo    - MySQL (clique em Start)
echo.

echo 3. URLs de acesso:
echo    - Frontend: http://localhost:3000
echo    - Backend:  http://central-social-shopee.local/api
echo    - phpMyAdmin: http://localhost/phpmyadmin
echo.

pause
```

### 2. Configurar Variáveis de Ambiente
Edite o arquivo: `backend/config/database.php`

```php
private $host = 'localhost';
private $db_name = 'central_social_shopee';
private $username = 'root';
private $password = ''; // XAMPP não tem senha por padrão
```

## 🆘 Solução de Problemas

### Apache não inicia
1. Verifique se a porta 80 não está em uso:
   ```cmd
   netstat -ano | findstr :80
   ```
2. Se estiver em uso, pare o serviço:
   ```cmd
   net stop w3svc
   ```

### MySQL não inicia
1. Verifique se a porta 3306 não está em uso:
   ```cmd
   netstat -ano | findstr :3306
   ```
2. Se necessário, pare outros serviços MySQL

### Erro de Permissão
1. Execute o XAMPP como administrador
2. Verifique as permissões da pasta do projeto

### VirtualHost não funciona
1. Verifique se o arquivo hosts está correto
2. Reinicie o Apache
3. Limpe o cache do navegador

## 📝 Comandos Úteis

### Verificar Status dos Serviços
```cmd
# Verificar se Apache está rodando
netstat -ano | findstr :80

# Verificar se MySQL está rodando
netstat -ano | findstr :3306
```

### Reiniciar Serviços
```cmd
# Via XAMPP Control Panel (recomendado)
# Ou via linha de comando:
C:\xampp\apache\bin\httpd.exe -k restart
```

### Verificar Logs
```cmd
# Logs do Apache
type C:\xampp\apache\logs\error.log

# Logs do projeto
type C:\xampp\apache\logs\central-social-shopee-error.log
```

## 🎯 Próximos Passos

1. **Teste a instalação** acessando as URLs
2. **Configure o banco de dados** importando o schema
3. **Inicie o frontend** com `npm start`
4. **Teste a autenticação** no sistema

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do Apache
2. Confirme se todas as extensões PHP estão habilitadas
3. Verifique se o mod_rewrite está ativo
4. Teste com URLs simples primeiro

---

**🎉 Apache configurado com sucesso!**

