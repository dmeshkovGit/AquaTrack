import Icon from '../Icon/Icon';
import clsx from 'clsx';
import css from '../AddWaterBtn/AddWaterBtn.module.css';
import WaterModal from '../../components/WaterModal/WaterModal';
import Modal from '../Modal/Modal';

import { useState } from 'react';

export default function AddWaterBtn({ addStyle }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <button
        className={clsx(css.btn, addStyle && css.addBtnStyle)}
        type="button"
        onClick={() => {
          handleOpenModal();
        }}
      >
        <Icon
          className={clsx(css.icon, addStyle && css.addIconStyle)}
          width="16"
          height="16"
          id="upload"
        />
        Add water
      </button>
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onClose={() => {
            setIsOpenModal(false);
          }}
        >
          <WaterModal />
        </Modal>
      )}
    </>
  );
}
