import { useSelector } from 'react-redux';
import { Avatar } from '.';
import { ButtonEditProfile, ButtonDeleteUser } from '../Buttons';

function User({ user }) {
  const { id, admin } = useSelector(state => state.user.currentUser);
  const isOwner = user.id === id;
  // const isFollowing = false;

  return (
    <>
    { user &&
    <div className="UserContainer">
      <Avatar avatar={ user.avatar } />
      <div className="UserInfo">
        <h3 className="DisplayName">{ user.fullname }</h3>
        { isOwner ?
          <ButtonEditProfile class="btn-user edit-profile" />
          :
          admin && <ButtonDeleteUser />
        }
        {/* : !isFollowing ? <ButtonFollow /> : <ButtonUnfollow /> */}
      </div>
    </div>
    }
    </>
  );
}

export default User;
