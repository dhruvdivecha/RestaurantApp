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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useKitchenOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/my/kitchen/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/my/kitchen/orders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
      setOrders((prev) => [order, ...prev]);
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

  return {
    orders,
    isLoading,
    deleteOrder,
    refreshOrders: getOrders,
  };
};

export default useKitchenOrders;
