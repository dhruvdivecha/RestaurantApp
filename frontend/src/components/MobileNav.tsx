import {
  Menu,
  Home,
  Info,
  Phone,
  Utensils,
  CookingPot,
  User,
  Settings,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { motion } from "framer-motion";

export default function MobileNav() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  // Common items for all users
  const commonItems = [
    { label: "Home", link: "/", icon: <Home className="h-5 w-5" /> },
    {
      label: "About us",
      link: "/#about-us",
      icon: <Info className="h-5 w-5" />,
    },
    {
      label: "Contact",
      link: "/#contact",
      icon: <Phone className="h-5 w-5" />,
    },
    {
      label: "Order Now!!",
      link: "/usermenu",
      icon: <Utensils className="h-5 w-5" />,
    },
  ];

  // Authenticated user items
  const authItems = [
    {
      label: "Manage Restaurant",
      link: "/manage-restaurant",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      label: "Kitchen",
      link: "/kitchen",
      icon: <CookingPot className="h-5 w-5" />,
    },
    {
      label: "User Profile",
      link: "/user-profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger className="focus:outline-none">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600"
        >
          <Menu className="h-6 w-6 text-white" />
        </motion.div>
      </SheetTrigger>
      <SheetContent className="bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-slate-700/50">
        <SheetHeader className="flex flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 text-2xl font-bold">
              XYZ
            </span>
          </motion.div>
        </SheetHeader>

        <Separator className="my-4 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent h-[1px]" />

        <div className="flex flex-col gap-2 h-full pt-4">
          {/* Common items */}
          {commonItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={item.link}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-4 px-6 py-6 hover:bg-slate-800/40 hover:text-cyan-400 transition-all duration-300 group"
                >
                  <span className="text-cyan-400 group-hover:text-white transition-colors">
                    {item.icon}
                  </span>
                  <span className="text-lg font-light tracking-wide">
                    {item.label}
                  </span>
                </Button>
              </Link>
            </motion.div>
          ))}

          {/* Authenticated items */}
          {isAuthenticated && (
            <>
              {/* User greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-4"
              >
                <p className="text-sm text-cyan-400">Hi, {user?.email}</p>
              </motion.div>

              {/* Auth items */}
              {authItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Link to={item.link}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-4 px-6 py-6 hover:bg-slate-800/40 hover:text-cyan-400 transition-all duration-300 group"
                    >
                      <span className="text-cyan-400 group-hover:text-white transition-colors">
                        {item.icon}
                      </span>
                      <span className="text-lg font-light tracking-wide">
                        {item.label}
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              ))}

              {/* Logout button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <Button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className="w-full py-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 transition-all shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/30"
                >
                  <span className="text-lg font-semibold">Log Out</span>
                </Button>
              </motion.div>
            </>
          )}

          {/* Login button for unauthenticated */}
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <Button
                onClick={async () => await loginWithRedirect()}
                className="w-full py-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 transition-all shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/30"
              >
                <User className="h-5 w-5 mr-2" />
                <span className="text-lg font-semibold">Sign In</span>
              </Button>
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />
      </SheetContent>
    </Sheet>
  );
}
