# 🚀 Configuração Rápida - Central Social Shopee

## ⚡ Setup em 5 minutos

### 1. Frontend (React)
```bash
cd frontend
npm install
npm start
```
✅ Frontend rodando em: http://localhost:3000

### 2. Backend (PHP)
```bash
# Certifique-se de que o Apache está rodando
# Configure o VirtualHost para apontar para a pasta backend
# Acesse: http://localhost:8000/api?setup=1
```
✅ Backend rodando em: http://localhost:8000/api

### 3. Banco de Dados
```sql
-- Execute no MySQL/MariaDB:
CREATE DATABASE central_social_shopee;
USE central_social_shopee;
-- Execute o arquivo: database/schema.sql
```

## 🔧 Configurações Necessárias

### Apache VirtualHost
```apache
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot "C:/Users/DELL/Documents/GitHub/CentralSocialShopee/backend"
    
    <Directory "C:/Users/DELL/Documents/GitHub/CentralSocialShopee/backend">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### Variáveis de Ambiente
```bash
# frontend/.env
REACT_APP_GOOGLE_CLIENT_ID=seu_google_client_id
REACT_APP_API_URL=http://localhost:8000/api

# backend/config.env
DB_HOST=localhost
DB_NAME=central_social_shopee
DB_USERNAME=root
DB_PASSWORD=
```

## 🎯 Funcionalidades Implementadas

- ✅ Login/Signup com Google (simulado)
- ✅ Dashboard responsivo
- ✅ Galeria de posts em formato retrato
- ✅ Filtros por status
- ✅ Header com avatar do usuário
- ✅ Sistema de roteamento protegido
- ✅ Design moderno e responsivo

## 📱 Posts de Exemplo

A plataforma já vem com 8 posts de exemplo usando as imagens fornecidas:
- Retratos masculinos e femininos
- Diferentes estilos e status
- Imagens de alta qualidade do Unsplash, Pexels e Pixabay

## 🚀 Próximos Passos

1. **Configurar Google OAuth** real
2. **Conectar com banco de dados** real
3. **Implementar upload de imagens**
4. **Adicionar sistema de agendamento**
5. **Integração com APIs da Shopee**

## 🆘 Solução de Problemas

### Frontend não carrega
- Verifique se o Node.js está instalado
- Execute `npm install` na pasta frontend

### Backend não responde
- Verifique se o Apache está rodando
- Confirme se o mod_rewrite está habilitado
- Verifique as permissões da pasta backend

### Banco não conecta
- Confirme se o MySQL está rodando
- Verifique as credenciais no config.env
- Execute o schema.sql para criar as tabelas

## 📞 Suporte

Para problemas técnicos:
1. Verifique os logs do Apache
2. Console do navegador para erros JavaScript
3. Abra uma issue no repositório

---

**🎉 Pronto! Sua plataforma está funcionando!**

