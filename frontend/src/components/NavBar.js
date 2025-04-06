import { Link } from "react-router-dom";
import logo from "../images/logo.svg"

// Navbar.js
const Navbar = () => {
  return (
    <nav>
      <ul className="nav-container">
        <div className="nav-links">
          <li><Link to="/" className="brand styled-nav-link"><img className='brand-logo' src={logo} alt='FreeTake' /></Link></li>
        </div>
        <div className="nav-links nav-links-center">
          <li><Link to="/receive" className='styled-nav-link'>Free Food</Link></li>
          <li><Link to="/donate" className='styled-nav-link'>Donate</Link></li>
        </div>
        <div className='nav-links nav-links-right'>
          <li><Link to="/about" className='styled-nav-link'>About</Link></li>
          <li><Link to="/contact" className='styled-nav-link'>Contact</Link></li>
          <li><Link to="/login" className='styled-nav-link'>Login</Link></li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
