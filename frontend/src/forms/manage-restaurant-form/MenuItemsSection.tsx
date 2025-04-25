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
import { Pencil, Trash2, Loader2, ChevronDown, Check } from "lucide-react";
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
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Menu Management
        </h2>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg hover:border-blue-500 transition-all"
            >
              <span className="text-gray-300">{selectedCategory}</span>
              <ChevronDown className="h-4 w-4 text-blue-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="bg-gray-800 border-gray-700 rounded-xl p-3 w-64 space-y-2">
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={`px-3 py-2.5 text-left rounded-lg flex items-center justify-between ${
                  selectedCategory === "All"
                    ? "bg-blue-500/20 text-blue-400"
                    : "hover:bg-gray-700/50 text-gray-300"
                }`}
              >
                <span>All Categories</span>
                {selectedCategory === "All" && <Check className="h-4 w-4" />}
              </button>
              {getUniqueCategories(menuItems).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2.5 text-left rounded-lg flex items-center justify-between ${
                    selectedCategory === cat
                      ? "bg-blue-500/20 text-blue-400"
                      : "hover:bg-gray-700/50 text-gray-300"
                  }`}
                >
                  <span className="capitalize">{cat}</span>
                  {selectedCategory === cat && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Separator className="bg-gradient-to-r from-transparent via-blue-500 to-transparent h-0.5" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item: MenuItem) => (
          <div
            key={item._id}
            className="group bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl shadow-2xl border border-gray-700 hover:border-blue-500 transition-all hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-3 flex-1">
                <h3 className="text-xl font-semibold text-gray-100">
                  {item.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    TSH {item.price.toLocaleString()}
                  </span>
                  <span className="text-sm px-3 py-1 bg-gray-700/50 text-cyan-300 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-gray-700/50 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-gray-800 border-gray-700 p-5 space-y-4 rounded-xl">
                    <form
                      onSubmit={(e) => item._id && handleSubmit(e, item._id)}
                    >
                      <div className="space-y-4">
                        <Input
                          name="name"
                          value={editingItem?.name || item.name}
                          onChange={(e) =>
                            setEditingItem({
                              ...item,
                              name: e.target.value,
                            })
                          }
                          className="bg-gray-900 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 rounded-lg py-2 px-3"
                          placeholder="Item name"
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
                          className="bg-gray-900 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 rounded-lg py-2 px-3"
                          placeholder="Price"
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
                          className="bg-gray-900 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 rounded-lg py-2 px-3"
                          placeholder="Category"
                        />
                        <Button
                          type="submit"
                          className="w-full bg-blue-500/90 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors"
                          disabled={isUpdatingMenuItem}
                        >
                          {isUpdatingMenuItem ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Update Item"
                          )}
                        </Button>
                      </div>
                    </form>
                  </PopoverContent>
                </Popover>

                <button
                  type="button"
                  onClick={() => item._id && deleteMenuItemMutate(item._id)}
                  disabled={isDeletingMenuItem}
                  className="p-1.5 hover:bg-gray-700/50 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                >
                  {isDeletingMenuItem ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Trash2 className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
