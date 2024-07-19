import css from '../AuthLoader/AuthLoader.module.css';

export default function AuthLoader() {
  return (
    <div className={css.loaderContainer}>
      Loading
      <div className={css.loaderWrapper}>
        <div className={css.loader}></div>
      </div>
    </div>
  );
}
