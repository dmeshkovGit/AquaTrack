import css from '../UserBarPopover/UserBarPopover.module.css';
import Icon from '../../shared/components/Icon/Icon';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import clsx from 'clsx';

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
  const { t, i18n } = useTranslation();

  return (
    <div className={css.wrap}>
      <button
        className={clsx(css.settingBtn, {
          [css.settingBtnUk]: i18n.language === 'uk',
        })}
        type="button"
        onClick={onSettingClick}
      >
        <Icon
          id="settings"
          width="15"
          height="15"
          className={css.settingIcon}
        />
        {t('Setting user')}
      </button>
      <button
        className={clsx(css.logoutBtn, {
          [css.logoutBtnUk]: i18n.language === 'uk',
        })}
        type="button"
        onClick={onLogoutClick}
      >
        <Icon id="logOut" width="15" height="15" className={css.logoutIcon} />
        {t('Log out')}
      </button>
    </div>
  );
}
