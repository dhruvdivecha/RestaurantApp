import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ShoppingCart, Trash2 } from "lucide-react";
import { MenuItem } from "@/types/types";

interface CartProps {
  cartItems: MenuItem[];
  removeFromCart: (item: MenuItem) => void;
  clearCart: () => void;
  onCheckout: () => void;
}

export default function Cart({
  cartItems,
  removeFromCart,
  clearCart,
  onCheckout,
}: CartProps) {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <button className="relative group bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ShoppingCart className="h-6 w-6 text-cyan-400 relative z-10 transition-transform duration-300 group-hover:scale-110" />
            {cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)] animate-in zoom-in-50 duration-300">
                {cartItems.length}
              </div>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-gray-900/90 backdrop-blur-xl border-gray-700/50 rounded-xl p-6 w-96 shadow-[0_0_25px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in-95"
          align="end"
          sideOffset={12}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Your Cart
              </h3>
              {cartItems.length > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearCart}
                  className="text-red-400/80 hover:text-red-300 text-sm hover:bg-red-500/10 transition-colors"
                >
                  Clear All
                </Button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <ShoppingCart className="h-12 w-12 text-gray-500 mx-auto" />
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                  {cartItems.map((item, index) => (
                    <div
                      key={`${item._id}-${index}`}
                      className="group flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <div className="flex-1">
                        <h4 className="text-gray-200 font-medium group-hover:text-cyan-50 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-cyan-400 text-sm">
                          TZS {item.price.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => removeFromCart(item)}
                        className="text-red-400/80 hover:text-red-300 p-2 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-700/50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">Total:</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      TZS {getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Button
                      onClick={onCheckout}
                      className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 rounded-lg transition-colors"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
