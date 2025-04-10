import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="container">
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/account" element={<Account setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
