import styles from "./ForgotPasswordView.module.css";

// Components
import ForgotPasswordForm from "./components/forgotPasswordForm/ForgotPasswordForm";

const ForgotPasswordView = () => {
  return (
    <div className="page">
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPasswordView;