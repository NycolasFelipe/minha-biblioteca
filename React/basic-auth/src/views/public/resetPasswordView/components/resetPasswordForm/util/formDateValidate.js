// Validação de formulário para alteração de senha
const formDateValidate = {
  // Validação para nova senha
  newPassword: {
    required: true,
    validate: (formData) => {
      // Validação de força da senha usando regex
      const isValidPassword = formData.newPassword.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      );

      // Atualiza mensagem se a senha for fraca
      if (!isValidPassword) {
        formDateValidate.newPassword.message = "senha muito fraca";
      }

      // Verifica se as senhas coincidem
      const isMatchingPassword = formData.newPassword === formData.confirmPassword;
      if (!isMatchingPassword) {
        formDateValidate.newPassword.message = "as senhas não coincidem";
      }

      // Retorna true apenas se passar em ambas validações
      return isValidPassword && isMatchingPassword;
    },
    message: ''
  },

  // Validação para confirmação de senha
  confirmPassword: {
    required: true,
    validate: (formData) => {
      // Verificação simples de correspondência com nova senha
      return formData.newPassword === formData.confirmPassword;
    },
    message: ''
  }
}

export default formDateValidate;