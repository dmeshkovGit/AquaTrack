import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';

export default function SharedLayout({ children }) {
  const isLoggedIn = true;
  return (
    <div>
      {!isLoggedIn && <AdvantagesSection />}
      {children}
    </div>
  );
}
