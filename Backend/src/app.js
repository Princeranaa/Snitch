import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config/config.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/", productRoutes);

app.use("/", (req, res) => {
  res.send("Hello from Snitch");
});

export default app;
