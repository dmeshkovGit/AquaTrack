import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import WaterLoader from '../WaterLoader/WaterLoader.jsx';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../../redux/water/selectors.js';

export default function Modal({ children, isOpen, onClose, btnClassName }) {
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add('modalIsOpen');
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove('modalIsOpen');
      document.removeEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.classList.remove('modalIsOpen');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      {createPortal(
        <div className={css.backdrop} onClick={onClose}>
          <div className={css.modalWrapper}>
            {isLoading && <WaterLoader />}{' '}
            <div className={css.modal} onClick={e => e.stopPropagation()}>
              <button
                className={clsx(css.closeButton, btnClassName)}
                onClick={onClose}
              >
                <Icon
                  id="x-close"
                  width="24"
                  height="24"
                  className={css.closeIcon}
                />
              </button>
              {children}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
