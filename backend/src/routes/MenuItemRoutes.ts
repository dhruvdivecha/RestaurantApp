import express from "express";
import auth from "../middleware/auth";
import { createMenuItems, getMenuItems } from "../controllers/MenuItemController";

const router = express.Router();

// POST /api/my/menu
router.post("/", auth.jwtCheck, auth.jwtParse, createMenuItems);

router.get("/", auth.jwtCheck, auth.jwtParse, getMenuItems);

export default router; 