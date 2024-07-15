import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import Icon from '../Icon/Icon';

export default function Modal({ children, isOpen, onClose, btnClassName }) {
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {createPortal(
        <div className={css.backdrop} onClick={onClose}>
          <div className={css.modal} onClick={e => e.stopPropagation()}>
            <button
              className={clsx(css.closeButton, btnClassName)}
              onClick={onClose}
            >
              <Icon id="x-close" width="12" height="12" />
            </button>
            {children}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
