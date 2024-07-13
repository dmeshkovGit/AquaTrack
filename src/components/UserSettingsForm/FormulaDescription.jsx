import css from './FormulaDescription.module.css';
import { BsExclamationLg } from 'react-icons/bs';

export default function FormulaDescription() {
  return (
    <div className={css.formulaWrap}>
      <h3 className={css.title}>My daily norma</h3>
      <div className={css.genderFormulaWrap}>
        <div className={css.genderFormula}>
          <p className={css.formulaText}>For man:</p>
          <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
        </div>
        <div className={css.genderFormula}>
          <p className={css.formulaText}>For woman:</p>
          <p className={css.formula}>V=(M*0,04) + (T*0,6)</p>
        </div>
      </div>
      <div className={css.textWrap}>
        <p className={css.text}>
          <span className={css.accent}>*</span> V is the volume of the water
          norm in liters per day, M is your body weight, T is the time of active
          sports, or another type of activity commensurate in terms of loads (in
          the absence of these, you must set 0)
        </p>
      </div>
      <div className={css.notification}>
        <BsExclamationLg className={css.icon} />
        <p className={css.notificationText}>Active time in hours</p>
      </div>
    </div>
  );
}
