import css from '../WaterModal/WaterModal.module.css';
import WaterForm from '../WaterForm/WaterForm';

export default function WaterModal({ operationType }) {

  const getTitle = (type) => 
    type === "add" 
      ? "Add water" 
      : "Edit the entered amount of water";
  
  return (
    <div className={css.modal}>
      <h1 className={css.title}> {getTitle(operationType)} </h1>
      <WaterForm operationType={operationType}/>
    </div>
  );
}
