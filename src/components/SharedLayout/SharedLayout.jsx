import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import styles from './SharedLayout.module.css';

export default function SharedLayout({ children }) {
  const isLoggedIn = false;
  return (
    <div className={styles.container}>
      {children}
      {!isLoggedIn && <AdvantagesSection />}
    </div>
  );
}
