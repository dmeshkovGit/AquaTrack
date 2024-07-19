import googleLogo from '../../../icons/google-logo.svg';
import css from './GoogleAuthBtn.module.css';
import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';
import '../../../translate/index.js';

export default function GoogleAuthBtn() {
  const { t } = useTranslation();
  return (
    <div className={css.wrapper}>
      <p className={css.separator}>{t('Or google')}</p>
      <motion.a
        whileTap={{ scale: 1 }}
        whileHover={{ scale: 1.03 }}
        href="https://aqua-track.vercel.app/api/auth/google"
        className={css.googleBtn}
      >
        <img src={googleLogo} className={css.googleIcon} />
        <p>{t('Sign google')}</p>
      </motion.a>
    </div>
  );
}
