import css from '../WaterMainInfo/WaterMainInfo.module.css';
import WaterDailyNorma from '../../components/WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../../components/WaterProgressBar/WaterProgressBar';
import AddWaterBtn from '../../shared/components/AddWaterBtn/AddWaterBtn';

export default function WaterMainInfo() {
  return (
    <div className={css.WaterMainInfoContainer}>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
}
