import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameDropdown";
import { motion } from "framer-motion";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <nav className="flex items-center gap-6">
      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link to="/#about-us">
          <NavButton text="About us" />
        </Link>
        <Link to="/#contact">
          <NavButton text="Contact" />
        </Link>
        <Link to="/usermenu">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
            <button className="relative bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold tracking-wide px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-400/30 transition-all">
              Order Now!!
            </button>
          </motion.div>
        </Link>
      </div>

      {/* Auth Section */}
      <div className="ml-4 flex items-center gap-4">
        {isAuthenticated ? (
          <UsernameMenu />
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-white px-6 py-3 rounded-xl transition-all"
              onClick={async () => await loginWithRedirect()}
            >
              Sign In
            </Button>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

const NavButton = ({ text }: { text: string }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <button className="relative group text-gray-300 font-medium px-4 py-2 rounded-lg transition-all duration-300">
        {text}
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-300 group-hover:w-full" />
      </button>
    </motion.div>
  );
};

export default MainNav;
