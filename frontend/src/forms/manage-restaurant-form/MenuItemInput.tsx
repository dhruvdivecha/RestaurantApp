import {
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type props = {
  index: number;
  removeMenuItem: () => void;
};

export default function MenuItemInput({ index, removeMenuItem }: props) {
  const { control } = useFormContext();
  return (
    <div className="relative bg-[#1e2530] p-6 rounded-xl space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name={`menu.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium text-gray-300">
                Menu Item
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter item name"
                  className="h-11 px-3 bg-[#171c24] border-0 text-gray-200 placeholder:text-gray-500 focus:ring-1 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`menu.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium text-gray-300">
                Price (Tsh)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter price"
                  className="h-11 px-3 bg-[#171c24] border-0 text-gray-200 placeholder:text-gray-500 focus:ring-1 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>

      <div className="absolute top-4 right-4">
        <Button
          type="button"
          onClick={removeMenuItem}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-[#171c24] rounded-full"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
