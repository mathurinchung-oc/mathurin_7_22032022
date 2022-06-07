import { useSelector } from 'react-redux';
import { Avatar } from '.';
import { ButtonEditProfile } from '../Buttons';

function User({ user }) {
  const { id } = useSelector(state => state.user.currentUser);
  const isOwner = user.id === id;
  // const isFollowing = false;

  return (
    <>
    { user &&
    <div className="UserContainer">
      <Avatar avatar={ user.avatar } />
      <div className="UserInfo">
        <h3 className="DisplayName">{ user.fullname }</h3>
        { isOwner && <ButtonEditProfile class="btn-user edit-profile" />}
        {/* : !isFollowing ? <ButtonFollow /> : <ButtonUnfollow /> */}
      </div>
    </div>
    }
    </>
  );
}

export default User;
