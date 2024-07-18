import { useSelector } from 'react-redux';
import css from '../WaterDailyNorma/WaterDailyNorma.module.css';
import { selectUserWaterNorm } from '../../redux/user/selectors';

export default function WaterDailyNorma() {
  const countWater = useSelector(selectUserWaterNorm);

  return (
    <div className={css.container}>
      <p className={css.waterCount}>{countWater} L</p>
      <p className={css.text}>My daily norma</p>
    </div>
  );
}
