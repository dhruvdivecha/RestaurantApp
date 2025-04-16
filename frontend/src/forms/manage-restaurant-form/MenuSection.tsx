import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFormContext, useFieldArray } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-white/20 pb-4">
        <h2 className="text-3xl font-bold text-white mb-2">Menu</h2>
        <FormDescription className="text-white/70">
          Create your menu and give each item a name, price, and category
        </FormDescription>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={control}
            name={`menuItems.${index}`}
            render={() => (
              <FormItem>
                <MenuItemInput
                  index={index}
                  removeMenuItem={() => remove(index)}
                />
              </FormItem>
            )}
          />
        ))}
      </div>

      <Button
        type="button"
        onClick={() => append({ name: "", price: 0, category: "" })}
        className="w-35 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition-all"
      >
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
