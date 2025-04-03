import express from "express";
import { 
    getMenuItems, 
    updateMenuItem, 
    createMenuItem, 
    deleteMenuItem 
} from "../controller/MenuItem.controller"; 

const router = express.Router();

router.get("/", getMenuItems);
router.put("/:id", updateMenuItem);
router.post("/", createMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;