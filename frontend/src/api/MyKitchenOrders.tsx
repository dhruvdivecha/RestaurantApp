import { useEffect, useState } from "react";
import {
  connectToKitchen,
  disconnectFromKitchen,
  onNewOrder,
  offNewOrder,
  onOrderDeleted,
  offOrderDeleted,
  kitchenSocket,
} from "../lib/socket";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";

export interface Order {
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
  table?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useKitchenOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/kitchen/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch orders"
      );
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrder = async (orderId: string) => {
    const token = await getAccessTokenSilently();
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/my/kitchen/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      // Update local state immediately
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );

      // Emit deletion event using kitchenSocket
      kitchenSocket.emit("orderDeleted", orderId);

      return true;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  };

  useEffect(() => {
    getOrders();
    connectToKitchen();

    const handleNewOrder = (order: Order) => {
      setOrders((prev) => {
        // Check if order already exists
        const orderExists = prev.some(
          (existingOrder) => existingOrder._id === order._id
        );
        if (orderExists) {
          return prev;
        }
        return [order, ...prev];
      });
    };

    const handleOrderDeleted = (deletedOrderId: string) => {
      setOrders((prev) => prev.filter((order) => order._id !== deletedOrderId));
    };

    onNewOrder(handleNewOrder);
    onOrderDeleted(handleOrderDeleted);

    return () => {
      offNewOrder(handleNewOrder);
      offOrderDeleted(handleOrderDeleted);
      disconnectFromKitchen();
    };
  }, []);

  // Add a new useEffect to handle refreshOrders
  useEffect(() => {
    if (orders.length > 0) {
      // Remove duplicate orders based on _id
      const uniqueOrders = orders.filter(
        (order, index, self) =>
          index === self.findIndex((o) => o._id === order._id)
      );

      if (uniqueOrders.length !== orders.length) {
        setOrders(uniqueOrders);
      }
    }
  }, [orders]);

  return {
    orders,
    isLoading,
    deleteOrder,
    refreshOrders: getOrders,
  };
};

export default useKitchenOrders;
