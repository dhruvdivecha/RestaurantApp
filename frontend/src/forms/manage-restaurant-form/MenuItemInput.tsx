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
    <div>
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter menu item name" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Price <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter menu item price" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.category`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Category <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter menu item category" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        variant="destructive"
        onClick={removeMenuItem}
        className="mt-2"
      >
        <Trash2 />
      </Button>
    </div>
  );
}
