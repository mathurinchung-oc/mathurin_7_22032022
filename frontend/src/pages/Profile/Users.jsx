import { useSelector } from 'react-redux';
import { UserCard } from '../../components/User';
import { isEmpty } from '../../utils';

function Users() {
  const users = useSelector(state => state.user.all);

  return (
    <main id="Users">
      {
        !isEmpty(users[0]) ? (
        <ul>
          { users.map(user => !user.admin && <li key={ user.id }><UserCard user={ user } /></li>) }
        </ul>
        ) : (
        <div className="message">
          <p>Aucun utilisateur</p>
        </div>
        )
      }
    </main>
  );
}

export default Users;
