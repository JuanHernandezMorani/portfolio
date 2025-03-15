import React, { useState } from "react";
import "../../styles/navbar.css";
import { Link, NavLink } from "react-router-dom";
import ownImg from '../../imgs/others/own.png';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="nav-container">
      <nav>
        <Link to="/" className="title">
          <img src={ownImg} alt='home' className="img-fluid"/>
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li>
            <NavLink to="/cv">curriculum vitae</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </div>

  );
};