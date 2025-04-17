import {
  useGetMenuItems,
  useUpdateMenuItem,
  useDeleteMenuItem,
} from "@/api/MyRestaurantApi";
import { MenuItem } from "@/types/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export default function MenuItemsSection() {
  const { menuItems, isLoadingMenuItems } = useGetMenuItems();
  const { updateMenuItemMutate } = useUpdateMenuItem();
  const { deleteMenuItemMutate, isDeletingMenuItem } = useDeleteMenuItem();
  const formRef = useRef<HTMLFormElement>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  if (isLoadingMenuItems) {
    return <div>Loading...</div>;
  }

  if (!menuItems || menuItems.length === 0) {
    return <div>No menu items available.</div>;
  }

  const handleSubmit = (e: React.FormEvent, itemId: string) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const updatedItem = {
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
    };

    updateMenuItemMutate({ id: itemId, menuItem: updatedItem });
  };

  if (isLoadingMenuItems) return <div>Loading...</div>;
  if (!menuItems?.length) return <div>No menu items available.</div>;

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
            <div className="flex justify-end">
              <Popover>
                <PopoverTrigger onClick={() => setEditingItem(item)}>
                  <Button>
                    <Pencil />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <form
                    ref={formRef}
                    onSubmit={(e) => item._id && handleSubmit(e, item._id)}
                  >
                    <Input name="name" defaultValue={editingItem?.name || ""} />
                    <Input
                      name="price"
                      type="number"
                      defaultValue={editingItem?.price?.toString() || ""}
                    />
                    <Input
                      name="category"
                      defaultValue={editingItem?.category || ""}
                    />
                    <Button type="submit">Save</Button>
                  </form>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => item._id && deleteMenuItemMutate(item._id)}
                disabled={isDeletingMenuItem}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
