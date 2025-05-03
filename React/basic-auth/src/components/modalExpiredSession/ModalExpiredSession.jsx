import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styles from "./ModalExpiredSession.module.css";

// Lib
import classNames from "classnames";
import { jwtDecode } from "jwt-decode";

// Icons
import { MdOutlineAccessTime } from "react-icons/md";

// Context
import AuthContext from "src/context/AuthContext";


const ModalExpiredSession = () => {
  // Hook para navegação programática
  const navigate = useNavigate();

  // Contexto de autenticação
  const { isAuthenticated, updateUser } = useContext(AuthContext);

  // Estado para controlar exibição do modal
  const [isActive, setIsActive] = useState(false);

  // Handler para logout e redirecionamento
  const handleConfirm = () => {
    // 1. Fecha o modal
    // 2. Remove token de autenticação da sessão
    // 3. Atualiza estado global do usuário
    // 4. Redireciona para página de login
    setIsActive(false);
    sessionStorage.removeItem("authToken");
    updateUser();
    navigate("/");
  }

  // Efeito para verificar expiração do token JWT
  useEffect(() => {
    // Flag para evitar state updates em componente desmontado
    let isMounted = true;

    // Referência para o timer de expiração
    let timerRef = null;

    const checkTokenExpiration = () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) return;

        const decoded = jwtDecode(token);
        const expiryTime = decoded.exp * 1000;
        const timeout = expiryTime - Date.now(); // Calcula tempo restante

        // Se token já expirou
        if (timeout <= 0) {
          if (isMounted) setIsActive(true); // Mostra modal
        } else {
          // Agenda verificação para quando o token expirar
          timerRef = setTimeout(() => {
            if (isMounted) setIsActive(true);
          }, timeout);
        }
      } catch (error) {
        console.error("Erro ao verificar o token:", error);
        // Em caso de erro no token, força logout
        if (isMounted) setIsActive(true);
      }
    }

    // Executa verificação inicial
    checkTokenExpiration();

    // Cleanup effect
    return () => {
      isMounted = false;
      clearTimeout(timerRef);
    }
  }, [navigate]); // Executa quando navegação muda

  // Efeito para sincronizar estado de autenticação com o modal
  // Mostra modal se usuário não está autenticado
  useEffect(() => {
    setIsActive(!isAuthenticated);
  }, [isAuthenticated]);


  return (
    <>
      <div
        className={classNames("modal-backdrop fade", { show: isActive })}
        style={{ display: isActive ? 'block' : 'none' }}
      />

      <div
        id="modalFade"
        className={classNames("modal fade", styles.modal, { show: isActive })}
        style={{ display: isActive ? 'block' : 'none' }}
        onClick={(e) => e.target.id === "modalFade" && handleConfirm()}
        tabIndex="-1"
      >
        <div className={classNames("modal-dialog modal-dialog-centered modal-md", styles.modalDialog)}>
          <div className={classNames("modal-content", styles.modalContent)}>
            <div className={classNames("modal-header", styles.modalHeader)}>
              <h5 className="modal-title">
                <MdOutlineAccessTime size={20} />
                Sua sessão expirou
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => handleConfirm()}
              />
            </div>

            <div className={classNames("modal-body", styles.modalBody)}>
              <div className="mb-4">
                <p>Faça o login novamente.</p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className={classNames("btn btn-secondary", styles.btnConfirm)}
                onClick={() => handleConfirm()}>
                Voltar ao início
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default ModalExpiredSession