import { useState } from 'react';
import css from '../UserBarPopover/UserBarPopover.module.css';
import UserSettingsModal from '../../components/UserSettingsModal/UserSettingsModal';
import LogOutModal from '../../components/LogOutModal/LogOutModal';

export default function UserBarPopover() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  return (
    <div>
      {isSettingsModalOpen && (
        <Modal>
          <UserSettingsModal />
        </Modal>
      )}
      {isLogOutModalOpen && (
        <Modal>
          <LogOutModal />
        </Modal>
      )}
    </div>
  );
}
