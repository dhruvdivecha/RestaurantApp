import Layout from "./layouts/layout";
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import UserMenuPage from "./pages/UserMenuPage";
import OrderStatusPage from "./pages/OrderStatus";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/"
        element={
          <Layout>
            <Homepage />
          </Layout>
        }
      />
      <Route
        path="/user-profile"
        element={
          <Layout>
            <UserProfilePage />
          </Layout>
        }
      />
      <Route
        path="/orderstatus"
        element={
          <Layout>
            <OrderStatusPage />
          </Layout>
        }
      />
      <Route
        path="/manage-restaurant"
        element={
          <Layout>
            <ManageRestaurantPage />
          </Layout>
        }
      />
      <Route
        path="/usermenu"
        element={
          <Layout>
            <UserMenuPage />
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
