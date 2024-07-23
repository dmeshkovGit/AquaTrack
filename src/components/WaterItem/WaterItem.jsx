import { useState } from 'react';
import css from '../WaterItem/WaterItem.module.css';
import WaterModal from '../../shared/components/WaterModal/WaterModal';
import Modal from '../../shared/components/Modal/Modal';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal';
import Icon from '../../shared/components/Icon/Icon';
import { useSelector } from 'react-redux';
import { selectDayWater } from '../../redux/water/selectors';
import { unixParser } from '../../helpers/validationsHelper.js';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import clsx from 'clsx';

export default function WaterItem() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWaterId, setSelectedWaterId] = useState(null);
  const [selectedWaterAmount, setSelectedWaterAmount] = useState(null);
  const [selectedWaterTime, setSelectedWaterTime] = useState(null);
  const { t, i18n } = useTranslation();

  const dataWaterOfDay = useSelector(selectDayWater);

  const handleOpenDeleteModal = id => {
    setSelectedWaterId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedWaterId(null);
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (id, amount, date) => {
    setIsEditModalOpen(true);
    setSelectedWaterId(id);
    setSelectedWaterAmount(amount);
    setSelectedWaterTime(date);
  };

  return (
    <>
      {dataWaterOfDay.length > 0 ? (
        <ul className={css.list_water_items}>
          {dataWaterOfDay.map(water => (
            <li key={water._id} className={css.water_item}>
              <div className={css.water_item_content}>
                <Icon
                  className={css.icon_glass_water}
                  width={44}
                  height={45}
                  id="icon-water-glass"
                />
                <div>
                  <strong>
                    {water.amount} {t('Water add')}
                  </strong>
                  <p className={css.date}>{unixParser(water.date)}</p>
                </div>
                <div className={css.container_buttons}>
                  <button
                    className={css.editButton}
                    onClick={() =>
                      handleEdit(water._id, water.amount, water.date)
                    }
                  >
                    {' '}
                    <Icon
                      className={css.svg_edit}
                      width={16}
                      height={16}
                      id="icon-edit"
                    />{' '}
                  </button>
                  <button
                    className={css.deleteButton}
                    onClick={() => handleOpenDeleteModal(water._id)}
                  >
                    {' '}
                    <Icon
                      className={css.svg_delete}
                      width={16}
                      height={16}
                      id="trash"
                    />{' '}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={css.container_without_water}>
          <Icon
            className={css.icon_glass_water}
            width={44}
            height={45}
            id="icon-water-glass"
          />
          <p
            className={clsx(css.text_, {
              [css.text_Uk]: i18n.language === 'uk',
            })}
          >
            {t('Not found')}
          </p>
        </div>
      )}

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
        >
          <WaterModal
            operationType="edit"
            isOpen={setIsEditModalOpen}
            waterId={selectedWaterId}
            waterAmount={selectedWaterAmount}
            waterTime={selectedWaterTime}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
          <DeleteWaterModal
            onClose={handleCloseDeleteModal}
            waterId={selectedWaterId}
          />
        </Modal>
      )}
    </>
  );
}
