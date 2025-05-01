import { useEffect, useState } from "react";
import useKitchenOrders from "@/api/MyKitchenOrders";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const UserOrderDisplay = () => {
  const { orders, isLoading, deleteOrder, refreshOrders } = useKitchenOrders();
  const [optimisticDeletes, setOptimisticDeletes] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    refreshOrders();
  }, []);

  const handleDelete = async (orderId: string) => {
    try {
      // Immediately update UI
      setOptimisticDeletes((prev) => new Set(prev).add(orderId));

      // Wait for actual deletion
      await deleteOrder(orderId);

      // Refresh data quietly in background
      await refreshOrders();

      // Remove from optimistic state
      setOptimisticDeletes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });

      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      // Roll back UI if error occurs
      setOptimisticDeletes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });

      toast.error("Failed to delete order");
    }
  };

  // Filter out optimistically deleted orders
  const visibleOrders = orders.filter(
    (order) => !optimisticDeletes.has(order._id)
  );

  if (isLoading) return <div>Loading orders...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kitchen Orders</h1>
      {visibleOrders.length === 0 ? (
        <div>No active orders</div>
      ) : (
        <div className="space-y-4">
          {visibleOrders.map((order) => (
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
                  disabled={optimisticDeletes.has(order._id)}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 cursor-pointer"
                >
                  {optimisticDeletes.has(order._id) ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    "Delete"
                  )}
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
