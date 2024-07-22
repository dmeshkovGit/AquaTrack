import css from './FormulaDescription.module.css';
import { BsExclamationLg } from 'react-icons/bs';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import clsx from 'clsx';

export default function FormulaDescription() {
  const { t, i18n } = useTranslation();
  return (
    <div className={css.formulaWrap}>
      <h3
        className={clsx(css.title, { [css.titleUk]: i18n.language === 'uk' })}
      >
        {t('Daily norma')}
      </h3>
      <div className={css.genderFormulaWrap}>
        <div className={css.genderFormula}>
          <p
            className={clsx(css.formulaText, {
              [css.formulaTextUk]: i18n.language === 'uk',
            })}
          >
            {t('For man')}:
          </p>
          <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
        </div>
        <div className={css.genderFormula}>
          <p
            className={clsx(css.formulaText, {
              [css.formulaTextUk]: i18n.language === 'uk',
            })}
          >
            {t('For woman')}:
          </p>
          <p className={css.formula}>V=(M*0,04) + (T*0,6)</p>
        </div>
      </div>
      <div className={css.textWrap}>
        <p className={clsx(css.text, { [css.textUk]: i18n.language === 'uk' })}>
          <span className={css.accent}>*</span>
          {t('Water description')}
        </p>
      </div>
      <div className={css.notification}>
        <BsExclamationLg className={css.icon} />
        <p
          className={clsx(css.notificationText, {
            [css.notificationTextUk]: i18n.language === 'uk',
          })}
        >
          {t('Active time')}
        </p>
      </div>
    </div>
  );
}
