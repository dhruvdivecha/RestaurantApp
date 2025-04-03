import express from "express"
import { Request, Response } from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db";
import MenuItemRoutes from "./routes/MenuItem.routes"; 

dotenv.config()

const app = express();
const PORT = process.env.PORT || 4000

app.use("/api/menuItems", MenuItemRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running")
})

app.listen(PORT, () => {
    connectDB()
    console.log(`server started at http://localhost:${PORT}`)
})