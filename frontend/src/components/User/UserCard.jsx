import { Link } from 'react-router-dom';
import { User } from '.';
// import { ButtonFollow } from '../Buttons';

function UserCard({ user }) {
  const data = user

  return (
    <Link className="UserCard" to={`/profile/${data.id}`}>
      <User user={ data } />
      {/* <ButtonFollow /> */}
    </Link>
  );
}

export default UserCard;
