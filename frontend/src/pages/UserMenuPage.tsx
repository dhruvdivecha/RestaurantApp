import { useState, useEffect } from "react";
import { useGetMenuItems } from "@/api/MyUserApi";
import { MenuItem } from "@/types/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, ShoppingCart } from "lucide-react";
import Cart from "@/components/CartInMenu";
import CategoryFilter from "@/components/CategoryFilter";
import { useNavigate } from "react-router-dom";

export default function UserMenuPage() {
  const { menuItems, isLoadingMenuItems } = useGetMenuItems();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => [...prev, item]);
    toast.success("Added to cart", {
      position: "top-center",
      style: {
        background: "#1f2937",
        color: "#fff",
        border: "1px solid #374151",
      },
    });
  };

  const removeFromCart = (itemToRemove: MenuItem) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== itemToRemove._id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty", {
        position: "top-center",
        style: {
          background: "#1f2937",
          color: "#fff",
          border: "1px solid #374151",
        },
      });
      return;
    }
    navigate("/checkout", { state: { cartItems } });
  };

  if (isLoadingMenuItems) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0A0F1D]">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl bg-cyan-500/20 animate-pulse" />
          <Loader2 className="h-12 w-12 animate-spin text-cyan-400 relative" />
        </div>
      </div>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0A0F1D]">
        <div className="text-center space-y-4 relative">
          <div className="absolute inset-0 blur-3xl bg-cyan-500/10 -z-10" />
          <p className="text-2xl font-semibold text-gray-200">
            No menu items available
          </p>
          <p className="text-cyan-300/80">
            Check back later for our delicious offerings
          </p>
        </div>
      </div>
    );
  }

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter(
          (item: MenuItem) => item.category === selectedCategory
        );

  return (
    <div className="min-h-screen bg-[#0A0F1D] py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-cyan-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Header */}
        <div className="text-center mb-20 space-y-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              Our Menu
            </h1>
            <div className="absolute -top-8 -left-8 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50" />
            <div className="absolute -bottom-8 -right-8 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated selection of dishes, prepared with
            the finest ingredients
          </p>
          <div className="w-40 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 mx-auto rounded-full mt-8 shadow-[0_0_15px_rgba(34,211,238,0.5)] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 blur-sm" />
          </div>
        </div>

        {/* Cart Component */}
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          onCheckout={handleCheckout}
        />

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          menuItems={menuItems}
        />

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item: MenuItem) => (
            <div key={item._id} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="relative bg-gray-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-800/50 transition-all duration-500 hover:-translate-y-1">
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-cyan-400/30" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-cyan-400/30" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-cyan-400/30" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-cyan-400/30" />

                <div className="h-full flex flex-col justify-between min-h-[220px]">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-100 group-hover:text-cyan-50 transition-colors">
                      {item.name}
                    </h2>
                    <span className="inline-block text-sm px-4 py-1.5 bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/20 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] transition duration-300">
                      {item.category}
                    </span>
                    <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300">
                      TZS {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="relative mt-8 group/btn">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-sm opacity-0 group-hover/btn:opacity-100 transition duration-500" />
                    <Button
                      className="relative w-full bg-gradient-to-r from-cyan-500/90 to-blue-500/90 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden group-hover/btn:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                      onClick={() => addToCart(item)}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <ShoppingCart className="h-5 w-5 opacity-85 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-[-8deg]" />
                        Add to Cart
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-45 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
