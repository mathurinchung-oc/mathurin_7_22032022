import { useSelector } from 'react-redux';
import { Avatar } from '.';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { Button, ButtonDeleteUser } from '../Buttons';

function User({ user }) {
  const { id, admin } = useSelector(state => state.user.currentUser);
  const isOwner = user.id === id;
  // const isFollowing = false;

  const handleClick = () => {
    document.querySelector("#EditProfile").style.display = "block"
  };

  return (
    <>
    { user &&
    <div className="UserContainer">
      <Avatar avatar={ user.avatar } />
      <div className="UserInfo">
        <h3 className="DisplayName">{ user.fullname }</h3>
        { isOwner ? <Button type="btn-user edit-profile" click={ handleClick }><FontAwesomeIcon key="editProfil" icon="fa-solid fa-gear" /> Edit Profile</Button>
                  : admin && <ButtonDeleteUser /> }
        {/* : !isFollowing ? <ButtonFollow /> : <ButtonUnfollow /> */}
      </div>
    </div>
    }
    </>
  );
}

export default User;
