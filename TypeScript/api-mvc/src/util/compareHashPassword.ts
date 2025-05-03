import hashPassword from "./hashPassword";

const compareHashPassword = (password: string, hashedPassword: string) => {
  if (hashPassword(password) === hashedPassword) {
    return { success: true, message: 'Password matched' }
  }
  return { success: false, message: 'Password not matched' }
}

export default compareHashPassword;