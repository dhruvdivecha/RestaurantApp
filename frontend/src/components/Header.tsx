import { Link } from "react-router-dom"
import MainNav from "./MainNav"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="border-b border-gray-800 py-4 shadow-md sticky top-0 z-50 bg-gray-800">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          to="/"
          className="text-3xl font-extrabold hover:text-blue-400 transition-colors"
        >
          Restaurant XYZ
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <nav className="hidden md:block ">
          <MainNav />
        </nav>
      </div>
    </header>
  )
}

export default Header
