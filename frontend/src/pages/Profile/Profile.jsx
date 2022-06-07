import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UserBanner } from '../../components/User';
import { EditProfile } from '../../components/Settings';
import { Feed } from '../../components/Post';
import { isEmpty } from '../../utils';

function Profile() {
  const params = useParams();
  const userId = parseInt(params.userId);

  const users = useSelector(state => state.user.all);
  const user = users.find(user => user.id === userId);
  const posts = useSelector(state => state.post.all);
  const postsUser = posts.filter(post => post.userId === userId);

  return (
    <main id="Profile">
      { user ? <UserBanner user={ user } /> : <div className="ErrorMessage">This user doensn't exist</div> }
      { !isEmpty(postsUser[0]) ? <Feed posts={ postsUser } /> : <div className="ErrorMessage"><p>Aucune publication</p></div>}
      <EditProfile />
    </main>
  );
}

export default Profile;
