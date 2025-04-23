import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { Button } from "../components/ui/button";

const OrderStatus = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-white mb-12">
        Your Order
      </h1>
      <Link to="/usermenu" className="justify-end">
        <Button>Back to Menu</Button>
      </Link>

      <div className="max-w-2xl mx-auto">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-300">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => removeFromCart(item._id || "")}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Button onClick={clearCart}>Clear Cart</Button>
              <Button>Checkout</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
