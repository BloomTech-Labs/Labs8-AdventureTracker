import "./navbar.less";
//@ts-ignore
import mobileMenu from "static/mobile-menu.png";
import Link from "next/link";

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
          <a href="#plan-trip" className="nav-link">
            Plan Trip
          </a>
        </li>
        <li className="nav-list__item" role="menuitem" tabIndex={0}>
          <a href="#share" className="nav-link">
            Share
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
          <Link href={{pathname: "/auth", query: {start: "sign-up"}}}>
            <a className="auth-link">Sign up</a>
          </Link>
        </li>
        <li className="auth-list__item" role="menuitem" tabIndex={0}>
          <Link href={{pathname: "/auth", query: {start: "login"}}}>
            <a className="auth-link">Login</a>
          </Link>
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
