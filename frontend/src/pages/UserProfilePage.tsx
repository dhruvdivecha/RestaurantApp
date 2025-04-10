import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { useGetCurrentUser, useUpdateMyUser } from "@/api/MyUserApi";

const UserProfilePage = () => {
  const {
    currentUser,
    isPending: isGettingUser,
    isError,
  } = useGetCurrentUser();
  const { updateMyUser, isPending: isUpdating } = useUpdateMyUser();

  if (isGettingUser) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  if (!currentUser) {
    return <div>User not found</div>;
  }

  return (
    <UserProfileForm
      onSave={updateMyUser}
      isLoading={isUpdating}
      currentUser={currentUser}
    />
  );
};

export default UserProfilePage;
