class AuthController {
  static async login({ email, senha }) {
    // Configuração da requisição
    const url = import.meta.env.VITE_API + "/api/auth/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        senha,
      })
    }

    // Requisição
    const response = await fetch(url, options);

    // Acesso negado
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    // Retorna token do usuário
    return await response.json();
  }

  static async resetPassword({ newPassword, token }) {
    const url = import.meta.env.VITE_API + "/api/auth/reset-password";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token || sessionStorage.getItem("authToken"),
        newPassword
      })
    }

    // Requisição
    const response = await fetch(url, options);

    // Erro
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    // Retorna resposta
    return await response.json();
  }

  static async forgotPassword({ email }) {
    const url = import.meta.env.VITE_API + "/api/auth/forgot-password";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    }

    // Requisição
    const response = await fetch(url, options);

    // Erro
    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    // Retorna resposta
    return await response.json();
  }
}

export default AuthController;