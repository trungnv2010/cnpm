// NavBar.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>MyApp</h1>
      <ul style={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/services"
            style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

// Styles cho NavBar
const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#333',
  },
  logo: {
    color: '#fff',
    fontSize: '1.5rem',
  },
  navLinks: {
    listStyleType: 'none',
    display: 'flex',
    gap: '1rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  activeLink: {
    color: '#4CAF50', // Màu khi link đang active
    textDecoration: 'underline',
  },
};

export default NavBar;
