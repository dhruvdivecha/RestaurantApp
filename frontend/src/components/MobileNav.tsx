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

export default function MobileNav() {
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
          {['Login', 'About us', 'Gallery', 'Contact', 'Order Now!!'].map((label) => (
            <Button
              key={label}
              variant="ghost"
              className="w-full justify-start text-left hover:bg-gray-800 hover:text-blue-400 transition-colors"
            >
              {label}
            </Button>
          ))}
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-gray-800 hover:text-blue-400 transition-colors ml-3"
          >
            <FontAwesomeIcon icon={faUser} />
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}
