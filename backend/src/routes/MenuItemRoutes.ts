import express from "express";
import auth from "../middleware/auth";
import { createMenuItems } from "../controllers/MenuItemController";

const router = express.Router();

// POST /api/my/menu
router.post("/", auth.jwtCheck, auth.jwtParse, createMenuItems);

export default router; 