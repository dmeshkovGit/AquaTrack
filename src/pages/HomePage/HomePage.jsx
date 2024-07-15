import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import css from './HomePage.module.css';
export default function HomePage() {
  return (
    <div className={css.homeContainer}>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
}
