import { Router } from "express";
import { placeOrder, getOrders, deleteOrder } from "../controllers/KitchenController";
import auth from "../middleware/auth";
const router = Router();

// GET /api/kitchen/orders
router.get("/orders", auth.jwtCheck, auth.jwtParse, getOrders);


// POST /api/kitchen/orders
router.post("/orders", placeOrder);

// DELETE /api/kitchen/orders/:id
router.delete("/orders/:id", auth.jwtCheck, auth.jwtParse, deleteOrder);

export default router;
