import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useCreateMyUser } from "../api/MyUserApi";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const { createMyUser } = useCreateMyUser();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientID = import.meta.env.VITE_AUTHO_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTHO_CALLBACK_URL;

  if (!domain || !clientID || !redirectUri) {
    throw new Error("unable to initialise auth");
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    if (user?.sub && user?.email) {
      createMyUser({
        auth0Id: user.sub,
        email: user.email,
      });
    }
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
