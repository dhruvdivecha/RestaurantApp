import { Router } from "express";
import { placeOrder, getOrders, deleteOrder } from "../controllers/KitchenController";

const router = Router();

// GET /api/kitchen/orders
router.get("/orders", getOrders);

// POST /api/kitchen/orders
router.post("/orders", placeOrder);

// DELETE /api/kitchen/orders/:id
router.delete("/orders/:id", deleteOrder);

export default router;
