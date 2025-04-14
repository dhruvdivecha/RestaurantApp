import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import MenuItemInput from "./MenuItemInput";
import { Plus } from "lucide-react";

export default function MenuSection() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Menu</h2>
        <FormDescription className="text-base text-gray-400">
          Add your menu items here
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <MenuItemInput
                  key={field.id}
                  index={index}
                  removeMenuItem={() => remove(index)}
                />
              ))}
            </div>
          </FormItem>
        )}
      />

      <Button
        type="button"
        onClick={() => append({ name: "", price: 0 })}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span className="font-medium">Add Menu Item</span>
      </Button>
    </div>
  );
}
