import css from '../WaterMainInfo/WaterMainInfo.module.css';
import WaterDailyNorma from '../../components/WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from '../../components/WaterProgressBar/WaterProgressBar';
import AddWaterBtn from '../../shared/components/AddWaterBtn/AddWaterBtn';
import Modal from '../../shared/components/Modal/Modal';
import WaterModal from '../../shared/components/WaterModal/WaterModal';
import { useState } from 'react';

export default function WaterMainInfo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={css.WaterMainInfoContainer}>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
      {isOpen && (
        <Modal>
          <WaterModal />
        </Modal>
      )}
    </div>
  );
}
