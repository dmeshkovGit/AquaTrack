import css from '../WaterModal/WaterModal.module.css';
import WaterForm from '../WaterForm/WaterForm';

import { useTranslation } from 'react-i18next';
import '../../../translate/index.js';

import clsx from 'clsx';

// export default function WaterModal({ operationType }) {

//   const getTitle = (type) =>
//     type === "add"
//       ? "Add water"
//       : "Edit the entered amount of water";

//   return (
//     <div className={css.modal}>
//       <h1 className={css.title}> {getTitle(operationType)} </h1>
//       <WaterForm operationType={operationType}/>

export default function WaterModal({
  operationAdd,
  isOpen,
  waterId,
  waterAmount,
  waterTime,
  addForActiveDay,
}) {
  const { t, i18n } = useTranslation();

  return (
    <div className={css.container}>
      <h1
        className={clsx(css.header, { [css.headerUk]: i18n.language === 'uk' })}
      >
        {operationAdd ? t('Add water') : t('Edit amount')}
      </h1>

      <WaterForm
        isOpen={isOpen}
        operationAdd={operationAdd}
        waterId={waterId}
        waterAmount={waterAmount}
        waterTime={waterTime}
        addForActiveDay={addForActiveDay}
      />
    </div>
  );
}
