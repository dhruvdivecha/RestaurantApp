import express from "express";
import MyUserController from "../controllers/MyUserController";
import auth from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
const router = express.Router();

// Get current user - requires full auth
router.get("/", auth.jwtCheck, auth.jwtParse, MyUserController.getCurrentUser);

// Create/register user - only requires valid token
router.post("/", auth.jwtCheck, MyUserController.createCurrentUser);

// Update user - requires full auth and validation
router.put("/", auth.jwtCheck, auth.jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);

export default router;