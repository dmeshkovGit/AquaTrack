import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div lassName={css.container}>
      <Link to="/welcome">Back to home page!</Link>
      <b>Opps! Not Found!</b>
    </div>
  );
}
