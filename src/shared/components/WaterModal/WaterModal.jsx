import css from '../WaterModal/WaterModal.module.css';
import WaterForm from '../WaterForm/WaterForm';

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
}) {
  return (
    <div className={css.container}>
      <h1 className={css.header}>
        {operationAdd ? 'Add water' : 'Edit the entered amount of water'}
      </h1>

      <WaterForm
        isOpen={isOpen}
        operationAdd={operationAdd}
        waterId={waterId}
        waterAmount={waterAmount}
        waterTime={waterTime}
      />
    </div>
  );
}
