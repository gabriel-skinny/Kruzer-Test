import { Router } from "express";
import { PipeDriveController } from "./controllers/PipeDriveController";

export const router = Router();

router.get("/webhook", PipeDriveController.webhookActivityUpdate);
