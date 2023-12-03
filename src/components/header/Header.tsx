import './header.scss';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className="nav__form">
          Home
        </NavLink>
        <NavLink to="/form" className="nav__form">
          Form
        </NavLink>
        <NavLink to="/form-hook" className="nav__form">
          Hook-Form
        </NavLink>
      </nav>
    </header>
  );
};
export default Header;
