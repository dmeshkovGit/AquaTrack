import styles from './AdvantagesSection.module.css';

export default function AdvantagesSection() {
  return (
    <section className={styles.container}>
      <div className={styles.features}>
        <div className={styles.topRow}>
          <span className={styles.habit}>
            <span className={styles.drive}></span>Habit drive
          </span>
          <span className={styles.view}>View statistics</span>
        </div>
        <span className={styles.personal}>Personal rate setting</span>
      </div>
    </section>
  );
}
