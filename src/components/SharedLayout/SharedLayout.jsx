import { Outlet, Link } from 'react-router-dom';
import './SharedLayout.css';

const SharedLayout = () => {
  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
