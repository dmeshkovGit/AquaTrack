import styles from './AdvantagesSection.module.css';

export default function AdvantagesSection() {
  return (
    <section className={styles.container}>
      <div className={styles.overlay}>
        <p className={styles.title}>Our happy customers</p>
        <div className={styles.features}>
          <span className={styles.habit}>Habit drive</span>
          <span className={styles.view}>View statistics</span>
          <span className={styles.personal}>Personal rate setting</span>
        </div>
      </div>
    </section>
  );
}
