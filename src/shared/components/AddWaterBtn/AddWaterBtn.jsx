import Icon from '../Icon/Icon';
import clsx from 'clsx';
import css from '../AddWaterBtn/AddWaterBtn.module.css';
import WaterModal from '../../components/WaterModal/WaterModal';
import Modal from '../Modal/Modal';

import { useState } from 'react';

export default function AddWaterBtn({ WaterDetailedInfoStyles }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <button
        className={clsx(css.btn, WaterDetailedInfoStyles && css.addBtnStyle)}
        type="button"
        onClick={() => {
          handleOpenModal();
        }}
      >
        <Icon
          className={clsx(
            css.icon,
            WaterDetailedInfoStyles && css.addIconStyle,
          )}
          width="16"
          height="16"
          id="icon-plus"
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
          <WaterModal
            operationAdd={true}
            operationType="add"
            isOpen={setIsOpenModal}
          />
        </Modal>
      )}
    </>
  );
}
