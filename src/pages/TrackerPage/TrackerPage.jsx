import css from '../TrackerPage/TrackerPage.module.css';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from '../../redux/user/operations';

export default function TrackerPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <div className={css.trackerContainer}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
}
