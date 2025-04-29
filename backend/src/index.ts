import express, { Response, Request} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myUserRouter from "./routes/MyUserRoutes"
import menuItemRouter from "./routes/MenuItemRoutes"
import userMenuRouter from "./routes/UserMenuRoutes"
import http from "http"
import { Server as IOServer } from "socket.io"
import kitchenRoutes from "./routes/KitchenRoutes"

const uri = process.env.MONGO_URI;
   if (!uri) {
     throw new Error('MONGODB_URI is not defined in environment variables');
   }

mongoose
.connect(uri as string)
.then(() => console.log("Connected to DB"))

const app = express();
const httpServer = http.createServer(app);
// Allows your React front-end origin to connect
export const io = new IOServer(httpServer, { cors: { origin: "*" } });

const PORT = 4000;

io.of("/kitchen").on("connection", (socket) => {
  console.log("Kitchen staff connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Kitchen staff disconnected:", socket.id);
  });
});

// strip the dangerous React-Router headers
app.use((req: Request, res: Response, next) => {
  delete (req.headers as any)['x-react-router-prerender-data'];
  delete (req.headers as any)['x-react-router-spa-mode'];
  next();
});

// cors
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// routers
app.use("/api/my/user", myUserRouter);
app.use("/api/my/menu", menuItemRouter);
app.use("/api/my/usermenu", userMenuRouter);
app.use("/api/my/kitchen", kitchenRoutes);


// Health check & listener
app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

httpServer.listen(PORT, () =>
  console.log(`Server + Socket.IO listening on port ${PORT}`)
);
