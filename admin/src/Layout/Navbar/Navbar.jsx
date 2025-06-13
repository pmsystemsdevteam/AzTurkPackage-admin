import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">AzTurk Admin</Link>
      </div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={toggleMenu}>Ana Səhifə</Link>
        <Link to="/erzaq" onClick={toggleMenu}>Ərzaqlar</Link>
        <Link to="/cixis" onClick={toggleMenu}>Çıxış</Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? "✕" : "☰"}
      </div>
    </nav>
  );
};

export default Navbar;
