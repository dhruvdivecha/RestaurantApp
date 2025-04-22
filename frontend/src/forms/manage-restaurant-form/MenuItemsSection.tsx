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
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

export default function MenuItemsSection() {
  const { menuItems, isLoadingMenuItems } = useGetMenuItems();
  const { updateMenuItemMutate } = useUpdateMenuItem();
  const { deleteMenuItemMutate, isDeletingMenuItem } = useDeleteMenuItem();
  const formRef = useRef<HTMLFormElement>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  if (isLoadingMenuItems) {
    return (
      <div>
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Menu Items</h2>
      <Separator className="bg-gray-700" />
      <div className="space-y-5">
        {menuItems.map((item: MenuItem) => (
          <div
            key={item._id}
            className="bg-[#1e2530] p-5 rounded-xl shadow-sm border border-gray-700 flex justify-between items-start"
          >
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">{item.name}</h3>
              <p className="text-sm text-gray-400">
                TSH {item.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 italic">{item.category}</p>
            </div>

            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setEditingItem(item)}
                    className="hover:bg-blue-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-[#ffffff] border border-gray-700 p-4 rounded-lg w-64 space-y-3">
                  <form
                    ref={formRef}
                    onSubmit={(e) => item._id && handleSubmit(e, item._id)}
                    className="space-y-3"
                  >
                    <Input
                      name="name"
                      defaultValue={editingItem?.name || ""}
                      placeholder="Item name"
                    />
                    <Input
                      name="price"
                      type="number"
                      defaultValue={editingItem?.price?.toString() || ""}
                      placeholder="Price"
                    />
                    <Input
                      name="category"
                      defaultValue={editingItem?.category || ""}
                      placeholder="Category"
                    />
                    <Button type="submit" className="w-full">
                      Save
                    </Button>
                  </form>
                </PopoverContent>
              </Popover>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => item._id && deleteMenuItemMutate(item._id)}
                disabled={isDeletingMenuItem}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
