import "./navbar.less";
//@ts-ignore
import mobileMenu from "static/mobile-menu.png";
export interface NavbarProps {
  setMenuActive: Function;
  isMenuActive: boolean;
}

const Navbar: React.SFC<NavbarProps> = ({setMenuActive, isMenuActive}) => {
  return (
    <nav className="navbar">
      <h2 className="navbar__logo">
        Adventure <br />
        Tracker
      </h2>
      <ul className="navbar__nav-list" aria-label="menu">
        <li className="nav-list__item" role="menuitem" tabIndex={0}>
          <a href="#discover" className="nav-link">
            Discover
          </a>
        </li>
        <li className="nav-list__item" role="menuitem" tabIndex={0}>
          <a href="#about" className="nav-link">
            About Us
          </a>
        </li>
        <li className="nav-list__item" role="menuitem" tabIndex={0}>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
      <ul className="navbar__auth-list" aria-label="menu">
        <li className="auth-list__item" role="menuitem" tabIndex={0}>
          <a className="auth-link" href="/map">
            Sign up
          </a>
        </li>
        <li className="auth-list__item" role="menuitem" tabIndex={0}>
          <a className="auth-link">Login</a>
        </li>
      </ul>
      <button
        className="nav__mobile-menu-btn"
        onClick={() => setMenuActive((prevState: boolean) => !prevState)}
      >
        {isMenuActive ? (
          <div className="mobile-menu__content-x">X</div>
        ) : (
          <img
            src={mobileMenu}
            className="mobile-menu__content-ham"
            alt="navigation menu closed"
          />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
