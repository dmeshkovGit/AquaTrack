import { useState } from 'react';
import css from '../UserBarPopover/UserBarPopover.module.css';
import UserSettingsModal from '../../components/UserSettingsModal/UserSettingsModal';
import LogOutModal from '../../components/LogOutModal/LogOutModal';
import { CiSettings } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import Modal from '../../shared/components/Modal/Modal';

export default function UserBarPopover() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  return (
    <div className={css.wrap}>
      <button
        className={css.settingBtn}
        type="button"
        onClick={() => setIsSettingsModalOpen(true)}
      >
        <CiSettings />
        Setting
      </button>
      <button
        className={css.logoutBtn}
        type="button"
        onClick={() => setIsLogOutModalOpen(true)}
      >
        <IoIosLogOut />
        Log out
      </button>
      {isSettingsModalOpen && (
        <Modal isModal={isSettingsModalOpen} onClose={setIsSettingsModalOpen}>
          <UserSettingsModal />
        </Modal>
      )}
      {isLogOutModalOpen && (
        <Modal isModal={isLogOutModalOpen} onClose={setIsLogOutModalOpen}>
          <LogOutModal />
        </Modal>
      )}
    </div>
  );
}
