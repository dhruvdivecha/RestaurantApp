import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const MainNav = () => {
  return (
    <div className="flex gap-4 items-center">
      <NavButton 
        text="Login" 
      />
      <Link to="/#about-us">
        <NavButton 
          text="About us" 
        />
      </Link>
      <NavButton
        text='Gallery'
      />
      <Link to="/#contact">
        <NavButton 
          text="Contact" 
        />
      </Link>
      <Link to="/order">
        <button className='text-white bg-blue-600 hover:bg-blue-700 text-gray-700 font-semibold tracking-wide px-4 py-2 rounded-xl transition-all cursor-pointer'>
          Order Now!!
        </button>
      </Link>
      <button
        className="bg-transparent hover:text-blue-500 text-gray-400 transition-colors px-4 py-2 rounded-xl"
      >
        <FontAwesomeIcon icon={faUser} size="lg" />
      </button>
    </div>
  )
}

const NavButton = ({
  text,
}: {
  text: string
}) => {
  return (
    <button
      className={`bg-transparent text-gray-400 font-semibold tracking-wide px-4 py-2 rounded-xl transition-all 
        hover:text-blue-600 hover:bg-blue-100 cursor-pointer`}
    >
      {text}
    </button>
  )
}

export default MainNav
