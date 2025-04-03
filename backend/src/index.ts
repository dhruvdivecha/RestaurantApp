import express, { Response, Request} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"

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

app.get("/test", async(req: Request, res: Response) => {
    res.json({message: "hello"})
})

app.listen(PORT, ()=> {
    console.log(`server started on http://localhost:${PORT}`)
})
