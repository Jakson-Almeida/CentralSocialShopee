# 🚀 Instalação Rápida - Central Social Shopee

## ⚡ Passo a Passo em 10 minutos

### 1. 📥 Instalar XAMPP
1. Baixe o XAMPP: https://www.apachefriends.org/download.html
2. Execute o instalador como **Administrador**
3. Selecione: Apache, MySQL, PHP, phpMyAdmin
4. Instale em `C:\xampp\`

### 2. 🔧 Configurar Apache (Automático)
```bash
# Execute o script de configuração
setup-apache.bat
```

### 3. 🚀 Iniciar Serviços
1. Abra o **XAMPP Control Panel**
2. Clique em **Start** no Apache
3. Clique em **Start** no MySQL
4. Verifique se ficam **verdes**

### 4. 🗄️ Configurar Banco de Dados
1. Acesse: http://localhost/phpmyadmin
2. Clique em **Novo** (criar banco)
3. Nome: `central_social_shopee`
4. Clique em **Criar**
5. Selecione o banco criado
6. Vá em **Importar**
7. Selecione: `database/schema.sql`
8. Clique em **Executar**

### 5. 🎯 Testar Configuração
```bash
# Execute o teste
test-apache.bat
```

### 6. ⚛️ Iniciar Frontend
```bash
cd frontend
npm install
npm start
```

## 🎉 Pronto! URLs de Acesso:

- **Frontend**: http://localhost:3000
- **Backend**: http://central-social-shopee.local/api
- **phpMyAdmin**: http://localhost/phpmyadmin

## 🔍 Se Algo Não Funcionar:

### Apache não inicia
```cmd
# Verificar se porta 80 está livre
netstat -ano | findstr :80
```

### MySQL não inicia
```cmd
# Verificar se porta 3306 está livre
netstat -ano | findstr :3306
```

### VirtualHost não funciona
1. Verifique se executou `setup-apache.bat`
2. Reinicie o Apache no XAMPP
3. Limpe o cache do navegador

### Frontend não carrega
```bash
cd frontend
npm install
npm start
```

## 📞 Suporte Rápido

**Problema**: Apache não inicia
**Solução**: Pare o IIS: `net stop w3svc`

**Problema**: MySQL não inicia  
**Solução**: Pare outros MySQL: `net stop mysql`

**Problema**: VirtualHost não funciona
**Solução**: Execute `setup-apache.bat` como administrador

---

**🎯 Seu ambiente está pronto para desenvolvimento!**
