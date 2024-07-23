import { useNavigate } from 'react-router-dom';
import css from '../SignUpModal/SignUpModal.module.css';
// import toast from 'react-hot-toast';
// import { selectIsLoading } from '../../redux/user/selectors.js';
// import DotLoader from '../../shared/components/DotLoader/DotLoader.jsx';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function SignUpModal() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate('/signin');
  };

  return (
    <div className={css.modal}>
      <h3 className={css.title}>{t('Please verify your email')}</h3>
      <p className={css.text}>
        {t('Check your email to confirm your email address.')}
      </p>
      <div className={css.btnWrap}>
        <button className={css.okBtn} type="button" onClick={handleCancelClick}>
          Ok
        </button>
      </div>
    </div>
  );
}
