import { Link } from "react-router-dom";
import "./NavBar.css"
import logo from "../../images/logo.svg"
import { FaBookmark } from "react-icons/fa";

// Navbar.js
const Navbar = () => {
  return (
    <nav>
      <ul className="nav-container">
        <div className="nav-links">
          <li><Link to="/" className="brand styled-link"><img className='brand-logo' src={logo} alt='FreeTake' /></Link></li>
        </div>
        <div className="nav-links nav-center">
          <li><Link to="/receive" className='styled-link'>Free Food</Link></li>
          <li><Link to="/donate" className='styled-link'>Donate</Link></li>
        </div>
        <div className='nav-links nav-right'>
          <li><Link to="/about" className='styled-link'>About</Link></li>
          <li><Link to="/contact" className='styled-link'>Contact</Link></li>
          <li><Link to="/bookmark" className='styled-bookmark'><FaBookmark /></Link></li>
          <li><Link to="/login" className='styled-link'>Login</Link></li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
