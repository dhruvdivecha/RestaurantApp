import { useGetMenuItems } from "@/api/MyRestaurantApi";
import { MenuItem } from "@/types/types";
import { Separator } from "@/components/ui/separator";
export default function MenuItemsSection() {
  const { menuItems, isLoadingMenuItems } = useGetMenuItems();

  if (isLoadingMenuItems) {
    return <div>Loading...</div>;
  }

  if (!menuItems || menuItems.length === 0) {
    return <div>No menu items available.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Menu Items</h2>
      <Separator className="bg-gray-700" />
      <div className="space-y-4">
        {menuItems.map((item: MenuItem) => (
          <div key={item._id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-gray-400">${item.price.toFixed(2)}</p>
            <p className="text-gray-400">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
