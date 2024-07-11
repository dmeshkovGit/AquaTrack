import css from './Btn.module.css';
export default function Btn({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
