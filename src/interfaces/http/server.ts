import express from "express";
import userRoutes from "./routes/userRoutes";

export async function startServer() {
  const app = express();
  app.use(express.json());

  // routes here 👇🏻
  app.use("/api", userRoutes);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
