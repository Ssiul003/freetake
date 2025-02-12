import { Link } from "react-router-dom";

// Navbar.js
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><span className="brand">FreeTake</span></li>
        <div className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/donate">Donate</Link></li>
          <li><Link to="/recieve">Receive</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </div>
      </ul>
    </nav>
  );
};




export default Navbar;
