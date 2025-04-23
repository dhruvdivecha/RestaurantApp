import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "@/types/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getCurrentUserRequest = async (): Promise<User> => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserRequest,
  });

  return { currentUser, isPending, isError };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
  name?: string;
  address?: string;
  phoneNumber?: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (request: CreateUserRequest) => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createMyUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createMyUserRequest,
  });

  return { createMyUser, isPending, isError, isSuccess };
};

type UpdateUserRequest = {
  name?: string;
  address?: string;
  phoneNumber?: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateUserRequest) => {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  };

  const {
    mutateAsync: updateMyUser,
    isPending,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: updateMyUserRequest,
  });

  return { updateMyUser, isPending, isError, isSuccess, error, reset };
};

export const useGetMenuItems = () => {
  const getMenuItemsRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/my/usermenu`);

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
