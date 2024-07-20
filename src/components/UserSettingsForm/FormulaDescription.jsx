import css from './FormulaDescription.module.css';
import { BsExclamationLg } from 'react-icons/bs';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function FormulaDescription() {
  const { t } = useTranslation();
  return (
    <div className={css.formulaWrap}>
      <h3 className={css.title}>{t('Daily norma')}</h3>
      <div className={css.genderFormulaWrap}>
        <div className={css.genderFormula}>
          <p className={css.formulaText}>{t('For man')}:</p>
          <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
        </div>
        <div className={css.genderFormula}>
          <p className={css.formulaText}>{t('For woman')}:</p>
          <p className={css.formula}>V=(M*0,04) + (T*0,6)</p>
        </div>
      </div>
      <div className={css.textWrap}>
        <p className={css.text}>
          <span className={css.accent}>*</span>
          {t('Water description')}
        </p>
      </div>
      <div className={css.notification}>
        <BsExclamationLg className={css.icon} />
        <p className={css.notificationText}>{t('Active time')}</p>
      </div>
    </div>
  );
}
