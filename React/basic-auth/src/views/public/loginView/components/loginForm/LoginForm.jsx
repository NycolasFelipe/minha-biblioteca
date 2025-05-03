import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

// React Query
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Controllers
import AuthController from "src/controllers/AuthController";

// Contexts
import AuthContext from "src/context/AuthContext";

// Components
import InputPassword from "src/components/inputPassword/InputPassword";
import Input from "src/components/input/Input";

// Icons
import { MdOutlineLogin } from "react-icons/md";


function LoginForm() {
  const { updateUser } = useContext(AuthContext);

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: AuthController.login,
    onSuccess: (token) => {
      // Salvar o token no sessionStorage
      sessionStorage.setItem('authToken', token);
      queryClient.invalidateQueries({ queryKey: ['login'] });
      updateUser();
      navigate("/home");
    }
  });

  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      email: form.email,
      senha: form.senha
    });
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
            <h2 className={styles.subTitle}>Entrar</h2>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm(prevState => ({
                ...prevState, email: e.target.value
              }))}
              placeholder="Email"
              name="email"
            />
            <InputPassword
              className={styles.password}
              value={form.senha}
              onChange={(e) => setForm(prevState => ({
                ...prevState, senha: e.target.value
              }))}
              placeholder="Senha"
              name="senha"
            />
            <div className={styles.group}>
              <button
                type="button"
                className={styles.forgotPassword}
                onClick={() => navigate("/forgot-password")}>
                Esqueceu sua senha?
              </button>
              <button
                type="submit"
                className={styles.submitButton}>
                Login
                <MdOutlineLogin className={styles.icon} />
              </button>
            </div>
          </div>
          {mutation.isError && (
            <div className={styles.group}>
              <span className="text-danger w-100 text-end">
                {mutation.error.message}
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;