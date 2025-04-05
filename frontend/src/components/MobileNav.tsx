import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger
} from './ui/sheet'
import { Menu } from 'lucide-react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function MobileNav() {

    const navItems = [
        { label: "Login", link: "/login" },
        { label: "About us", link: "/#about-us" },
        { label: "Gallery", link: "/gallery" },
        { label: "Contact", link: "/#contact" },
        { label: "Order Now!!", link: "/order" },
      ];

  return (
    <Sheet>
      <SheetTrigger className="focus:outline-none">
        <Menu className="h-7 w-7 hover:text-blue-400 transition-colors" />
      </SheetTrigger>
      <SheetContent className="bg-gray-900 text-white">
        <SheetHeader className='text-xl font-bold text-blue-400'>
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
          <Link to="/profile">
                <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-gray-800 hover:text-blue-400 transition-colors ml-3"
                    >
                    <FontAwesomeIcon icon={faUser} size="lg" />
                </Button>
            </Link>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}
