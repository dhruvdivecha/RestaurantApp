import express, { Response, Request} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myUserRouter from "./routes/MyUserRoutes"
import myRestaurantRouter from "./routes/MyRestaurantRoute"
import cloudinary from "cloudinary"

const uri = process.env.MONGO_URI;
   if (!uri) {
     throw new Error('MONGODB_URI is not defined in environment variables');
   }

mongoose
.connect(uri as string)
.then(() => console.log("Connected to DB"))

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();
const PORT = 4000;

app.use(express.json()) //converts body into json data 
app.use(cors())

app.use("/api/my/user", myUserRouter)
app.use("/api/my/restaurant", myRestaurantRouter)

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ message: "OK" })
})

app.listen(PORT, ()=> {
    console.log(`server started on http://localhost:${PORT}`)
})
