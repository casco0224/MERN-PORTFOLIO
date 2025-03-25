import express from "express";
import {
  deleteTimeline,
  getAllTimelines,
  postTimeline,
  updateTimeline,
  getTimelineById, // Importamos el nuevo controlador
} from "../controller/timelineController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, postTimeline);
router.delete("/delete/:id", isAuthenticated, deleteTimeline);
router.get("/getall", getAllTimelines);
router.put("/update/:id", isAuthenticated, updateTimeline);
router.get("/get/:id", getTimelineById); // Nueva ruta para obtener una línea de tiempo específica

export default router;
