import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ResetPasswordForm.module.css";

// Components
import InputPassword from "src/components/inputPassword/InputPassword";

// Controllers
import AuthController from "src/controllers/AuthController";

// Lib/Util
import classNames from "classnames";
import formDataTemplate from "./util/formDateTemplate";
import formDateValidate from "./util/formDateValidate";

// React Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Icons
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

function ResetPasswordForm() {
  const { token } = useParams();

  // React navigate
  const navigate = useNavigate();

  // Cliente para gerenciamento de cache de queries
  const queryClient = useQueryClient();

  // Estado do formulário e erros
  const [formData, setFormData] = useState(structuredClone(formDataTemplate));
  const [errors, setErrors] = useState(null);

  // Configura mutation para alterar senha
  const mutation = useMutation({
    mutationFn: AuthController.resetPassword,
    onSuccess: () => {
      // Atualiza queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['reset'] });

      // Redireciona para a página inicial
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  });

  // Executa mutation
  const updateUserPassword = () => mutation.mutate({
    newPassword: formData.newPassword,
    token
  });

  // Submissão do formulário
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors } = await validateForm(formData, formDateValidate);
    setErrors(errors);

    // Prossegue se válido
    if (isValid) updateUserPassword();
  }

  // Valida campos conforme regras
  const validateForm = async (formData, config) => {
    const errors = {};
    for (const [field, rules] of Object.entries(config)) {
      const value = (formData[field] || '').toString().trim();

      // Valida obrigatoriedade
      if (rules.required && !value) errors[field] = 'campo obrigatório';

      // Validações customizadas
      if (rules.validate && !errors[field]) {
        try {
          if (!(await rules.validate(formData))) errors[field] = rules.message;
        } catch { errors[field] = 'Erro na validação' }
      }
    }
    return { isValid: !Object.keys(errors).length, errors };
  }

  // Funções auxiliares
  const getSubmitButtonClasses = () => {
    return classNames(
      styles.submitButton,
      mutation.isPending && styles.submitDisabled,
      mutation.isSuccess && styles.submitSent,
      mutation.isError && styles.submitError
    );
  }

  const renderButtonContent = () => {
    if (mutation.isPending) {
      return "Salvando";
    }

    if (mutation.isSuccess) {
      return (
        <>
          Senha salva
          <FaCheckCircle />
        </>
      );
    }

    if (mutation.isError) {
      return (
        <>
          Erro ao salvar
          <MdError />
        </>
      );
    }

    return "Salvar senha";
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
        <form onSubmit={handleFormSubmit}>
          <div className={styles.stack}>
            <h2 className={styles.subTitle}>Mudar senha</h2>
            <InputPassword
              className={styles.password}
              placeholder="Senha"
              label={errors?.newPassword ? `Nova senha (${errors.newPassword})` : "Nova senha"}
              warning={errors?.newPassword}
              name="newPassword"
              value={formData.newPassword}
              onChange={(e) => setFormData(prevState => ({
                ...prevState, newPassword: e.target.value
              }))}
            />
            <InputPassword
              className={styles.password}
              placeholder="Confirmar nova senha"
              label={errors?.confirmPassword ? `Confirmar senha (${errors.confirmPassword})` : "Confirmar senha"}
              warning={errors?.confirmPassword}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prevState => ({
                ...prevState, confirmPassword: e.target.value
              }))}
            />
            <div className={styles.group}>
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

export default ResetPasswordForm;