import googleLogo from '../../../icons/google-logo.svg';
import css from './GoogleAuthBtn.module.css';
import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';
import '../../../translate/index.js';
import clsx from 'clsx';

export default function GoogleAuthBtn() {
  const { t, i18n } = useTranslation();
  return (
    <div className={css.wrapper}>
      <p
        className={clsx(css.separator, {
          [css.separatorUk]: i18n.language === 'uk',
        })}
      >
        {t('Or google')}
      </p>
      <motion.a
        whileTap={{ scale: 1 }}
        whileHover={{ scale: 1.03 }}
        href="https://aquatrack-api-crcb.onrender.com/api/users/google"
        className={clsx(css.googleBtn, {
          [css.googleBtnUk]: i18n.language === 'uk',
        })}
      >
        <img src={googleLogo} className={css.googleIcon} />
        <p>{t('Sign google')}</p>
      </motion.a>
    </div>
  );
}
