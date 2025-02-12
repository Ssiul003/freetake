import { Link } from "react-router-dom";

// Navbar.js
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="brand">FreeTake</Link>
        </li>
        <div className="nav-links">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/donate">Donate</Link></li>
          <li><Link to="/receive">Receive</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
