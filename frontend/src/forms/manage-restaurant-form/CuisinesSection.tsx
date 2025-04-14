import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { cuisineList } from "@/config/restaurant.config";
import CuisineCheckbox from "./CuisineCheckbox";

const CuisinesSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">Cuisines</h2>
        <FormDescription className="text-base text-gray-400">
          Select the cuisines that the restaurant offers
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisine"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cuisineList.map((cuisine) => (
                <CuisineCheckbox
                  key={cuisine}
                  cuisine={cuisine}
                  field={field}
                />
              ))}
            </div>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
