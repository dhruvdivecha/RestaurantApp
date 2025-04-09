import { Request, Response } from "express"
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {

    try {
        const { auth0Id } = req.body;
        const user = await User.findOne({ auth0Id })

        if(user){
            res.status(200).send()
        }

        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).json(newUser.toObject())
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error creating user"})
    }
}

export default {createCurrentUser}