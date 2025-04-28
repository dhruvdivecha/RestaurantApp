import { Request, Response } from "express"
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { auth0Id, email, name } = req.body;
        
        if (!auth0Id || !email || !name) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        // Check if user exists
        const existingUser = await User.findOne({ auth0Id });
        if (existingUser) {
            // For login flow, just return the existing user
            res.status(200).json(existingUser.toObject());
            return;
        }

        // Create new user with minimal required info
        const newUser = new User({
            auth0Id,
            email,
            name
        });

        await newUser.save();
        res.status(201).json(newUser.toObject());
        
    } catch (error) {
        console.error('Error in createCurrentUser:', error);
        res.status(500).json({ message: "Error creating user" });
    }
}

const updateCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, address, phoneNumber } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.name = name;
        user.address = address;
        user.phoneNumber = phoneNumber;
        await user.save();

        res.send(user);
        
    } catch (error) {
        console.error('Error in updateCurrentUser:', error);
        res.status(500).json({ message: "Error updating user" });
    }
}

const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.send(user);
    } catch (error) {
        console.error('Error in getCurrentUser:', error);
        res.status(500).json({ message: "Error getting user" });
    }   
}

export default { createCurrentUser, updateCurrentUser, getCurrentUser }