import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { DropMenu } from '../Navbar';
import logoDesktop from '../../images/icon-left-font-monochrome-black.svg';
import logoMobile from '../../images/icon-left-font-monochrome-black_globe.svg';

function PrivateHeader() {
  return (
    <header className="PrivateHeader">
      <img className="LogoMobile" src={ logoMobile } alt="logo groupomania" />
      <Link to="/"><img className="LogoDesktop" src={ logoDesktop } alt="logo groupomania" /></Link>
      <nav>
        <ul className="NavList">
          <li className="NavItem" id="users"><NavLink className="NavLink" to="/users"><FontAwesomeIcon icon="fa-solid fa-users" /></NavLink></li>
          <li className="NavItem" id="profile"><DropMenu /></li>
        </ul>
      </nav>
    </header>
  );
};

export default PrivateHeader
