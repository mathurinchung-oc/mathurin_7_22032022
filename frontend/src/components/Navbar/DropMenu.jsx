import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ButtonDropMenu } from '../Buttons';
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
        <ButtonDropMenu user={ user } />
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
