import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import { Separator } from "@/components/ui/separator";

const restaurantSchema = z.object({
  restaurantName: z
    .string({
      required_error: "Restaurant name is required",
    })
    .min(1),
  orderPrice: z.coerce
    .number({
      required_error: "Order price is required",
      invalid_type_error: "Order price must be a number",
    })
    .min(0),
  address: z
    .string({
      required_error: "Address is required",
    })
    .min(1),
  cuisine: z
    .array(
      z.string().nonempty({
        message: "Cuisine is required",
      })
    )
    .min(1),
  estimatedDeliveryTime: z
    .number({
      required_error: "Estimated delivery time is required",
    })
    .min(0),
  menuItems: z.array(
    z.object({
      name: z
        .string({
          required_error: "Name is required",
        })
        .min(1),
      price: z.coerce
        .number({
          required_error: "Price is required",
          invalid_type_error: "Price must be a number",
        })
        .min(0),
    })
  ),
});

type props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  error: string | null;
};

function ManageRestaurantForm({ onSave, isLoading }: props) {
  const form = useForm<z.infer<typeof restaurantSchema>>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      restaurantName: "",
      orderPrice: 0,
      cuisine: [""],
      estimatedDeliveryTime: 0,
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (formDataJson: restaurantFormData) => {};
  return (
    <div className="min-h-screen bg-[#1a1f2b] p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Manage Restaurant</h1>
          <p className="text-lg text-gray-400">
            Update your restaurant information
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-gray-800 p-8 rounded-xl">
              <CuisinesSection />
            </div>

            <Separator />

            <div className="bg-white/5 backdrop-blur-sm border border-gray-800 p-8 rounded-xl">
              <MenuSection />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ManageRestaurantForm;
