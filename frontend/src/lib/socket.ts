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
  transports: ["websocket"],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Connection management
export const connectToKitchen = () => {
  try {
    kitchenSocket.connect();
    console.log("Connecting to kitchen socket...");
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

// Add these to your existing socket functions
export const onOrderDeleted = (callback: (deletedOrderId: string) => void) => {
  kitchenSocket.on("order-deleted", callback);
};

export const offOrderDeleted = (callback: (deletedOrderId: string) => void) => {
  kitchenSocket.off("order-deleted", callback);
};