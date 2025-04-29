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

export default function UsernameMenu() {
  const { user, logout } = useAuth0();

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <FontAwesomeIcon
            icon={faUser}
            size="lg"
            className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 text-white rounded-md shadow-lg p-2 min-w-[200px] mt-2">
          <DropdownMenuItem className="px-3 py-2 cursor-default">
            <p className="text-sm">Hi, {user?.email}</p>
          </DropdownMenuItem>
          <Separator className="my-2 bg-gray-700" />
          <DropdownMenuItem className="px-3 py-2 hover:bg-gray-700 rounded-md transition-colors">
            <Link to="/manage-restaurant" className="block w-full">
              Manage Restaurant
            </Link>
          </DropdownMenuItem>
          <Separator className="my-2 bg-gray-700" />
          <DropdownMenuItem className="px-3 py-2 hover:bg-gray-700 rounded-md transition-colors">
            <Link to="/kitchen" className="block w-full">
              Kitchen
            </Link>
          </DropdownMenuItem>
          <Separator className="my-2 bg-gray-700" />
          <DropdownMenuItem className="px-3 py-2 hover:bg-gray-700 rounded-md transition-colors">
            <Link to="/user-profile" className="block w-full">
              User Profile
            </Link>
          </DropdownMenuItem>
          <Separator className="my-2 bg-gray-700" />
          <DropdownMenuItem className="px-3 py-2 hover:bg-gray-700 rounded-md transition-colors">
            <Button
              variant="ghost"
              className="w-full text-left px-0"
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                })
              }
            >
              Log Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
