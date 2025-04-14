import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";

type props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, string>;
};

const CuisineCheckbox = ({ cuisine, field }: props) => {
  return (
    <FormItem className="flex items-center space-x-2">
      <FormControl>
        <Checkbox
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            field.onChange(
              checked
                ? [...field.value, cuisine]
                : field.value.filter((c: string) => c !== cuisine)
            );
          }}
        />
      </FormControl>
      <FormLabel>{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
