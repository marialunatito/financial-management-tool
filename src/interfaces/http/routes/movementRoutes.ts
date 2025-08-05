import { Router } from "express";
import { RegisterMovement } from "src/application/registerMovement";
import { CategoryRepositoryPostgres } from "src/infraestructure/persistence/categoryRepositoryPosgres";
import { MovementRepositoryPostgres } from "src/infraestructure/persistence/movementRepository";
import { WalletRepositoryPostgres } from "src/infraestructure/persistence/walletRepositoryPostgres";
import { MovementController } from "../controllers/movement";

const router = Router();

const walletRepository = new WalletRepositoryPostgres();
const movementRepository = new MovementRepositoryPostgres();
const categoryRepository = new CategoryRepositoryPostgres();

const registerMovement = new RegisterMovement(
  walletRepository,
  movementRepository,
  categoryRepository
);

const controller = new MovementController(registerMovement);

router.post("/movement", controller.register.bind(controller));

export default router;
