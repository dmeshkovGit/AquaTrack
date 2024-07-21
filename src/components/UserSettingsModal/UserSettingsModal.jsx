import css from '../UserSettingsModal/UserSettingsModal.module.css';
import UserSettingsForm from '../../components/UserSettingsForm/UserSettingsForm';
import UploadAvatarForm from '../UploadAvatarForm/UploadAvatarForm';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function ({ isModalOpen }) {
  const { t } = useTranslation();
  return (
    <div className={css.wrap}>
      <h3 className={css.title}>{t('Setting user')}</h3>
      <UploadAvatarForm isModalOpen={isModalOpen} />
      <UserSettingsForm isModalOpen={isModalOpen} />
    </div>
  );
}
