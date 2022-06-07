import { User } from '.';

function UserBanner({ user }) {
  return (
    <div className="UserBanner">
      <User user={ user } />
      <p className="UserBio">{ user.bio }</p>
    </div>
  );
}

export default UserBanner;
