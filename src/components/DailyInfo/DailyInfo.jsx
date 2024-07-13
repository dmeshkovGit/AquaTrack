import css from '../DailyInfo/DailyInfo.module.css';
import ChooseDate from '../../components/ChooseDate/ChooseDate';
import AddWaterBtn from '../../shared/components/AddWaterBtn/AddWaterBtn';
import Modal from '../../shared/components/Modal/Modal';
import WaterModal from '../../shared/components/WaterModal/WaterModal';
import { useState } from 'react';
import WaterList from '../../components/WaterList/WaterList';

export default function DailyInfo() {
  const [isOpen, serIsOpen] = useState(false);
  return (
    <div>
      <ChooseDate />
      <AddWaterBtn addStyle={true} />
      {isOpen && (
        <Modal>
          <WaterModal />
        </Modal>
      )}
      <WaterList />
    </div>
  );
}
