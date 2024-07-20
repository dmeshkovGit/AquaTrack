import { Link } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';
import SignInForm from '../../components/SignInForm/SignInForm';
import css from '../SignInPage/SignInPage.module.css';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function SignIpPage() {
  const { t } = useTranslation();
  return (
    <div className={css.desctopContainer}>
      <div className={css.container}>
        <div className={css.logo}>
          <Logo />
        </div>
        <div className={css.content}>
          <h2 className={css.title}>{t('Sign in')}</h2>
          <SignInForm />
          <p className={css.notify}>
            {t('Do not')}{' '}
            <Link className={css.navLink} to="/signup">
              {t('Register user form')}
            </Link>
          </p>
        </div>
      </div>
      <div className={css.advantagesSection}>
        <AdvantagesSection />
      </div>
    </div>
  );
}
