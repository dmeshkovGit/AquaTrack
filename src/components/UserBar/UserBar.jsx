import css from '../UserBar/UserBar.module.css';
import UserBarPopover from '../../components/UserBarPopover/UserBarPopover';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx';
import { Popover } from 'react-tiny-popover';
import { useState } from 'react';
import Modal from '../../shared/components/Modal/Modal';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import LogOutModal from '../LogOutModal/LogOutModal';
import clsx from 'clsx';

export default function UserBar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  return (
    <>
      <Popover
        isOpen={isPopoverOpen}
        positions={['bottom']}
        onClickOutside={() => setIsPopoverOpen(!isPopoverOpen)}
        content={
          <UserBarPopover
            closePopover={setIsPopoverOpen}
            openLogoutModal={setIsLogOutModalOpen}
            openSettingModal={setIsSettingsModalOpen}
          />
        }
        containerClassName={css.popover}
      >
        <button
          type="button"
          className={css.btn}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <p className={css.name}>Username</p>
          <RxAvatar size={38} className={css.icon} />
          <IoIosArrowDown
            className={clsx(css.icon, isPopoverOpen && css.iconUp)}
          />
        </button>
      </Popover>
      {isSettingsModalOpen && (
        <Modal
          isOpen={isSettingsModalOpen}
          onClose={() => {
            document.body.style.overflow = 'auto';
            setIsSettingsModalOpen(false);
          }}
        >
          <UserSettingsModal />
        </Modal>
      )}
      {isLogOutModalOpen && (
        <Modal
          isOpen={isLogOutModalOpen}
          onClose={() => {
            document.body.style.overflow = 'auto';
            setIsLogOutModalOpen(false);
          }}
          btnClassName={css.modalCloseButton}
        >
          <LogOutModal isModalOpen={setIsLogOutModalOpen} />
        </Modal>
      )}
    </>
  );
}
