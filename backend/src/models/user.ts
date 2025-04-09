import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        reuired: true,
        unique: true,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    }
})

const User = mongoose.model("User", userSchema)

export default User;