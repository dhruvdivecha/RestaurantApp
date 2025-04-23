import express from "express";
import { getPublicMenuItems } from "../controllers/MenuItemController";

const router = express.Router();

router.get("/", getPublicMenuItems);

export default router;