import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "../components/UsernameMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="flex gap-4 items-center">
      <Link to="/#about-us">
        <NavButton text="About us" />
      </Link>
      <Link to="/#contact">
        <NavButton text="Contact" />
      </Link>
      <Link to="/usermenu">
        <button className="text-white bg-blue-600 hover:bg-blue-700 text-gray-700 font-semibold tracking-wide px-4 py-2 rounded-xl transition-all cursor-pointer">
          Order Now!!
        </button>
      </Link>
      <Link to="/orderstatus">
        <button className="text-white bg-blue-600 hover:bg-blue-700 text-gray-700 font-semibold tracking-wide px-4 py-2 rounded-xl transition-all cursor-pointer">
          Order Status
        </button>
      </Link>
      <div>
        {isAuthenticated ? (
          <UsernameMenu />
        ) : (
          <Button
            variant="ghost"
            className="bg-transparent hover:text-blue-500 text-gray-400 transition-colors px-4 py-2 rounded-xl"
            onClick={async () => await loginWithRedirect()}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

const NavButton = ({ text }: { text: string }) => {
  return (
    <button
      className={`bg-transparent text-gray-400 font-semibold tracking-wide px-4 py-2 rounded-xl transition-all 
        hover:text-blue-600 hover:bg-blue-100 cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default MainNav;
