import css from '../Modal/Modal.module.css';
import ReactModal from 'react-modal';
ReactModal.setAppElement('body');

export default function Modal({ children, isModal, onClose }) {
  const closeModal = () => {
    onClose(false);
  };
  return (
    <ReactModal
      isOpen={isModal}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      className={css.Modal}
      overlayClassName={css.Overlay}
    >
      {children}
    </ReactModal>
  );
}
