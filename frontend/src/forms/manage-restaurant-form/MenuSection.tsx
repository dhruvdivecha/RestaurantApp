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
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-white">Menu</h2>
        <FormDescription>
          Create your menu and give each item a name, price, and category
        </FormDescription>
      </div>

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

      <Button
        type="button"
        onClick={() => append({ name: "", price: "", category: "" })}
        className="bg-green-600 hover:bg-green-500 text-white"
      >
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
