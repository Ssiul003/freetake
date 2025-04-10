import React from "react";
import { useNavigate } from "react-router-dom";

const Account = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/"); 
  };

  return (
    <div>
      <h2>Welcome to your Account</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;
