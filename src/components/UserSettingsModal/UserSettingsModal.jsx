import css from '../UserSettingsModal/UserSettingsModal.module.css';
import UserSettingsForm from '../../components/UserSettingsForm/UserSettingsForm';
import UploadAvatarForm from '../UploadAvatarForm/UploadAvatarForm';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

import clsx from 'clsx';

export default function UserSettingsModal({ isModalOpen }) {
  const { t, i18n } = useTranslation();

  return (
    <div className={css.wrap}>
      <h3
        className={clsx(css.title, { [css.titleUk]: i18n.language === 'uk' })}
      >
        {t('Setting user')}
      </h3>
      <UploadAvatarForm isModalOpen={isModalOpen} />
      <UserSettingsForm isModalOpen={isModalOpen} />
    </div>
  );
}
