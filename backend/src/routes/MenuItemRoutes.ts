import express from "express";
import auth from "../middleware/auth";
import { createMenuItems, getMenuItems, deleteMenuItem, updateMenuItem } from "../controllers/MenuItemController";

const router = express.Router();

// POST /api/my/menu
router.post("/", auth.jwtCheck, auth.jwtParse, createMenuItems);

router.get("/", auth.jwtCheck, auth.jwtParse, getMenuItems);

router.delete("/:id", auth.jwtCheck, auth.jwtParse, deleteMenuItem);

router.put("/:id", auth.jwtCheck, auth.jwtParse, updateMenuItem);

export default router; 