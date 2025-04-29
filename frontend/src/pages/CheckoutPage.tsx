import { useLocation, useNavigate } from "react-router-dom";
import { MenuItem } from "@/types/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = location.state as { cartItems: MenuItem[] };
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmOrder = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // Validate cart items
      if (!cartItems || cartItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      // Validate total
      if (total <= 0) {
        toast.error("Invalid order total");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/my/kitchen/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            _id: item._id,
            name: item.name,
            price: item.price,
            category: item.category,
          })),
          totalAmount: total,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order");
      }

      // Clear cart from localStorage
      localStorage.removeItem("cartItems");

      toast.success("Order sent to kitchen!", {
        position: "top-center",
        style: {
          background: "#1f2937",
          color: "#fff",
          border: "1px solid #374151",
        },
      });

      navigate("/usermenu");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to place order. Please try again.",
        {
          position: "top-center",
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1D] py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 max-w-4xl relative">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-8 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>

        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800/50 p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-gray-800/50 p-4 rounded-xl"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="text-cyan-400">
                    TZS {item.price.toLocaleString()}
                  </p>
                </div>
                <span className="text-gray-400">{item.category}</span>
              </div>
            ))}

            <div className="border-t border-gray-800 pt-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl text-gray-400">Total Amount:</span>
                <span className="text-2xl font-bold text-cyan-400">
                  TZS {total.toLocaleString()}
                </span>
              </div>

              <Button
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 rounded-xl transition-colors"
                onClick={handleConfirmOrder}
                disabled={isLoading}
              >
                {isLoading ? "Sending Order..." : "Confirm Order to Kitchen"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
