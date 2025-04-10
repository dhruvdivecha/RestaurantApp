import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "@/types/types";

const formSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
});

type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser: User;
};

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: currentUser.email,
      name: currentUser.name,
      address: currentUser.address,
      phoneNumber: currentUser.phoneNumber,
    },
  });

  useEffect(() => {
    form.reset({
      email: currentUser.email,
      name: currentUser.name,
      address: currentUser.address,
      phoneNumber: currentUser.phoneNumber,
    });
  }, [currentUser, form]);

  const onSubmit = (data: UserFormData) => {
    onSave(data);
    toast("Profile updated");
  };

  return (
    <Form {...form}>
      <div className="flex min-h-screen items-center justify-center p-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded-lg border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-8 shadow-lg w-full max-w-4xl"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              User Profile
            </h2>
            <p className="text-sm text-gray-500">
              Update your profile information
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="cursor-not-allowed bg-gray-100 text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white text-gray-900 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white text-gray-900 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white text-gray-900 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default UserProfileForm;
