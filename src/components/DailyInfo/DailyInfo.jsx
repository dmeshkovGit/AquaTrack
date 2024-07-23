import css from '../DailyInfo/DailyInfo.module.css';
import ChooseDate from '../../components/ChooseDate/ChooseDate';
import AddWaterBtn from '../../shared/components/AddWaterBtn/AddWaterBtn';
import Modal from '../../shared/components/Modal/Modal';
import WaterModal from '../../shared/components/WaterModal/WaterModal';
import { useState } from 'react';
import WaterList from '../../components/WaterList/WaterList';

export default function DailyInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.container}>
      <div className={css.container_top_daily_info}>
        <ChooseDate />
        <AddWaterBtn WaterDetailedInfoStyles={true} addForActiveDay={true} />
      </div>

      {isOpen && (
        <Modal>
          <WaterModal />
        </Modal>
      )}
      <WaterList />
    </div>
  );
}
