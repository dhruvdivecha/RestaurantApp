import MenuItem, { IMenuItem } from "../model/MenuItem.model";
import mongoose from "mongoose";
import { Request, Response } from "express";

const newMenuItem: IMenuItem = new MenuItem({
    name: "Pizza",
    price: 12.99,
    image: "https://example.com/pizza.jpg",
    category: "main"
});

export const getMenuItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json({ success: true, data: menuItems });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch menu items", 
            error: message 
        });
    }
};

export const updateMenuItem = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates: Partial<IMenuItem> = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ success: false, message: "Invalid menu item ID" });
    }

    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(id, updates, { 
            new: true,
            runValidators: true
        });

        if (!updatedItem) {
            res.status(404).json({ success: false, message: "Menu item not found" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Menu item updated successfully", 
            data: updatedItem 
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ 
            success: false, 
            message: "Failed to update menu item", 
            error: message 
        });
    }
};

export const createMenuItem = async (req: Request, res: Response):  Promise<void> => {
    const { name, price, image, category }: IMenuItem = req.body;

    if (!name || !price || !image || !category) {
        res.status(400).json({ 
            success: false, 
            message: "Please provide name, price, image, and category" 
        });
    }

    try {
        const newMenuItem = new MenuItem({
            name,
            price,
            image,
            category,
            description: req.body.description || ""
        });

        await newMenuItem.save();
        res.status(201).json({ 
            success: true, 
            message: "Menu item created successfully", 
            data: newMenuItem 
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ 
            success: false, 
            message: "Menu item creation failed", 
            error: message 
        });
    }
};

export const deleteMenuItem = async (req: Request, res: Response):  Promise<void> => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ success: false, message: "Invalid menu item ID" });
    }

    try {
        const deletedItem = await MenuItem.findByIdAndDelete(id);
        
        if (!deletedItem) {
            res.status(404).json({ 
                success: false, 
                message: "Menu item not found" 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: "Menu item deleted successfully" 
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ 
            success: false, 
            message: "Failed to delete menu item", 
            error: message 
        });
    }
};