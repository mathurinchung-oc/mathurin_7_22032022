import { Post } from '.';
import { isEmpty } from "../../utils";

function Feed({ posts }) {
  return (
    <>
      { !isEmpty(posts[0]) ?
          <ul className="Feed">{ posts.map(post => <li key={ post.id }><Post post={ post } /></li>) }</ul>
        :
          <div className="ErrorMessage">
            <p>Aucune publication</p>
          </div>
      }
    </>
  );
}

export default Feed;
