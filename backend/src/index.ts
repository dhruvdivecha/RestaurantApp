import express, { Response, Request} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myUserRouter from "./routes/MyUserRoutes"

const uri = process.env.MONGO_URI;
   if (!uri) {
     throw new Error('MONGODB_URI is not defined in environment variables');
   }

mongoose
.connect(uri as string)
.then(() => console.log("Connected to DB"))

const app = express();
const PORT = 4000;

app.use(express.json()) //converts body into json data 
app.use(cors())

app.use("/api/my/user", myUserRouter)

app.listen(PORT, ()=> {
    console.log(`server started on http://localhost:${PORT}`)
})
