import { NavLink } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import css from '../SignUpPage/SignUpPage.module.css';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import clsx from 'clsx';

export default function SignUpPage() {
  const { t, i18n } = useTranslation();
  return (
    <div className={css.desctopContainer}>
      <div className={css.container}>
        <div className={css.logo}>
          <Logo />
        </div>
        <div className={css.content}>
          <h2
            className={clsx(css.title, {
              [css.titleUk]: i18n.language === 'uk',
            })}
          >
            {t('Register user form')}
          </h2>
          <SignUpForm />
          <p
            className={clsx(css.notify, {
              [css.notifyUk]: i18n.language === 'uk',
            })}
          >
            {t('Already have')}{' '}
            <NavLink
              className={clsx(css.navLink, {
                [css.navLinkUk]: i18n.language === 'uk',
              })}
              to="/signin"
            >
              {t('Login user')}
            </NavLink>
          </p>
        </div>
      </div>
      <div className={css.advantagesSection}>
        <AdvantagesSection />
      </div>
    </div>
  );
}
