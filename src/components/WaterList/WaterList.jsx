import css from '../WaterList/WaterList.module.css';
import WaterItem from '../../components/WaterItem/WaterItem';

export default function WaterList() {
  return (
    <div className={css.daily_info_container}> <WaterItem /> </div>
  );
}
