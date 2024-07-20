import css from '../WaterLoader/WaterLoader.module.css';

export const WaterLoader = () => {
  return (
    <div className={css.loaderWrapper}>
      <div className={css.loader}></div>
    </div>
  );
};
