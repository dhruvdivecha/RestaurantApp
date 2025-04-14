import { Request, Response } from "express"
import Restaurant from "../models/restaurant"
import cloudinary from "cloudinary"
import mongoose from "mongoose"

const CreateMyRestaurant = async (req: Request, res: Response) => {
    try {
        const createRestaurant = await Restaurant.findOne({ user: req.userId })
        if (createRestaurant) {
            res.status(400).json({ message: "Restaurant already exists" })
            return
        }


        const image = req.file as Express.Multer.File
        const base64Image = image.buffer.toString('base64')
        const dataURI = `data:${image.mimetype};base64,${base64Image}`

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
            resource_type: "auto",
            folder: "restaurants",
        })
        const restaurant = new Restaurant(req.body)
        restaurant.user = new mongoose.Types.ObjectId(req.userId)
        restaurant.lastUpdated = new Date();

        await restaurant.save()
        res.status(201).json(restaurant)
    } catch (error) {
        res.status(500).json({ message: "Error creating restaurant" })
    }
}
export default { CreateMyRestaurant }

