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

const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();
const httpServer = http.createServer(app);

// Configure CORS for both Express and Socket.IO
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Configure Socket.IO with CORS
export const io = new IOServer(httpServer, { 
  cors: { 
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

io.of("/kitchen").on("connection", (socket) => {
  console.log("Kitchen staff connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Kitchen staff disconnected:", socket.id);
  });
});

app.use(express.json());

// routers
app.use("/api/my/user", myUserRouter);
app.use("/api/my/menu", menuItemRouter);
app.use("/api/my/usermenu", userMenuRouter);
app.use("/api/my/kitchen", kitchenRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to DB");
    httpServer.listen(PORT, () => {
      console.log(`Server + Socket.IO listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
