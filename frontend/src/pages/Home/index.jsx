import { useSelector } from 'react-redux';
import { EditPost, Feed } from '../../components/Post';

function Home() {
  const posts = useSelector(state => state.post.all);

  return (
    <main id="Home">
      <EditPost />
      <Feed posts={ posts } />
    </main>
  );
}

export default Home;
