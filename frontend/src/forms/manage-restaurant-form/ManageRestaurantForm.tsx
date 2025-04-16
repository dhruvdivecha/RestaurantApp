import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useCreateMenuItem } from "@/api/MyRestaurantApi";
import { MenuItemsForm } from "@/types/types";
import MenuSection from "./MenuSection";

const MenuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  category: z.string().min(1, "Category is required"),
});

const FormSchema = z.object({
  menuItems: z
    .array(MenuItemSchema)
    .min(1, "At least one menu item is required"),
});

const ManageMenuItemForm = () => {
  const { createMenuItemMutate, isCreatingMenuItem } = useCreateMenuItem();
  const form = useForm<MenuItemsForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      menuItems: [{ name: "", price: 0, category: "" }],
    },
  });

  const onSubmit = (data: MenuItemsForm) => {
    createMenuItemMutate(data.menuItems);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <MenuSection />
        <Button
          type="submit"
          disabled={isCreatingMenuItem}
          onClick={() => {
            form.handleSubmit(onSubmit)();
          }}
          className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreatingMenuItem ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};

export default ManageMenuItemForm;
