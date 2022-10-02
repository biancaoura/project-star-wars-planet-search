import React from 'react';
import logo from '../img/logo.png';

export default function Header() {
  return (
    <header className="header">
      <img src={ logo } alt="starwars logo" className="logo" />
      <h1>PLANET SEARCH</h1>
    </header>
  );
}
