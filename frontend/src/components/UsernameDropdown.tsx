import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Utensils, Settings, User as UserIcon, LogOut } from "lucide-react";

export default function UsernameMenu() {
  const { user, logout } = useAuth0();

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
            <FontAwesomeIcon icon={faUser} size="lg" className="text-white" />
          </motion.div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl p-2 min-w-[240px] mt-3"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DropdownMenuItem className="px-4 py-3 cursor-default">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent font-medium">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuItem>

            <Separator className="my-2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent h-[1px]" />

            <DropdownMenuItem className="px-3 py-2 hover:bg-slate-800/40 rounded-lg transition-all group">
              <Link
                to="/manage-restaurant"
                className="flex items-center gap-3 w-full"
              >
                <Settings className="h-5 w-5 text-cyan-400 group-hover:text-white transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  Manage Restaurant
                </span>
              </Link>
            </DropdownMenuItem>

            <Separator className="my-2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent h-[1px]" />

            <DropdownMenuItem className="px-3 py-2 hover:bg-slate-800/40 rounded-lg transition-all group">
              <Link to="/kitchen" className="flex items-center gap-3 w-full">
                <Utensils className="h-5 w-5 text-cyan-400 group-hover:text-white transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  Kitchen
                </span>
              </Link>
            </DropdownMenuItem>

            <Separator className="my-2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent h-[1px]" />

            <DropdownMenuItem className="px-3 py-2 hover:bg-slate-800/40 rounded-lg transition-all group">
              <Link
                to="/user-profile"
                className="flex items-center gap-3 w-full"
              >
                <UserIcon className="h-5 w-5 text-cyan-400 group-hover:text-white transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  User Profile
                </span>
              </Link>
            </DropdownMenuItem>

            <Separator className="my-2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent h-[1px]" />

            <DropdownMenuItem className="px-3 py-2 hover:bg-slate-800/40 rounded-lg transition-all group">
              <Button
                variant="ghost"
                className="w-full flex items-center gap-3 justify-start px-0 hover:bg-transparent"
                onClick={() =>
                  logout({
                    logoutParams: {
                      returnTo: window.location.origin,
                    },
                  })
                }
              >
                <LogOut className="h-5 w-5 text-cyan-400 group-hover:text-white transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  Log Out
                </span>
              </Button>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
