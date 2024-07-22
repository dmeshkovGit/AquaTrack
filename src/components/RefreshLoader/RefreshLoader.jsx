import Logo from '../../shared/components/Logo/Logo';
import css from '../RefreshLoader/RefreshLoader.module.css';
export default function RefreshLoader() {
  return (
    <div className={css.trackerContainer}>
      <div className={css.WaterMainInfoContainer}>
        <div className={css.logoWraper}>
          <Logo />
        </div>
      </div>
      <div className={css.WaterDetailedInfoContainer}></div>
    </div>
  );
}
