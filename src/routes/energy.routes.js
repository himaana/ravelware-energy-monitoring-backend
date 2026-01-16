import express from "express";
import {
    getRealtimePanels,
    getTodayUsage,
} from "../controllers/energy.controller.js";

const router = express.Router();

router.get("/panels/realtime", getRealtimePanels);
router.get("/panels/:panelId/today", getTodayUsage);

export default router;
