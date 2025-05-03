import express from "express";

// Controller
import AuthController from "src/controllers/AuthController";
const {
  login,
  forgotPassword,
  resetPassword,
  validateToken,
  renewToken
} = AuthController;

const router = express.Router();

router.post("/api/auth/login", login);
router.post("/api/auth/reset-password", resetPassword);
router.post("/api/auth/forgot-password", forgotPassword);
router.post("/api/auth/validate-token", validateToken);
router.post("/api/auth/renew-token", renewToken);

export default router;