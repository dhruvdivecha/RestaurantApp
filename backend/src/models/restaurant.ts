import mongoose from "mongoose"

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
})

const restaurantSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId },
    restaurantName: { type: String, required: true },
    orderPrice: { type: Number, required: true },
    address: { type: String, required: true },
    cuisine: [{ type: String, required: true }],
    menuItems: [menuItemSchema],
    estimatedDeliveryTime: { type: Number, required: true },
    lastUpdated: { type: Date, required: true },
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

export default Restaurant
