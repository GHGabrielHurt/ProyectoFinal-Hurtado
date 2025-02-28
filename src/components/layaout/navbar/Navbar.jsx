import React, { useState } from 'react';
import './Navbar.css';
import { CartWidget } from '../../common/CartWidget/CartWidget';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo y Marca */}
      <div className="navbar-brand">
        <div className="logo">
          <Link to="/">
            <img
              className="imagen"
              src="https://e7.pngegg.com/pngimages/996/491/png-clipart-shopify-e-commerce-logo-web-design-design-web-design-logo.png"
              alt="logo"
            />
          </Link>
        </div>
      </div>

      {/* Botón de menú hamburguesa */}
      <button className="menu-toggle" onClick={toggleMenu}>
        &#9776; {/* Ícono de hamburguesa */}
      </button>

      {/* Enlaces del Navbar */}
      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" className="nav-link">Inicio</Link></li>
        <li><Link to="/category/deportivas" className="nav-link">Deportivas</Link></li>
        <li><Link to="/category/urbanas" className="nav-link">Urbanas</Link></li>
        <li><Link to="/cart"><CartWidget /></Link></li>
      </ul>
    </nav>
  );
};
