import express from "express";
import { ENV } from "./config/env.js";
import "./mqtt/subscriber.js";
import energyRoutes from "./routes/energy.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();
app.use(express.json());

app.get("/health", (_, res) => {
    res.json({ status: "OK" });
});

app.use("/api", energyRoutes);
app.use("/api", dashboardRoutes);

app.listen(ENV.PORT, () => {
    console.log(`Backend running on port ${ENV.PORT}`);
});
