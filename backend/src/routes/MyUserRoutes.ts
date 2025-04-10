import express from "express";
import MyUserController from "../controllers/MyUserController";
import auth from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
const router = express.Router();

router.get("/", auth.jwtCheck, auth.jwtParse, MyUserController.getCurrentUser);
router.post("/", auth.jwtCheck, MyUserController.createCurrentUser);
router.put("/", auth.jwtCheck, auth.jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);

export default router;