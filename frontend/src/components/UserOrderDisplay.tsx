import { useEffect } from "react";
import useKitchenOrders from "@/api/MyKitchenOrders";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UserOrderDisplay = () => {
  const { orders, isLoading, deleteOrder, refreshOrders } = useKitchenOrders();

  useEffect(() => {
    refreshOrders();
  }, []);

  const handleDelete = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      // Wait for the delete operation to complete before refreshing
      await refreshOrders();
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
  };

  if (isLoading) return <div>Loading orders...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kitchen Orders</h1>
      {orders.length === 0 ? (
        <div>No active orders</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={`order-${order._id}`} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <Button
                  onClick={() => handleDelete(order._id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
              <div className="space-y-2">
                {order.items?.map((item) => (
                  <div
                    key={`item-${item._id}`}
                    className="flex justify-between"
                  >
                    <span>{item.name}</span>
                    <span>TZS {item.price?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>TZS {order.totalAmount?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderDisplay;
