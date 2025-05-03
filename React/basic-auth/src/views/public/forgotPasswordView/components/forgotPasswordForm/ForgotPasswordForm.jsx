import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPasswordForm.module.css";

// Components
import Input from "src/components/input/Input";

// Controllers
import AuthController from "src/controllers/AuthController";

// React Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Lib
import classNames from "classnames";

// Icons
import { FaCheckCircle } from "react-icons/fa";


function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: AuthController.forgotPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reset-password'] });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email });
  }

  // Funções auxiliares
  const getSubmitButtonClasses = () => {
    return classNames(
      styles.submitButton,
      mutation.isPending && styles.submitDisabled,
      mutation.isSuccess && styles.submitSent
    );
  }

  const renderButtonContent = () => {
    if (mutation.isPending) {
      return "Enviando";
    }

    if (mutation.isSuccess) {
      return (
        <>
          Email de recuperação enviado
          <FaCheckCircle />
        </>
      );
    }

    return "Recuperar senha";
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img
          className={styles.icon}
          src="/logo_80x80.png"
          alt="Logo da Editora Ensina Mais"
        />
        <h1 className={styles.title}>Ensina Mais</h1>
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.stack}>
            <h2 className={styles.subTitle}>Esqueci minha senha</h2>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              name="email"
            />
            <div className={styles.group}>
              <button
                type="button"
                className={styles.returnButton}
                onClick={() => navigate("/")}>
                Voltar
              </button>
              <button
                type="submit"
                className={getSubmitButtonClasses()}>
                {renderButtonContent()}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;