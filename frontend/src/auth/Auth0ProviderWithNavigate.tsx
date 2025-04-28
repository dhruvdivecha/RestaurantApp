import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientID || !redirectUri || !audience) {
    throw new Error("unable to initialise auth");
  }

  const onRedirectCallback = () => {
    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <Auth0ProviderWithUser>{children}</Auth0ProviderWithUser>
    </Auth0Provider>
  );
};

const Auth0ProviderWithUser = ({ children }: Props) => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const hasCreatedRef = useRef(false);

  useEffect(() => {
    const createUser = async () => {
      if (isAuthenticated && user && !hasCreatedRef.current) {
        hasCreatedRef.current = true;
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/my/user`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                auth0Id: user.sub,
                email: user.email,
                name: user.name || user.email,
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Failed to create user:", errorData);
            toast.error("Failed to complete setup. Please try again.", {
              position: "top-center",
              style: {
                background: "#1f2937",
                color: "#fff",
                border: "1px solid #374151",
              },
            });
            hasCreatedRef.current = false; // Allow retry on failure
            return;
          }

          toast.success("Welcome! Your account is ready.", {
            position: "top-center",
            style: {
              background: "#1f2937",
              color: "#fff",
              border: "1px solid #374151",
            },
          });
        } catch (error) {
          console.error("Error creating user:", error);
          toast.error("Connection error. Please try again.", {
            position: "top-center",
            style: {
              background: "#1f2937",
              color: "#fff",
              border: "1px solid #374151",
            },
          });
          hasCreatedRef.current = false; // Allow retry on failure
        }
      }
    };

    createUser();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return <>{children}</>;
};

export default Auth0ProviderWithNavigate;
