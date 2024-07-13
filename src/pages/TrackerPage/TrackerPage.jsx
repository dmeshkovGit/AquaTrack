import { Link } from 'react-router-dom';
import css from '../TrackerPage/TrackerPage.module.css';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
export default function TrackerPage() {
  return (
    <div className={css.trackerContainer}>
      <WaterMainInfo />
      <WaterDetailedInfo />
      <Link to="/"> Home</Link>
    </div>
  );
}
