import { Link } from 'react-router-dom';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
export default function TrackerPage() {
  return (
    <div>
      <WaterMainInfo />
      <WaterDetailedInfo />
      <Link to="/"> Home</Link>
    </div>
  );
}
