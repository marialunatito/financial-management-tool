import { Router } from "express";
import { CreateUser } from "../../../application/createUser";
import { UserRepositoryPostgres } from "../../../infraestructure/persistence/userRepositoryPostgres";
import { UserController } from "../controllers/user";

const router = Router();

const userRepository = new UserRepositoryPostgres();
const createUser = new CreateUser(userRepository);
const controller = new UserController(createUser);

router.post("/user", controller.create.bind(controller));

export default router;
