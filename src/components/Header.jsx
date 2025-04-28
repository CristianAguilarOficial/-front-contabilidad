import React from 'react';
import LogoBasicWebOriginal from '../assets/images/Logo-BasicWebBeta-original.png';
import '../styles/Header.css';
import DarkModeToggle from './DarkModeToggle';
function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={LogoBasicWebOriginal} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#">Sobre Nosotros</a>
          </li>
          <li>
            <a href="#">Servicios</a>
          </li>
          <li>
            <a href="#">Contacto</a>
          </li>
          <li>
            <DarkModeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Header;
