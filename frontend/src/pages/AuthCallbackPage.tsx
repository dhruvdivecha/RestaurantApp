import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "../api/MyUserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();

  const { user } = useAuth0();

  const { createMyUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createMyUser({
        auth0Id: user.sub,
        email: user.email,
      });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createMyUser, user, navigate]);

  return <div>Loading...</div>;
};

export default AuthCallbackPage;
