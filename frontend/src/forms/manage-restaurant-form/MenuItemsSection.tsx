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
import { Pencil, Trash2, Loader2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { getUniqueCategories } from "@/utils/categoryUtils";

export default function MenuItemsSection() {
  const { menuItems, isLoadingMenuItems } = useGetMenuItems();
  const { updateMenuItemMutate, isUpdatingMenuItem } = useUpdateMenuItem();
  const { deleteMenuItemMutate, isDeletingMenuItem } = useDeleteMenuItem();
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (isLoadingMenuItems) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="text-gray-400 text-center p-8">
        No menu items available.
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent, itemId: string) => {
    e.preventDefault();
    if (!editingItem) return;

    const updatedItem = {
      name: editingItem.name,
      price: editingItem.price,
      category: editingItem.category,
    };

    updateMenuItemMutate({ id: itemId, menuItem: updatedItem });
    setEditingItem(null);
  };

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter(
          (item: MenuItem) => item.category === selectedCategory
        );

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Menu Items</h2>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="text-white hover:bg-gray-700 px-4 py-2 rounded text-left"
            >
              {selectedCategory} <ChevronDown className="ml-2 h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="bg-gray-800 border-gray-700 p-4 space-y-3">
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="text-white hover:bg-gray-700 px-4 py-2 rounded text-left"
                onClick={() => setSelectedCategory("All")}
              >
                All
              </button>
              {getUniqueCategories(menuItems).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className="text-white hover:bg-gray-700 px-4 py-2 rounded text-left"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Separator className="bg-gray-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item: MenuItem) => (
          <div
            key={item._id}
            className="bg-[#1e2530] p-4 rounded-lg shadow-lg border border-gray-700 hover:border-blue-500 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <p className="text-blue-400 font-medium">
                  TSH {item.price.toLocaleString()}
                </p>
                <span className="inline-block px-2 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                  {item.category}
                </span>
              </div>

              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 border-gray-700 p-4 space-y-3">
                    <form
                      onSubmit={(e) => item._id && handleSubmit(e, item._id)}
                    >
                      <div className="space-y-3">
                        <Input
                          name="name"
                          value={editingItem?.name || item.name}
                          onChange={(e) =>
                            setEditingItem({
                              ...item,
                              name: e.target.value,
                            })
                          }
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                        <Input
                          name="price"
                          type="number"
                          value={editingItem?.price || item.price}
                          onChange={(e) =>
                            setEditingItem({
                              ...item,
                              price: parseFloat(e.target.value),
                            })
                          }
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                        <Input
                          name="category"
                          value={editingItem?.category || item.category}
                          onChange={(e) =>
                            setEditingItem({
                              ...item,
                              category: e.target.value,
                            })
                          }
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isUpdatingMenuItem}
                        >
                          {isUpdatingMenuItem ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </div>
                    </form>
                  </PopoverContent>
                </Popover>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => item._id && deleteMenuItemMutate(item._id)}
                  disabled={isDeletingMenuItem}
                >
                  {isDeletingMenuItem ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
