import MonthInfo from '../../components/MonthInfo/MonthInfo';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';

export default function HomePage() {
  return (
    <div>
      <WelcomeSection />
      <AdvantagesSection />
      <MonthInfo />
    </div>
  );
}
