import { useGetMenuItems } from "../api/MyUserApi";
import { Loader2 } from "lucide-react";
import { MenuItem } from "../types/types";
import { Button } from "../components/ui/button";
import { useCart } from "../components/CartContext";

const UserMenuPage = () => {
  const { menuItems, isLoadingMenuItems } = useGetMenuItems();
  const { addToCart } = useCart();

  if (isLoadingMenuItems) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-white mb-12">
        Our Menu
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuItems.map((item: MenuItem) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-400 italic mb-2">{item.category}</p>
              <p className="text-lg font-medium text-blue-600">
                $
                {typeof item.price === "number"
                  ? item.price.toLocaleString()
                  : item.price}
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMenuPage;
