import css from '../WaterDailyNorma/WaterDailyNorma.module.css';

export default function WaterDailyNorma() {
  return (
    <div className={css.container}>
      <p className={css.waterCount}>1.5 L</p>
      <p className={css.text}>My daily norma</p>
    </div>
  );
}
