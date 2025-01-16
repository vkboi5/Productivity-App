import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ isLoggedIn, handleLogout }) => (
  <nav className={styles.navbar}>
    <div className={styles.logo}>
      <Link to="/" className={styles.navLink}>
        Productivity Hub
      </Link>
    </div>
    <div className={styles.navItems}>
      {isLoggedIn ? (
        <>
          <div className={styles.avatar}></div>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className={styles.navLink}>
            Login
          </Link>
          <Link to="/register" className={styles.navLink}>
            Register
          </Link>
        </>
      )}
    </div>
  </nav>
);

export default Navbar;
