import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dislikePost, likePost } from "../../store/actions/post.actions";
import { Button } from '../Buttons';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

function ButtonLike({ post }) {
  const [liked, setLiked] = useState(false);
  const { id } = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLike = () => {
    if (!liked) {
      dispatch(likePost(post.id, { userId: id }));
      setLiked(true);
    } else {
      dispatch(dislikePost(post.id, { userId: id }));
      setLiked(false)
    }
  };

  useEffect(() => {
    if (post.likes.includes(id)) setLiked(true)
    else setLiked(false);
  }, [ id, post ]);

  return (
    <Button click={ handleLike } btnValue={ liked ? <FontAwesomeIcon icon="fa-solid fa-heart" /> : <FontAwesomeIcon icon="fa-regular fa-heart" /> } />
  );
}

export default ButtonLike;
