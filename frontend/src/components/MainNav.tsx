import { Button } from "./ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const MainNav = () => {
  return (
    <div className="flex gap-4 items-center">
      <NavButton text="Login" />
      <NavButton text="About us" />
      <NavButton text="Gallery" />
      <NavButton text="Contact" />
      <NavButton text="Order Now!!" highlight />
      <Button className="bg-transparent hover:text-blue-500 text-gray-700 transition-colors">
        <FontAwesomeIcon icon={faUser} size="lg" />
      </Button>
    </div>
  )
}

const NavButton = ({ text, highlight = false }: { text: string, highlight?: boolean }) => {
  return (
    <Button
      className={`bg-transparent text-gray-700 font-semibold tracking-wide px-4 py-2 rounded-xl transition-all 
        hover:text-blue-600 hover:bg-blue-100
        ${highlight ? 'text-white bg-blue-600 hover:bg-blue-700' : ''}
      `}
    >
      {text}
    </Button>
  )
}

export default MainNav
