import "./navbar.less";
export interface NavbarProps {}

const Navbar: React.SFC<NavbarProps> = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar__logo">
        Adventure <br />
        Tracker
      </h2>
      <ul className="navbar__nav-list">
        <li className="nav-list__item">
          <a className="nav-link">Discover</a>
        </li>
        <li className="nav-list__item">
          <a className="nav-link">About Us</a>
        </li>
        <li className="nav-list__item">
          <a className="nav-link">Contact</a>
        </li>
      </ul>
      <ul className="navbar__auth-list">
        <li className="auth-list__item">
          <a className="auth-link">Sign up</a>
        </li>
        <li className="auth-list__item">
          <a className="auth-link">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
