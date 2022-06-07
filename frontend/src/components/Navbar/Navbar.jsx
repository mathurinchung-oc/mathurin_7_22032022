import { NavLink } from 'react-router-dom';
import { DropMenu } from '.';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
// import ModalProfile from '../Profile/ModalProfile';

function Navbar() {
  return (
    <nav className="Navbar">
      <ul className="NavList">
        <li id="users" className="NavItem"><NavLink className="NavLink" to="/users"><FontAwesomeIcon icon="fa-solid fa-users" /></NavLink></li>
        <li id="home" className="NavItem"><NavLink className="NavLink" to="/"><FontAwesomeIcon icon="fa-solid fa-home" /></NavLink></li>
        <li id="edit-post" className="NavItem"><NavLink className="NavLink" to="/compose"><FontAwesomeIcon icon="fa-solid fa-pen" /></NavLink></li>
        <li id="profile" className="NavItem"><DropMenu /></li>
      </ul>
    </nav>
  );
}

export default Navbar;
