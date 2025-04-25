"use client";

import { useState } from "react";
import { useGetMenuItems } from "@/api/MyUserApi";
import { MenuItem } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCart } from "@/components/CartContext";
import { toast } from "sonner";
import { Loader2, ChevronDown, Check } from "lucide-react";
import { getUniqueCategories } from "@/utils/categoryUtils";

export default function UserMenuPage() {
  const { menuItems, isLoadingMenuItems } = useGetMenuItems();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (isLoadingMenuItems) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-gray-400">No menu items available.</p>
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
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-4">
            Our Menu
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
        </div>

        <div className="flex justify-center mb-12">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 border border-gray-700 hover:border-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20"
              >
                <span>{selectedCategory}</span>
                <ChevronDown className="h-5 w-5 text-blue-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="bg-gray-800 border-gray-700 rounded-xl p-4 w-64 shadow-xl animate-in fade-in zoom-in-95"
              align="center"
              sideOffset={8}
            >
              <div className="space-y-2">
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`w-full px-4 py-2.5 text-left rounded-lg text-sm transition-colors
                      ${
                        selectedCategory === "All"
                          ? "bg-blue-500/20 text-blue-400 font-semibold"
                          : "hover:bg-gray-700/50 text-gray-300"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>All Categories</span>
                      {selectedCategory === "All" && (
                        <Check className="h-4 w-4 text-blue-400" />
                      )}
                    </div>
                  </button>

                  {getUniqueCategories(menuItems).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full px-4 py-2.5 text-left rounded-lg text-sm transition-colors
                        ${
                          selectedCategory === cat
                            ? "bg-blue-500/20 text-blue-400 font-semibold"
                            : "hover:bg-gray-700/50 text-gray-300"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="capitalize">{cat}</span>
                        {selectedCategory === cat && (
                          <Check className="h-4 w-4 text-blue-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: MenuItem) => (
            <div
              key={item._id}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-700 hover:border-blue-500 group"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-100 mb-2">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-400 italic mb-4">
                    {item.category}
                  </p>
                  <div className="group">
                    <p className="text-xl font-bold text-emerald-400 transition-all duration-300 group-hover:text-emerald-300">
                      TZS {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button
                  className="mt-6 w-full transition-transform duration-200 hover:scale-[1.02] hover:shadow-md"
                  onClick={() => {
                    addToCart(item);
                    toast.success("Added to cart", {
                      position: "top-center",
                      style: {
                        background: "#1f2937",
                        color: "#fff",
                        border: "1px solid #374151",
                      },
                    });
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
