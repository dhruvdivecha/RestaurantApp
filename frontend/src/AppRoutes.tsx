import React from "react";
import Layout from "./layouts/layout";
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import UserMenuPage from "./pages/UserMenuPage";
import CheckoutPage from "./pages/CheckoutPage";
import Kitchen from "./pages/Kitchen";
import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/" />;
  return <>{children}</>;
}

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
        path="/checkout"
        element={
          <Layout>
            <CheckoutPage />
          </Layout>
        }
      />
      <Route
        path="/kitchen"
        element={
          <ProtectedRoute>
            <Layout>
              <Kitchen />
            </Layout>
          </ProtectedRoute>
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
