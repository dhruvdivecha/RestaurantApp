import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

interface Order {
  _id: string;
  items: Array<{
    _id: string;
    name: string;
    price: number;
    category: string;
  }>;
  totalAmount: number;
  status: "pending" | "preparing" | "ready" | "completed";
  createdAt: string;
}

export const kitchenSocket = io(`${API_BASE_URL}/kitchen`, {
  transports: ["websocket", "polling"],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  withCredentials: true
});

// Connection management
export const connectToKitchen = () => {
  try {
    kitchenSocket.connect();
    console.log("Connecting to kitchen socket...");

    kitchenSocket.on("connect", () => {
      console.log("Connected to kitchen socket:", kitchenSocket.id);
    });

    kitchenSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    kitchenSocket.on("disconnect", (reason) => {
      console.log("Disconnected from kitchen socket. Reason:", reason);
      if (reason === "io server disconnect" || reason === "transport close") {
        // try to reconnect
        kitchenSocket.connect();
      }
    });

  } catch (error) {
    console.error("Error connecting to kitchen socket:", error);
  }
};

export const disconnectFromKitchen = () => {
  try {
    kitchenSocket.disconnect();
    console.log("Disconnected from kitchen socket");
  } catch (error) {
    console.error("Error disconnecting from kitchen socket:", error);
  }
};

// Event handlers
export const onNewOrder = (callback: (order: Order) => void) => {
  kitchenSocket.on("newOrder", (order) => {
    console.log("Received new order:", order);
    callback(order);
  });
};

export const offNewOrder = (callback: (order: Order) => void) => {
  kitchenSocket.off("newOrder", callback);
};

// socket functions
export const onOrderDeleted = (callback: (deletedOrderId: string) => void) => {
  kitchenSocket.on("order-deleted", callback);
};

export const offOrderDeleted = (callback: (deletedOrderId: string) => void) => {
  kitchenSocket.off("order-deleted", callback);
};