import { Request, Response } from "express";
import Order from "../models/order";
import { io } from "../index";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Fetching orders from database...");
    const orders = await Order.find().sort({ createdAt: -1 });

    
    if (!orders || orders.length === 0) {
      console.log("No orders found in database");
    }
    
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ 
      message: "Failed to fetch orders",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const placeOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Received order request:", req.body);
    const { items, totalAmount } = req.body;

    // Validate request body
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log("Invalid items array");
      res.status(400).json({ message: "Items must be a non-empty array" });
      return;
    }

    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      console.log("Invalid total amount");
      res.status(400).json({ message: "Total amount must be a positive number" });
      return;
    }

    // Check for duplicate orders in the last 5 seconds
    const fiveSecondsAgo = new Date(Date.now() - 5000);
    const recentOrders = await Order.find({
      createdAt: { $gte: fiveSecondsAgo },
      totalAmount: totalAmount,
      "items.name": { $all: items.map(item => item.name) }
    });

    if (recentOrders.length > 0) {
      console.log("Duplicate order detected");
      res.status(400).json({ message: "Duplicate order detected. Please wait a moment before trying again." });
      return;
    }

    // Create the order
    console.log("Creating new order...");
    const order = await Order.create({
      items: items.map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        category: item.category
      })),
      totalAmount,
      status: "pending",
    });
    console.log("Order created successfully:", order);

    // Emit to connected kitchen staff
    console.log("Emitting newOrder event...");
    io.of("/kitchen").emit("newOrder", order);
    console.log("newOrder event emitted");

    // Respond with the new order
    res.status(201).json(order);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ 
      message: "Failed to place order",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};