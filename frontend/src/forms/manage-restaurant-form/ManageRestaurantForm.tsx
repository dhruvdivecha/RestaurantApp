import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useCreateMenuItem } from "@/api/MyRestaurantApi";
import { MenuItemsForm } from "@/types/types";
import MenuSection from "./MenuSection";
import MenuItemsSection from "./MenuItemsSection";
import { useAuth0 } from "@auth0/auth0-react";

const MenuItemSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  category: z.string().min(1, "Category is required"),
  owner: z.string().optional(),
});

const FormSchema = z.object({
  menuItems: z
    .array(MenuItemSchema)
    .min(1, "At least one menu item is required"),
});

const ManageMenuItemForm = () => {
  const { createMenuItemMutate, isCreatingMenuItem } = useCreateMenuItem();
  const { user } = useAuth0();

  const form = useForm<MenuItemsForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      menuItems: [
        { _id: "", name: "", price: 0, category: "", owner: user?.sub },
      ],
    },
  });

  const onSubmit = (data: MenuItemsForm) => {
    const menuItemsWithOwner = data.menuItems.map((item) => ({
      ...item,
      owner: user?.sub,
    }));

    createMenuItemMutate(menuItemsWithOwner);
    form.reset({
      menuItems: [
        { _id: "", name: "", price: 0, category: "", owner: user?.sub },
      ],
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-6 bg-gray-900/50 rounded-xl shadow-xl max-w-5xl mx-auto"
        >
          <MenuSection />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isCreatingMenuItem}
              className="h-10 text-lg bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-transform transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              {isCreatingMenuItem ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
      <div className="">
        <MenuItemsSection />
      </div>
    </div>
  );
};

export default ManageMenuItemForm;
