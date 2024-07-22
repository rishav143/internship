import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSSModule/NavBar.module.css'
import Button from '@mui/material/Button';
export default function Navbar({ display }) {
  return (
    <div className={styles.container}>
      <div className={styles.item1}><Link to="/"><Button variant="text"><h1>Internship</h1></Button></Link></div>
      <ul className={`${styles.listContainer} ${styles.item}`}>
        <li className={styles.item2}>
          <Link to="/"><Button variant="text">Home</Button></Link>
        </li>
        {display.profile ? (
          <>
            <li className={styles.item2}>
              <Link to="/dashboard"><Button variant="text">Dashboard</Button></Link>
            </li>
            <li className={styles.item2}>
              <Link to="/profile"><Button variant="text">Profile</Button></Link>
            </li>
          </>
        ) : (
          <>
            <li className={styles.item2}>
              <Link to="/login"><Button variant="contained">Login</Button></Link>
            </li>
            <li className={styles.item2}>
              <Link to="/signup"><Button variant="outlined">Sign up</Button></Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}