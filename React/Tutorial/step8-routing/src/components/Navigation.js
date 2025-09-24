import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  const isActive = path => {
    return location.pathname === path;
  };

  return (
    <nav className='navigation'>
      <div className='nav-brand'>
        <Link to='/' className='brand-link'>
          React Router 예제
        </Link>
      </div>

      <ul className='nav-links'>
        <li>
          <Link to='/' className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            홈
          </Link>
        </li>
        <li>
          <Link
            to='/about'
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          >
            소개
          </Link>
        </li>
        <li>
          <Link
            to='/products'
            className={`nav-link ${isActive('/products') ? 'active' : ''}`}
          >
            상품
          </Link>
        </li>
        <li>
          <Link
            to='/contact'
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            연락처
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
