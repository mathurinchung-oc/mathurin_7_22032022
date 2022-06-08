import { useSelector } from 'react-redux';
import { PostCard } from '.';
import { isEmpty } from "../../utils";

function Feed() {
  const posts = useSelector(state => state.post.all);

  // useEffect(() => {
    // if (!isEmpty(posts[0])) {
    //   const postsArr = Object.keys(posts).map(i => posts[i]);
      // let sortedArray = postsArr.sort((a, b) => {
      //   return b.likers.length - a.likers.length;
      // });
      // sortedArray.length = 3;
      // dispatch(getTrends(sortedArray));
    // }
  // }, [posts, dispatch]);

  return (
    <>
    { !isEmpty(posts[0]) ?
       <ul className="Feed">
        {   posts.map(post => <li key={ post.id }><PostCard post={ post } /></li>) }
       </ul>
       :
      <div className="ErrorMessage">
        <p>Aucune publication</p>
      </div>
    }
    </>
  );
}

export default Feed;
