import express from "express";
import MyUserController from "../controllers/MyUserController";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", auth.jwtCheck, MyUserController.createCurrentUser);
router.put("/", auth.jwtCheck, auth.jwtParse, MyUserController.updateCurrentUser);

export default router;