import css from '../UserBarPopover/UserBarPopover.module.css';
import Icon from '../../shared/components/Icon/Icon';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function UserBarPopover({
  closePopover,
  openSettingModal,
  openLogoutModal,
}) {
  const onLogoutClick = () => {
    openLogoutModal(true);
    closePopover(false);
  };
  const onSettingClick = () => {
    openSettingModal(true);
    closePopover(false);
  };
  const { t } = useTranslation();

  return (
    <div className={css.wrap}>
      <button className={css.settingBtn} type="button" onClick={onSettingClick}>
        <Icon
          id="settings"
          width="15"
          height="15"
          className={css.settingIcon}
        />
        {t('Setting user')}
      </button>
      <button className={css.logoutBtn} type="button" onClick={onLogoutClick}>
        <Icon id="logOut" width="15" height="15" className={css.logoutIcon} />
        {t('Log out')}
      </button>
    </div>
  );
}
