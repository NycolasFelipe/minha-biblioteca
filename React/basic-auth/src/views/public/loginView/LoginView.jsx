import styles from "./LoginView.module.css";

// Components
import LoginForm from "./components/loginForm/LoginForm";

const LoginView = () => {
  return (
    <div className="page">
      <LoginForm />
    </div>
  );
}

export default LoginView;