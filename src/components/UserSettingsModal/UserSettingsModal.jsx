import css from '../UserSettingsModal/UserSettingsModal.module.css';
import UserSettingsForm from '../../components/UserSettingsForm/UserSettingsForm';
import UploadAvatarForm from '../UploadAvatarForm/UploadAvatarForm';

export default function ({ isModalOpen }) {
  return (
    <div className={css.wrap}>
      <h3 className={css.title}>Setting</h3>
      <UploadAvatarForm isModalOpen={isModalOpen} />
      <UserSettingsForm isModalOpen={isModalOpen} />
    </div>
  );
}
