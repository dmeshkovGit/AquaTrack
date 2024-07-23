import css from '../DotLoader/DotLoader.module.css';

export default function DotLoader({ text }) {
  return (
    <div className={css.loaderContainer}>
      {text}
      <div className={css.loaderWrapper}>
        <div className={css.loader}></div>
      </div>
    </div>
  );
}
