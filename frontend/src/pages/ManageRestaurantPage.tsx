import ManageRestaurantForm from "../forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  return (
    <div>
      <ManageRestaurantForm onSave={() => {}} isLoading={false} error={null} />
    </div>
  );
};

export default ManageRestaurantPage;
