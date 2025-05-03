// Views
import LoginView from "src/views/public/loginView/LoginView";
import ForgotPasswordView from "src/views/public/forgotPasswordView/ForgotPasswordView";
import ResetPasswordView from "src/views/public/resetPasswordView/ResetPasswordView";

// Rotas públicas
const publicRoutes = [
  { path: "/", component: LoginView },
  { path: "/login", component: LoginView },
  { path: "/forgot-password", component: ForgotPasswordView },
  { path: "/reset-password/:token", component: ResetPasswordView }
];

export default publicRoutes;