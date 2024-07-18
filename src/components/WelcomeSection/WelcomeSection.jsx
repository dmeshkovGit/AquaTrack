// import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';
import css from './WelcomeSection.module.css';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function WelcomeSection() {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <div className={css.logo}>
        <Logo />
      </div>
      <div className={css.titles}>
        <h2 className={css.subtitle}>{t('Daily record')}</h2>
        <h1 className={css.title}>{t('Water tracker')}</h1>
      </div>
      <div className={css.buttons}>
        <Link to="/signup" className={css.tryTracker}>
          {t('Register user')}
        </Link>
        <Link to="/signin" className={css.signIn}>
          {t('Login user')}
        </Link>
      </div>
    </div>
  );
}
