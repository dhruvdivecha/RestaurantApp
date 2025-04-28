import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Check } from "lucide-react";
import { MenuItem } from "@/types/types";
import { getUniqueCategories } from "@/utils/categoryUtils";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  menuItems: MenuItem[];
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  menuItems,
}: CategoryFilterProps) {
  return (
    <div className="flex justify-center mb-16">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-3 px-8 py-4 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02] group hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            <span className="text-gray-300 group-hover:text-cyan-200 transition-colors font-medium">
              {selectedCategory}
            </span>
            <ChevronDown className="h-5 w-5 text-cyan-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-gray-800/80 backdrop-blur-xl border-gray-700/50 rounded-xl p-4 w-64 shadow-[0_0_25px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in-95"
          align="center"
          sideOffset={8}
        >
          <div className="space-y-2">
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
              <button
                onClick={() => onCategoryChange("All")}
                className={`w-full px-4 py-3 text-left rounded-lg text-sm transition-all duration-300
                  ${
                    selectedCategory === "All"
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold shadow-[0_0_10px_rgba(34,211,238,0.2)] border border-cyan-500/20"
                      : "hover:bg-gray-700/50 text-gray-300 hover:text-cyan-200"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span>All Categories</span>
                  {selectedCategory === "All" && (
                    <Check className="h-4 w-4 text-cyan-400" />
                  )}
                </div>
              </button>

              {getUniqueCategories(menuItems).map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`w-full px-4 py-3 text-left rounded-lg text-sm transition-all duration-300
                    ${
                      selectedCategory === category
                        ? "bg-cyan-500/20 text-cyan-300 font-semibold shadow-[0_0_10px_rgba(34,211,238,0.2)] border border-cyan-500/20"
                        : "hover:bg-gray-700/50 text-gray-300 hover:text-cyan-200"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="capitalize">{category}</span>
                    {selectedCategory === category && (
                      <Check className="h-4 w-4 text-cyan-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
