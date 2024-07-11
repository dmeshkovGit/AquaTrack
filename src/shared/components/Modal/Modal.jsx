import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

export default function Modal({ children, isOpen, onClose }) {
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
            <button className={css.closeButton} onClick={onClose}>
              &times;
            </button>
            {children}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
