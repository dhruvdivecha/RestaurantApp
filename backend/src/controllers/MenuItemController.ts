import { Request, Response } from "express";
import MenuItem from "../models/menu";
import mongoose from "mongoose";

export const getMenuItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
  } catch (error) {
    console.error("Error getting menu items:", error);
    res.status(500).json({ message: "Failed to get menu items" });
  }
};

export const createMenuItems = async (req: Request, res: Response): Promise<void> => {
  console.log("Received request to create menu items:", req.body);

  try {
    const { menuItems } = req.body;

    if (!Array.isArray(menuItems) || menuItems.length === 0) {
      res.status(400).json({ message: "menuItems must be a non-empty array" });
      return;
    }

    const itemsToInsert = menuItems.map((item) => {
      const { name, price, category } = item;

      if (
        typeof name !== "string" ||
        typeof price !== "number" ||
        price < 0 ||
        typeof category !== "string"
      ) {
        throw new Error("Invalid item format");
      }

      return {
        name,
        price,
        category,
      };
    });

    const createdItems = await MenuItem.insertMany(itemsToInsert);

    res.status(201).json({
      message: "Menu items created successfully",
      menuItems: createdItems,
    });
  } catch (error) {
    console.error("Error creating menu items:", error);
    res.status(500).json({ message: "Failed to create menu items" });
  }
};

export const deleteMenuItem = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Invalid product ID" });
        return;
    }
    
    try {
        await MenuItem.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Product deletion failed", 
            error: error instanceof Error ? error.message : "Unknown error" 
        });
    }
};

export const updateMenuItem = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const menuItem = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Invalid product ID" });
        return;
    }

    try {
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, menuItem, { new: true });
        res.status(200).json({ 
            success: true, 
            message: "Product updated successfully", 
            data: updatedMenuItem 
        });
    } catch (error) {
        res.status(404).json({ 
            success: false, 
            message: "Product not found", 
            error: error instanceof Error ? error.message : "Unknown error" 
        });
    }
};

export const getPublicMenuItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
  } catch (error) {
    console.error("Error getting public menu items:", error);
    res.status(500).json({ message: "Failed to get menu items" });
  }
};