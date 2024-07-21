import css from '../UserSettingsModal/UserSettingsModal.module.css';
import UserSettingsForm from '../../components/UserSettingsForm/UserSettingsForm';
import UploadAvatarForm from '../UploadAvatarForm/UploadAvatarForm';
import { IoIosArrowDown } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import AppSettingsForm from '../AppSettingsForm/AppSettingsForm.jsx';
import clsx from 'clsx';

export default function ({ isModalOpen }) {
  const { t } = useTranslation();

  return (
    <div className={css.wrap}>
      <h3 className={css.title}>{t('Setting user')}</h3>
      <UploadAvatarForm isModalOpen={isModalOpen} />
      <details className={clsx(css.details, css.appDetails)}>
        <summary className={css.summary}>
          App Settings{' '}
          <IoIosArrowDown className={clsx(css.icon, css.appIcon)} />
        </summary>
        <AppSettingsForm />
      </details>
      <details className={clsx(css.details, css.userDetails)} open>
        <summary className={css.summary}>
          User Settings{' '}
          <IoIosArrowDown className={clsx(css.icon, css.userIcon)} />
        </summary>
        <UserSettingsForm isModalOpen={isModalOpen} />
      </details>
    </div>
  );
}
