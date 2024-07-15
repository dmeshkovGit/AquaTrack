import css from '../WaterModal/WaterModal.module.css';
import WaterForm from '../WaterForm/WaterForm';

export default function WaterModal({ operationAdd }) {
  return (
    <div className={css.container}>
      <h1 className={css.header}>
        {operationAdd ? 'Add water' : 'Edit the entered amount of water'}
      </h1>

      <WaterForm />
    </div>
  );
}
