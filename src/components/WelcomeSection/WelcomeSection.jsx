// import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';
import css from './WelcomeSection.module.css';
import clsx from 'clsx';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function WelcomeSection() {
  const { t, i18n } = useTranslation();

  return (
    <div className={css.container}>
      <div className={css.logo}>
        <Logo />
      </div>
      <div className={css.titles}>
        <h2
          className={clsx(css.subtitle, {
            [css.subtitleUk]: i18n.language === 'uk',
          })}
        >
          {t('Daily record')}
        </h2>
        <h1
          className={clsx(css.title, { [css.titleUk]: i18n.language === 'uk' })}
        >
          {t('Water tracker')}
        </h1>
      </div>
      <div className={css.buttons}>
        <Link
          to="/signup"
          className={clsx(css.tryTracker, {
            [css.tryTrackerUk]: i18n.language === 'uk',
          })}
        >
          {t('Register user')}
        </Link>
        <Link
          to="/signin"
          className={clsx(css.signIn, {
            [css.signInUk]: i18n.language === 'uk',
          })}
        >
          {t('Login user')}
        </Link>
      </div>
    </div>
  );
}
