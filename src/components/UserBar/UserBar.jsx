import css from '../UserBar/UserBar.module.css';
import UserBarPopover from '../../components/UserBarPopover/UserBarPopover';
import { IoIosArrowDown } from 'react-icons/io';
import { Popover } from 'react-tiny-popover';
import { useState } from 'react';
import Modal from '../../shared/components/Modal/Modal';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';
import LogOutModal from '../LogOutModal/LogOutModal';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors';
import { RxAvatar } from 'react-icons/rx';

export default function UserBar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const user = useSelector(selectUser);

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
          <p className={css.name}>{user.name ? user.name : 'User'}</p>
          {user.avatarURL ? (
            <img className={css.img} src={user.avatarURL} alt="avatar" />
          ) : (
            <RxAvatar className={css.iconAvatar} />
          )}

          <IoIosArrowDown
            className={clsx(css.icon, isPopoverOpen && css.iconUp)}
          />
        </button>
      </Popover>
      {isSettingsModalOpen && (
        <Modal
          btnClassName={css.settingsClose}
          isOpen={isSettingsModalOpen}
          onClose={() => {
            setIsSettingsModalOpen(false);
          }}
          isModal={isSettingsModalOpen}
        >
          <UserSettingsModal isModalOpen={setIsSettingsModalOpen} />
        </Modal>
      )}
      {isLogOutModalOpen && (
        <Modal
          isOpen={isLogOutModalOpen}
          onClose={() => {
            setIsLogOutModalOpen(false);
          }}
          isModal={isLogOutModalOpen}
        >
          <LogOutModal isModalOpen={setIsLogOutModalOpen} />
        </Modal>
      )}
    </>
  );
}
