import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.target.className === styles.backdrop) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.content}>
        {children}
        <button className={css.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;

// using

//import { useState } from 'react';
// import Modal from 'path/to/Modal';

// const Component = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div >
//       <button onClick={openModal}>Open Modal</button>
//       {isModalOpen && (
//         <Modal onClose={closeModal}>
//           <h2>Modal Title</h2>
//           <p>This is the content inside the modal.</p>
//         </Modal>
//       )}
//     </div>
//   );
// };
