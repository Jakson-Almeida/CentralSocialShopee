# 🔐 Configuração Google OAuth para Central Social Shopee

## 📋 Pré-requisitos
- Conta Google
- Acesso ao Google Cloud Console

## 🚀 Passo a Passo

### 1. **Acessar Google Cloud Console**
- Vá para: https://console.cloud.google.com/
- Faça login com sua conta Google

### 2. **Criar Novo Projeto**
- Clique em "Selecionar projeto" no topo
- Clique em "Novo projeto"
- Nome: `Central Social Shopee`
- Clique em "Criar"

### 3. **Habilitar Google+ API**
- No menu lateral, vá em "APIs e serviços" > "Biblioteca"
- Procure por "Google+ API" ou "Google Identity"
- Clique em "Habilitar"

### 4. **Configurar Tela de Consentimento OAuth**
- Vá em "APIs e serviços" > "Tela de consentimento OAuth"
- Tipo de usuário: "Externo"
- Preencha as informações:
  - Nome do app: `Central Social Shopee`
  - Email de suporte: seu email
  - Logo: opcional
  - Domínio: `localhost`
  - Email de contato: seu email

### 5. **Criar Credenciais OAuth**
- Vá em "APIs e serviços" > "Credenciais"
- Clique em "Criar credenciais" > "ID do cliente OAuth 2.0"
- Tipo de aplicativo: "Aplicativo da Web"
- Nome: `Central Social Shopee Web Client`
- URIs de redirecionamento autorizados:
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3000/`
- Clique em "Criar"

### 6. **Copiar Credenciais**
- **Client ID**: Copie o ID do cliente
- **Client Secret**: Copie o segredo do cliente

### 7. **Atualizar Configuração no Backend**
- Abra: `C:\xampp\htdocs\api\config\google-oauth.php`
- Substitua:
  ```php
  const CLIENT_ID = 'SEU_CLIENT_ID_AQUI';
  const CLIENT_SECRET = 'SEU_CLIENT_SECRET_AQUI';
  ```

### 8. **Atualizar Frontend**
- Abra: `frontend/env.example`
- Substitua:
  ```env
  REACT_APP_GOOGLE_CLIENT_ID=SEU_CLIENT_ID_AQUI
  ```

## ✅ Teste

1. **Reinicie o Apache** (XAMPP Control Panel)
2. **Acesse**: http://localhost:3000
3. **Clique em "Entrar com Google"**
4. **Faça login** com sua conta Google
5. **Autorize** o aplicativo
6. **Verifique** se foi redirecionado para o dashboard

## 🔒 Segurança

- **NUNCA** commite credenciais reais no GitHub
- Use variáveis de ambiente
- Mantenha o Client Secret seguro
- Configure domínios autorizados em produção

## 🐛 Troubleshooting

### Erro: "redirect_uri_mismatch"
- Verifique se o URI de redirecionamento está correto no Google Cloud Console
- Deve ser exatamente: `http://localhost:3000/auth/callback`

### Erro: "invalid_client"
- Verifique se o Client ID e Secret estão corretos
- Reinicie o Apache após alterações

### Erro: "access_denied"
- Usuário cancelou a autorização
- Verifique se a API está habilitada

## 📱 URLs de Redirecionamento para Produção

Quando for para produção, adicione:
- `https://seudominio.com/auth/callback`
- `https://www.seudominio.com/auth/callback`
