import css from '../UserBarPopover/UserBarPopover.module.css';
import Icon from '../../shared/components/Icon/Icon';
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
  return (
    <div className={css.wrap}>
      <button className={css.settingBtn} type="button" onClick={onSettingClick}>
        <Icon
          id="settings"
          width="15"
          height="15"
          className={css.settingIcon}
        />
        Setting
      </button>
      <button className={css.logoutBtn} type="button" onClick={onLogoutClick}>
        <Icon id="logOut" width="15" height="15" className={css.logoutIcon} />
        Log out
      </button>
    </div>
  );
}
