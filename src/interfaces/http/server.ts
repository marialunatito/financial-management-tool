import express from "express";
import movementRoutes from "./routes/movementRoutes";
import userRoutes from "./routes/userRoutes";

export async function startServer() {
  const app = express();
  app.use(express.json());

  // routes here 👇🏻
  app.use("/api", userRoutes);
  app.use("/api", movementRoutes);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
