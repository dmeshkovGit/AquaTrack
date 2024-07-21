import clsx from 'clsx';
import css from './SharedLayout.module.css';
import { Toaster } from 'react-hot-toast';

export default function SharedLayout({ children }) {
  return (
    <div className={clsx(css.container, 'lightTheme')}>
      {children}
      <Toaster />
    </div>
  );
}
