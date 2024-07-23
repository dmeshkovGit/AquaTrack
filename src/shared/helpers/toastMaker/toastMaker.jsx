import toast from 'react-hot-toast';
import css from '../toastMaker/toastMaker.module.css';
import Icon from '../../components/Icon/Icon';

export default function toastMaker(text, status) {
  switch (status) {
    case 'succes':
      return toast(t => (
        <div className={css.toastContainer}>
          <Icon id="icon-water-bottle-green" className={css.iconSucces} />
          <span className={css.toastSucces}>{text}</span>
        </div>
      ));

    case 'error':
      return toast(t => (
        <div className={css.toastContainer}>
          <Icon id="icon-water-bottle-red" className={css.iconSucces} />
          <span className={css.toastSucces}>{text}</span>
        </div>
      ));
  }
}
