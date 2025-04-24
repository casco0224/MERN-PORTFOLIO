import express from "express";
import path from "path";
import {
  login,
  register,
  logout,
  getUser,
  updateProfile,
  updatePassword,
  getUserForPortfolio,
  forgotPassword,
  resetPassword,
} from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.put("/update/me", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);
router.get("/me/portfolio", getUserForPortfolio);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

// Ruta para descargar el archivo resume
router.get("/resume", (req, res) => {
  const filePath = path.resolve("uploads/resume.pdf"); // Ajusta esta ruta según tu estructura
  res.download(filePath, "resume.pdf", (err) => {
    if (err) {
      console.error("Error al descargar el archivo:", err);
      res.status(500).send("No se pudo procesar la descarga.");
    }
  });
});

export default router;
