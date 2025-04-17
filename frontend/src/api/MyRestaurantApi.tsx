import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MenuItem } from "../types/types";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries({ queryKey: ["menuItems"] });
        toast.success("Menu items created successfully");
      },
      onError: () => {
        toast.error("Failed to create menu items");
      },
    });

  return { createMenuItemMutate, isCreatingMenuItem };
};

export const useGetMenuItems = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMenuItemsRequest = async () => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/menu`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch menu items");
    }

    return response.json();
  };

  const { data: menuItems, isLoading: isLoadingMenuItems } = useQuery({
    queryKey: ["menuItems"],
    queryFn: getMenuItemsRequest,
  });

  return {
    menuItems: menuItems ?? [],
    isLoadingMenuItems,
  };
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const deleteMenuItemRequest = async (id: string) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/menu/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete menu item");
    }

    return response.json();
  };

  const { mutateAsync: deleteMenuItemMutate, isPending: isDeletingMenuItem } =
    useMutation({
      mutationFn: deleteMenuItemRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menuItems"] });
        toast.success("Menu item deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete menu item");
      },
    });

  return { deleteMenuItemMutate, isDeletingMenuItem };
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  const updateMenuItemRequest = async ({
    id,
    menuItem,
  }: {
    id: string;
    menuItem: MenuItem;
  }) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/menu/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuItem),
    });

    if (!response.ok) {
      throw new Error("Failed to update menu item");
    }

    return response.json();
  };

  const { mutateAsync: updateMenuItemMutate, isPending: isUpdatingMenuItem } =
    useMutation({
      mutationFn: updateMenuItemRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["menuItems"] });
        toast.success("Menu item updated successfully");
      },
      onError: () => {
        toast.error("Failed to update menu item");
      },
    });

  return { updateMenuItemMutate, isUpdatingMenuItem };
};
