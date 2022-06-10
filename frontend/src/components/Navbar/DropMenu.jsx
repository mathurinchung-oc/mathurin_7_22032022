import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../Buttons';
import { Avatar } from '../User';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

function DropMenu() {
  const user = useSelector(state => state.user.currentUser);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
    {
      user && 
      <div className="DropMenu">
        <Button type="drop-menu">
          <Avatar avatar={ user.avatar } />
        </Button>
        <ul className="DropList">
          <li className="DropItem"><Link className="DropLink" to={`/profile/${ user.id }`}>Account</Link></li>
          <li className="DropItem" onClick={ logout }>Sign out <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" /></li>
        </ul>
      </div>
    }
    </>
  );
}

export default DropMenu;
