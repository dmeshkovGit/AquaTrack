import Icon from '../Icon/Icon';
import clsx from 'clsx';
import css from '../AddWaterBtn/AddWaterBtn.module.css';
import WaterModal from '../../components/WaterModal/WaterModal';
import Modal from '../Modal/Modal';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../translate/index.js';

export default function AddWaterBtn({
  WaterDetailedInfoStyles,
  addForActiveDay,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { t, i18n } = useTranslation();

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <button
        className={clsx(css.btn, WaterDetailedInfoStyles && css.addBtnStyle, {
          [css.btnUk]: i18n.language === 'uk',
        })}
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
        {t('Add water')}
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
            addForActiveDay={addForActiveDay}
          />
        </Modal>
      )}
    </>
  );
}
