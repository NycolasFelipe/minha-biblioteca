import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

/** Hook para gerenciar autenticação JWT */
const useAuth = () => {
  // Estado para armazenar dados do usuário
  const [user, setUser] = useState(null);

  // Estado que indica se o usuário está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Estado de carregamento durante a verificação inicial do token
  const [loading, setLoading] = useState(true);

  // Função para verificar e atualizar o estado de autenticação
  const updateUser = () => {
    const token = sessionStorage.getItem("authToken");

    // Se não há token, limpa os estados
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      // Decodifica o token JWT e atualiza os estados
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setIsAuthenticated(true);
    } catch (error) {
      // Em caso de token inválido, limpa a autenticação
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }

  // Efeito para verificar autenticação ao montar o componente
  // e sincronizar entre abas/janelas
  useEffect(() => {
    updateUser();

    // Listener para mudanças no armazenamento (sync entre abas)
    const handleStorageChange = () => updateUser();
    window.addEventListener('storage', handleStorageChange);

    // Cleanup do listener
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    user,               // Dados do usuário decodificados
    updateUser,         // Função para forçar atualização do estado
    isAuthenticated,    // Status atual da autenticação
    setIsAuthenticated, // Modificador manual do status
    loading             // Status de carregamento inicial
  }
}

export default useAuth;