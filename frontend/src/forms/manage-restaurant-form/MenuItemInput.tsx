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

type Props = {
  index: number;
  removeMenuItem: () => void;
};

export default function MenuItemInput({ index, removeMenuItem }: Props) {
  const { control } = useFormContext();

  return (
    <div className="bg-white/10 p-4 rounded-lg shadow-sm relative mb-4">
      <div className="grid gap-4 pt-4">
        <FormField
          control={control}
          name={`menuItems.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter menu item name"
                  className="bg-white/20 border-none text-white placeholder:text-white/50"
                />
              </FormControl>
              <FormMessage className="text-red-300 text-xs italic" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`menuItems.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter menu item price"
                  className="bg-white/20 border-none text-white placeholder:text-white/50"
                  min="0"
                />
              </FormControl>
              <FormMessage className="text-red-300 text-xs italic" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`menuItems.${index}.category`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Category</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter menu item category"
                  className="bg-white/20 border-none text-white placeholder:text-white/50"
                />
              </FormControl>
              <FormMessage className="text-red-300 text-xs italic" />
            </FormItem>
          )}
        />
      </div>
      <Button
        type="button"
        variant="destructive"
        onClick={removeMenuItem}
        className="absolute top-3 right-3 p-1.5 h-8 w-8 hover:bg-red-400/20"
      >
        <Trash2 className="h-4 w-4 text-red-300 hover:text-red-100" />
      </Button>
    </div>
  );
}
