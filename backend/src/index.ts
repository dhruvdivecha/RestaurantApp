import express, { Response, Request} from "express"
import cors from "cors"
import "dotenv/config"

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
