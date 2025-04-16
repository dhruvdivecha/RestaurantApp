import { Request, Response } from "express";
import MenuItem from "../models/menu";

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
        owner: req.userId, 
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

