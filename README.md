# Central Social Shopee

Uma plataforma para gerenciar conteúdo para a Shopee Brasil, desenvolvida com React (frontend) e PHP (backend).

## 🚀 Tecnologias Utilizadas

### Frontend
- React 18 com TypeScript
- React Router para navegação
- CSS moderno com animações e design responsivo

### Backend
- PHP 8+
- MySQL/MariaDB
- Apache com mod_rewrite

## 📋 Pré-requisitos

- Node.js 16+ e npm
- PHP 8.0+
- MySQL/MariaDB
- Apache com mod_rewrite habilitado
- Composer (opcional, para dependências PHP)

## 🛠️ Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd CentralSocialShopee
```

### 2. Configuração do Frontend
```bash
cd frontend
npm install
```

Crie um arquivo `.env` baseado no `env.example`:
```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
REACT_APP_GOOGLE_CLIENT_ID=seu_google_client_id
REACT_APP_API_URL=http://localhost:8000/api
```

### 3. Configuração do Backend
```bash
cd ../backend
```

Crie um arquivo `config.env` baseado no `config.env.example`:
```bash
cp config.env.example config.env
```

Edite o arquivo `config.env` com suas configurações de banco de dados.

### 4. Configuração do Banco de Dados
1. Crie um banco MySQL chamado `central_social_shopee`
2. Configure as credenciais no arquivo `config.env`
3. Acesse `http://localhost:8000/api?setup=1` para criar as tabelas automaticamente

### 5. Configuração do Apache
Certifique-se de que o mod_rewrite está habilitado:
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

Configure o VirtualHost para apontar para a pasta `backend`:
```apache
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot /caminho/para/CentralSocialShopee/backend
    
    <Directory /caminho/para/CentralSocialShopee/backend>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## 🚀 Executando o Projeto

### Frontend
```bash
cd frontend
npm start
```
O frontend estará disponível em `http://localhost:3000`

### Backend
O backend estará disponível em `http://localhost:8000/api`

## 🔐 Autenticação Google

Para configurar a autenticação com Google:

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google+ 
4. Crie credenciais OAuth 2.0
5. Configure as URLs de redirecionamento autorizadas
6. Copie o Client ID e Client Secret para os arquivos de configuração

## 📱 Funcionalidades

- **Autenticação Social**: Login/Signup com Google
- **Dashboard**: Visualização de posts em formato galeria
- **Gestão de Posts**: Visualização, edição e agendamento
- **Filtros**: Por status (pendente, agendado, publicado)
- **Design Responsivo**: Funciona em desktop e mobile

## 🎨 Estrutura do Projeto

```
CentralSocialShopee/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── Auth/       # Autenticação
│   │   │   ├── Header/     # Cabeçalho
│   │   │   ├── Dashboard/  # Dashboard principal
│   │   │   └── PostCard/   # Card de post
│   │   ├── App.tsx         # Componente principal
│   │   └── App.css         # Estilos
│   └── package.json
├── backend/                  # API PHP
│   ├── config/             # Configurações
│   ├── controllers/        # Controladores
│   ├── index.php           # Ponto de entrada
│   └── .htaccess           # Configuração Apache
└── README.md
```

## 🔧 Desenvolvimento

### Adicionando Novos Posts
Os posts são simulados no `PostController.php`. Para adicionar novos posts, edite o array `$posts` no método `getPosts()`.

### Personalizando Estilos
Os estilos estão em `frontend/src/App.css` e podem ser facilmente personalizados.

### Adicionando Novas Funcionalidades
1. Crie novos componentes React em `frontend/src/components/`
2. Adicione novas rotas no `App.tsx`
3. Crie novos controladores PHP em `backend/controllers/`
4. Adicione novas rotas no `backend/index.php`

## 🚀 Deploy

### Frontend
```bash
cd frontend
npm run build
```
Os arquivos de produção estarão em `frontend/build/`

### Backend
1. Configure o servidor web (Apache/Nginx)
2. Configure o banco de dados de produção
3. Atualize as variáveis de ambiente
4. Configure HTTPS e certificados SSL

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, abra uma issue no repositório ou entre em contato através do email: [seu-email@exemplo.com]

---

**Desenvolvido com ❤️ para a Shopee Brasil**