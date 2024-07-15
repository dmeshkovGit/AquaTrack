import css from '../WaterForm/WaterForm.module.css';

export default function WaterForm({ operationType }) {
  return <div>
    {operationType === "add" ? ( <h2> Тут буде форма для додавання води</h2>) 
    : <h2> Тут буде форма для редагуання води</h2>}
  </div>;
}
