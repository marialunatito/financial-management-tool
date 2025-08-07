import { Router } from "express";
import { Login } from "../../../application/login";
import { UserRepositoryPostgres } from "../../../infraestructure/persistence/userRepositoryPostgres";
import { LoginController } from "../controllers/login";

const router = Router();

const userRepository = new UserRepositoryPostgres();
const loginUseCase = new Login(userRepository);
const controller = new LoginController(loginUseCase);

router.post("/login", controller.login.bind(controller));

export default router;
