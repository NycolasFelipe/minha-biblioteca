# Documentação do Projeto Basic-Auth  

## Introdução  
Este projeto é uma **aplicação web React** focada em **autenticação de usuários**, desenvolvida para demonstrar um fluxo completo de:  
- **Login** com validação de credenciais e token JWT  
- **Recuperação de senha** via e-mail  
- **Redefinição de senha** com validação de força e correspondência  
- **Gestão de sessão** com monitoramento de expiração de token  
- **Proteção de rotas** públicas/privadas  

Destina-se a servir como base para sistemas que necessitem de autenticação segura, como plataformas internas ou aplicações SaaS.  


## Estrutura do Código  

### 1. **Componentes Reutilizáveis**  
Local: `src/components/`  
- **`Input`/`InputPassword`**: Campos de entrada estilizados com toggle para mostrar senha  
- **`ModalExpiredSession`**: Modal que alerta sobre sessão expirada e força logout  
- **`LoadingSpinner`**: Indicador visual de carregamento  
- **`Navbar`/`Footer`**: Componentes estruturais da interface  


### 2. **Contexto de Autenticação**  
Local: `src/context/AuthContext.js`  
- **Provedor global** de estado de autenticação  
- Armazena dados do usuário decodificados do JWT  
- Sincroniza estado entre abas via `sessionStorage`  


### 3. **Lógica de Negócio**  
Local: `src/controllers/` e `src/hooks/`  
- **`AuthController.js`**:  
  - Gerencia comunicação com API externa (login, reset de senha)  
  - Trata erros de autenticação  
- **`useAuth.js`**:  
  - Hook customizado para gerenciar estado de autenticação  
  - Verifica validade do token JWT periodicamente  
- **`useOutsideClick.js`**:  
  - Detecta cliques fora de elementos (útil para modais/dropdowns)  


### 4. **Roteamento**  
Local: `src/routes/`  
- **`publicRoutes.js`**:  
  - `/login`, `/forgot-password`, `/reset-password`  
  - Acessíveis sem autenticação  
- **`privateRoutes.js`**:  
  - `/home`  
  - Protegidas por autenticação JWT  


### 5. **Views (Páginas)**  
Local: `src/views/`  
- **Públicas**:  
  - `LoginView`: Formulário de login com validação em tempo real  
  - `ForgotPasswordView`: Solicitação de recuperação de senha  
  - `ResetPasswordView`: Redefinição de senha com força validada por regex  
- **Privada**:  
  - `HomeView`: Página inicial após autenticação  


### 6. **Configuração Global**  
- **`App.jsx`**:  
  - Configura roteamento e provedores de contexto  
  - Gerencia redirecionamentos com base na autenticação  
- **`main.jsx`**:  
  - Inicializa aplicação com React Query e estilos globais  
- **`global.css`**:  
  - Variáveis CSS customizadas e reset de estilos  
  - Design system para cores, tipografia e espaçamento  


### 7. **Validações e Segurança**  
- **Força de Senha**:  
  ```regex
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  ```
- **Token JWT**:  
  - Armazenado em `sessionStorage`  
  - Decodificado via `jwt-decode`  
  - Monitorado para expiração em tempo real  


### 8. **Ferramentas de Desenvolvimento**  
- **`vite.config.js`**:  
  - Configura aliases (`src/`) e plugins React  
- **`eslint.config.js`**:  
  - Padronização de código com regras customizadas  
- **React Query**:  
  - Gerencia estados assíncronos e cache de requisições  


## Tecnologias Utilizadas  
- **React** + **Vite** (Estrutura principal)  
- **React Router** (Navegação)  
- **React Query** (Gestão de dados)  
- **Bootstrap** (Componentes base)  
- **JWT** (Autenticação)  
- **CSS Modules** (Escopo de estilos)  
