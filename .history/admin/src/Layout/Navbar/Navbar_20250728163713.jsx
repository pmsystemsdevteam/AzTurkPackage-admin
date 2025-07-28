import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">AzTurk Admin</Link>
      </div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={toggleMenu}>Ana Səhifə</Link>
        <Link to="/erzaq" onClick={toggleMenu}>Məhsullar</Link>
        <button className="logout-button" onClick={handleLogout}>Çıxış</button>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? "✕" : "☰"}
      </div>
    </nav>
  );
};

export default Navbar;