import { Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UsernameMenu from "../components/UsernameMenu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";

export default function MobileNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const navItems = [
    { label: "About us", link: "/#about-us" },
    { label: "Contact", link: "/#contact" },
    { label: "Order Status", link: "/order-status" },
    { label: "Order Now!!", link: "/order" },
  ];

  return (
    <Sheet>
      <SheetTrigger className="focus:outline-none">
        <Menu className="h-7 w-7 hover:text-blue-400 transition-colors" />
      </SheetTrigger>
      <SheetContent className="bg-gray-900 text-white">
        <SheetHeader className="text-xl font-bold text-blue-400">
          Restaurant XYZ
        </SheetHeader>
        <Separator className="my-2 bg-gray-700" />
        <SheetDescription className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link key={item.label} to={item.link}>
              <Button
                variant="ghost"
                className="w-full justify-start text-left hover:bg-gray-800 hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Button>
            </Link>
          ))}
          {isAuthenticated ? (
            <UsernameMenu />
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-gray-800 hover:text-blue-400 transition-colors"
              onClick={async () => await loginWithRedirect()}
            >
              Login
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
