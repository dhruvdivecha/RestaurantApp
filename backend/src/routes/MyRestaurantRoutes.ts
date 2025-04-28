import express from "express";
import { validateMenuItemRequest } from "../middleware/validation";
import { 
  createMenuItems, 
  getMenuItems, 
  deleteMenuItem, 
  updateMenuItem
} from "../controllers/MenuItemController";
import auth from "../middleware/auth";

const router = express.Router();

// Apply JWT middleware to all routes
router.use(auth.jwtCheck, auth.jwtParse);

// Menu management
router.get("/menu", getMenuItems);
router.post("/menu", validateMenuItemRequest, createMenuItems);
router.delete("/menu/:id", deleteMenuItem);
router.put("/menu/:id", updateMenuItem);

export default router; 