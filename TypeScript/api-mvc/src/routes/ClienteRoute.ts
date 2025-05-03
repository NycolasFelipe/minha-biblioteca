import express from "express";
import authenticateJWTAdmin from "src/middlewares/authenticateJWTAdmin";

// Controllers
import ClienteController from "src/controllers/ClienteController";
const {
  getCliente,
  getClientes,
  createCliente,
  deleteCliente,
  updateCliente
} = ClienteController;

const router = express.Router();

// Rotas de cliente
router.get("/api/cliente/:id", authenticateJWTAdmin, getCliente);
router.get("/api/cliente", authenticateJWTAdmin, getClientes);
router.post("/api/cliente", authenticateJWTAdmin, createCliente);
router.delete("/api/cliente/:id", authenticateJWTAdmin, deleteCliente);
router.patch("/api/cliente/:id", authenticateJWTAdmin, updateCliente);

export default router;