import { Link } from 'react-router-dom';

import css from './Logo.module.css';

const Logo = () => {
  return (
    <div className={css.logo}>
      <Link className={css.link} to="/">
        <b>aquatrack</b>
      </Link>
    </div>
  );
};

export default Logo;
