import express from "express"
import { Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000

app.get("/", (req: Request, res: Response) => {
    res.send("Server is ready")
})

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})