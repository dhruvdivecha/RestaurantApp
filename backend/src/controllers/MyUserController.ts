import { Request, Response } from "express"
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { auth0Id, name, address, phoneNumber } = req.body;
        const user = await User.findOne({ auth0Id })

        if(user){
            res.status(200).send();
            return;
        }

        const newUser = new User({
            auth0Id,
            name,
            address,
            phoneNumber
        })
        await newUser.save()
        res.status(201).json(newUser.toObject());
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error creating user"});
    }
}

const updateCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, address, phoneNumber } = req.body;
        const user = await User.findById(req.userId)

        if(!user){
            res.status(404).json({message: "User not found"});
            return;
        }

        user.name = name;
        user.address = address;
        user.phoneNumber = phoneNumber;
        await user.save();

        res.send(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error updating user"});
    }
}

const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.userId)
        if(!user){
            res.status(404).json({message: "User not found"});
            return;
        }
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error getting user"});
    }   
}


export default {createCurrentUser, updateCurrentUser, getCurrentUser}