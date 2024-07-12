import { useState } from 'react';
import css from '../WaterItem/WaterItem.module.css';
import WaterModal from '../../shared/components/WaterModal/WaterModal';
import Modal from '../../shared/components/Modal/Modal';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal';

export default function WaterItem() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <li>
      WaterItem
      {isEditModalOpen && (
        <Modal>
          <WaterModal />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal>
          <DeleteWaterModal />
        </Modal>
      )}
    </li>
  );
}
