import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState } from "react";
import './App.css';
import Home from "./pages/Home";
import Navbar from "./components/NavBar/NavBar";
import Login from "./pages/Login";
import Donate from "./pages/Donate";
import Receive from "./pages/Receive";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account"; 
import Bookmark from "./pages/Bookmark";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const hideNavbar = loading && window.location.pathname === '/freetake'

  return (
    <Router>
      <div className="container">
        {!hideNavbar && <Navbar isLoggedIn={isLoggedIn} />}
        <Routes>
          <Route path="/freetake" element={<Home setLoading={setLoading}/>} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/account" element={<Account setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
