import styles from "./ResetPasswordView.module.css";

// Components
import ResetPasswordForm from "./components/resetPasswordForm/ResetPasswordForm";

const ResetPasswordView = () => {
  return (
    <div className="page">
      <ResetPasswordForm />
    </div>
  );
}

export default ResetPasswordView;