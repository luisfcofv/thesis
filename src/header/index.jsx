import React from 'react';

import './index.css';

const logoUrl = 'http://www.ru.is/skin/basic9k/i/sitelogo.svg';

function Header() {
  return (
    <div className="Header">
      <div className="Logo-container">
        <img src={logoUrl} className="Logo" alt="logo" />
      </div>
      <div className="Title-container">
        <h1>Event Generator</h1>
      </div>
      <div className="Authors-section">
        <p className="Author">Luis Flores</p>
        <p className="Author">David Thue</p>
      </div>
    </div>
  );
}

export default Header;
