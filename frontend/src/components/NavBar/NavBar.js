import { NavLink } from "react-router-dom";  
import "./NavBar.css";
import logo from "../../images/logo.svg";
import { FaBookmark } from "react-icons/fa";

// Navbar.js
const Navbar = () => {
  return (
    <nav>
      <ul className="nav-container">
        <div className="nav-links">
          <li>
            <NavLink to="/" className="brand styled-link" activeClassName="active">
              <img className='brand-logo' src={logo} alt='FreeTake' />
            </NavLink>
          </li>
        </div>
        <div className="nav-links nav-center">
          <li><NavLink to="/receive" className='styled-link' activeClassName="active">Free Food</NavLink></li>
          <li><NavLink to="/donate" className='styled-link' activeClassName="active">Donate</NavLink></li>
        </div>
        <div className='nav-links nav-right'>
          <li><NavLink to="/about" className='styled-link' activeClassName="active">About</NavLink></li>
          <li><NavLink to="/contact" className='styled-link' activeClassName="active">Contact</NavLink></li>
          <li><NavLink to="/bookmark" className='styled-bookmark' activeClassName="active"><FaBookmark /></NavLink></li>
          <li><NavLink to="/login" className='styled-link' activeClassName="active">Login</NavLink></li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
