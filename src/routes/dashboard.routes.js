import express from "express";
import { getDashboardOverview } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/dashboard/overview", getDashboardOverview);

export default router;
