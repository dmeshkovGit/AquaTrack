import css from '../WaterMainInfo/WaterMainInfo.module.css';
import WaterDailyNorma from '../../components/WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../../components/WaterProgressBar/WaterProgressBar';
import AddWaterBtn from '../../shared/components/AddWaterBtn/AddWaterBtn';
import Logo from '../../shared/components/Logo/Logo';

export default function WaterMainInfo() {
  return (
    <div className={css.WaterMainInfoContainer}>
      <div className={css.logoWraper}>
        <Logo />
      </div>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
}
