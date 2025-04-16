import { useMutation } from "@tanstack/react-query";
import { MenuItem } from "../types/types";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMenuItem = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMenuItemRequest = async (menuItems: MenuItem[]) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ menuItems }),
    });

    if (!response.ok) {
      throw new Error("Failed to create menu items");
    }

    return response.json();
  };

  const { mutateAsync: createMenuItemMutate, isPending: isCreatingMenuItem } =
    useMutation({
      mutationFn: createMenuItemRequest,
      onSuccess: () => {
        toast.success("Menu items created successfully");
      },
      onError: () => {
        toast.error("Failed to create menu items");
      },
    });

  return {
    createMenuItemMutate,
    isCreatingMenuItem,
  };
};
