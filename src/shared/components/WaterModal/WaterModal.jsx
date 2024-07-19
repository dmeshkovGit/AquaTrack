import css from '../WaterModal/WaterModal.module.css';
import WaterForm from '../WaterForm/WaterForm';

import { useTranslation } from 'react-i18next';
import '../../../translate/index.js';

// export default function WaterModal({ operationType }) {

//   const getTitle = (type) =>
//     type === "add"
//       ? "Add water"
//       : "Edit the entered amount of water";

//   return (
//     <div className={css.modal}>
//       <h1 className={css.title}> {getTitle(operationType)} </h1>
//       <WaterForm operationType={operationType}/>

export default function WaterModal({ operationAdd, isOpen }) {
  const { t } = useTranslation();
  return (
    <div className={css.container}>
      <h1 className={css.header}>
        {operationAdd ? t('Add water') : t('Edit amount')}
      </h1>

      <WaterForm isOpen={isOpen} />
    </div>
  );
}
