// import React from 'react';
import { Link } from 'react-router-dom';
// import Logo from '../../shared/components/Logo/Logo';
import styles from './WelcomeSection.module.css';

export default function WelcomeSection() {
  return (
    <div className={styles.container}>
      {/* <Logo /> */}
      <div className={styles.titles}>
        <h2 className={styles.subtitle}>Record daily water intake and track</h2>
        <h1 className={styles.title}>Water consumption tracker</h1>
      </div>
      <div className={styles.buttons}>
        <Link to="/signup" className={styles.tryTracker}>Try tracker</Link>
        <Link to="/signin" className={styles.signIn}>Sign In</Link>
      </div>
    </div>
  );
}
