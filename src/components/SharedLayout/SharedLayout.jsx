import css from './SharedLayout.module.css';
import { Toaster } from 'react-hot-toast';

export default function SharedLayout({ children }) {
  return (
    <div className={css.container}>
      {children}
      <Toaster />
    </div>
  );
}
