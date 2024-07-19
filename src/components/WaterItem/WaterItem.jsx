import { useState, useEffect } from 'react';
import css from '../WaterItem/WaterItem.module.css';
import WaterModal from '../../shared/components/WaterModal/WaterModal';
import Modal from '../../shared/components/Modal/Modal';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal';
import Icon from '../../shared/components/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { getDayWater } from '../../redux/water/operations';
import { selectDayWater } from '../../redux/water/selectors';
import { unixParser } from '../../helpers/validationsHelper.js';

export default function WaterItem() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWaterId, setSelectedWaterId] = useState(null);
  const [selectedWaterAmount, setSelectedWaterAmount] = useState(null);
  const [selectedWaterTime, setSelectedWaterTime] = useState(null);

  const dispatch = useDispatch();

  const dataWaterOfDay = useSelector(selectDayWater);

  console.log(dataWaterOfDay);

  useEffect(() => {
    dispatch(getDayWater());
  }, [dispatch]);

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
                  <strong>{water.amount} ml</strong>
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
        <p>No data available</p>
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
