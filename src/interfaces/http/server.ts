import express from "express";
import { authenticateToken } from "./middleware/auth";
import loginRoutes from "./routes/loginRoutes";
import movementRoutes from "./routes/movementRoutes";
import userRoutes from "./routes/userRoutes";

export async function startServer() {
  const app = express();
  app.use(express.json());

  // routes here 👇🏻

  app.use("/auth", loginRoutes);
  app.use("/api", authenticateToken, userRoutes);
  app.use("/api", authenticateToken, movementRoutes);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
