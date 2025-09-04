# 🔐 Configuração Google OAuth - Passo a Passo

## 📋 Pré-requisitos
- Conta Google
- Acesso ao Google Cloud Console
- Projeto Central Social Shopee rodando

## 🚀 Configuração no Google Cloud Console

### 1. **Acessar Google Cloud Console**
- Vá para: https://console.cloud.google.com/
- Faça login com sua conta Google

### 2. **Criar Novo Projeto**
- Clique em "Selecionar projeto" no topo
- Clique em "Novo projeto"
- Nome: `Central Social Shopee`
- Clique em "Criar"

### 3. **Habilitar Google Identity API**
- No menu lateral, vá em "APIs e serviços" > "Biblioteca"
- Procure por "Google Identity"
- Clique em "Habilitar"

### 4. **Configurar Tela de Consentimento OAuth**
- Vá em "APIs e serviços" > "Tela de consentimento OAuth"
- Tipo de usuário: "Externo"
- Preencha as informações:
  - **Nome do app**: `Central Social Shopee`
  - **Email de suporte**: seu email
  - **Logo**: opcional
  - **Domínio**: `localhost`
  - **Email de contato**: seu email

### 5. **Criar Credenciais OAuth**
- Vá em "APIs e serviços" > "Credenciais"
- Clique em "Criar credenciais" > "ID do cliente OAuth 2.0"
- Tipo de aplicativo: "Aplicativo da Web"
- Nome: `Central Social Shopee Web Client`
- **URIs de redirecionamento autorizados**:
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3000/`
- Clique em "Criar"

### 6. **Copiar Credenciais**
- **Client ID**: Copie o ID do cliente
- **Client Secret**: Copie o segredo do cliente

## 🔧 Configuração no Backend

### 1. **Copiar arquivo de configuração**
```bash
# Na pasta backend
cp config.env .env
```

### 2. **Editar arquivo .env**
Abra o arquivo `backend/.env` e substitua:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=SEU_CLIENT_ID_AQUI
GOOGLE_CLIENT_SECRET=SEU_CLIENT_SECRET_AQUI
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback

# Database Configuration
DB_HOST=localhost
DB_NAME=central_social_shopee
DB_USERNAME=root
DB_PASSWORD=

# JWT Configuration
JWT_SECRET=uma_chave_secreta_muito_forte_aqui

# Application Configuration
APP_NAME=Central Social Shopee
APP_ENV=development
APP_DEBUG=true
```

### 3. **Copiar para htdocs**
```bash
# Copiar arquivo .env para htdocs/api
cp backend/.env C:\xampp\htdocs\api\.env
```

## 🎨 Configuração no Frontend

### 1. **Criar arquivo .env no frontend**
```bash
# Na pasta frontend
cp env.example .env
```

### 2. **Editar frontend/.env**
```env
REACT_APP_GOOGLE_CLIENT_ID=SEU_CLIENT_ID_AQUI
REACT_APP_API_URL=http://localhost/api
```

## ✅ Teste da Configuração

### 1. **Reiniciar Apache**
- Abra XAMPP Control Panel
- Clique em "Stop" no Apache
- Clique em "Start" no Apache

### 2. **Reiniciar Frontend**
```bash
cd frontend
npm start
```

### 3. **Testar OAuth**
- Acesse: http://localhost:3000
- Clique em "Entrar com Google"
- Faça login com sua conta Google
- Autorize o aplicativo
- Verifique se foi redirecionado para o dashboard

## 🔒 Segurança

### ⚠️ **IMPORTANTE:**
- **NUNCA** commite o arquivo `.env` no GitHub
- Mantenha o Client Secret seguro
- Use chaves JWT fortes em produção
- Configure domínios autorizados corretamente

### 📁 **Arquivos que NÃO devem ser commitados:**
- `backend/.env`
- `frontend/.env`
- `C:\xampp\htdocs\api\.env`

## 🐛 Troubleshooting

### Erro: "redirect_uri_mismatch"
- Verifique se o URI está correto no Google Cloud Console
- Deve ser exatamente: `http://localhost:3000/auth/callback`

### Erro: "invalid_client"
- Verifique se o Client ID e Secret estão corretos
- Reinicie o Apache após alterações

### Erro: "access_denied"
- Usuário cancelou a autorização
- Verifique se a API está habilitada

### Erro: "Environment file not found"
- Verifique se o arquivo `.env` existe
- Verifique se o caminho está correto

## 📱 URLs para Produção

Quando for para produção, adicione no Google Cloud Console:
- `https://seudominio.com/auth/callback`
- `https://www.seudominio.com/auth/callback`

E atualize o arquivo `.env`:
```env
GOOGLE_REDIRECT_URI=https://seudominio.com/auth/callback
```
