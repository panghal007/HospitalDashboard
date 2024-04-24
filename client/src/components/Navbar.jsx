import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setusername] = useState("");
  useEffect(() => {
    const data = localStorage.getItem("Data");
    console.log(data);
    if (data) {
      const { userData } = JSON.parse(data);
      const { token } = JSON.parse(data);
      setusername(userData.email);
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Data");
    setIsLoggedIn(false);
  };

  return (
    <div className="header">
      <Link to="/dashboard" className="link1">
        <img src="logo1.png" alt="Logo" />
      </Link>
      <div className="nav-child2">
        {isLoggedIn ? (
          <>
            <h4>{username}</h4>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
