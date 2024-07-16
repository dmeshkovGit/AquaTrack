// import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';
import css from './WelcomeSection.module.css';

export default function WelcomeSection() {
  return (
    <div className={css.container}>
      <div className={css.logo}>
        <Logo />
      </div>
      <div className={css.titles}>
        <h2 className={css.subtitle}>Record daily water intake and track</h2>
        <h1 className={css.title}>Water consumption tracker</h1>
      </div>
      <div className={css.buttons}>
        <Link to="/signup" className={css.tryTracker}>
          Try tracker
        </Link>
        <Link to="/signin" className={css.signIn}>
          Sign In
        </Link>
      </div>
    </div>
  );
}
