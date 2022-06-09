import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComment, deleteComment } from "../../store/actions/post.actions";
import { Button } from "../Buttons";
import { FontAwesomeIcon } from "../FontAwesomeIcon";

function CommentCard({ comment }) {
  const dispatch = useDispatch();
  const { id, admin } = useSelector(state => state.user.currentUser);
  const [ isUpdated, setIsUpdated ] = useState(false);
  const [ commentUpdated, setCommentUpdated ] = useState("");

  const handleUpdateComment = e => {
    e.preventDefault();

    if (commentUpdated !== "") {
      dispatch(updateComment(comment.id, commentUpdated));
      handleCancelUpdate();
    }
  };

  const handleCancelUpdate = () => {
    setCommentUpdated("");
    setIsUpdated(false);
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };

  return (
    <>
      { !isUpdated ? <div>{ comment.comment }</div> : <textarea value={ commentUpdated } onChange={ e => setCommentUpdated(e.target.value) } /> }
      <div>
        { (admin || comment.userId === id) && isUpdated ?
          <>
            <Button click={ handleUpdateComment } btnTitle="valider" btnValue={ <FontAwesomeIcon icon="fa-solid fa-check" /> } />
            <Button click={ handleCancelUpdate } btnTitle="annuler" btnValue={ <FontAwesomeIcon icon="fa-solid fa-xmark" /> } />
          </>
          :
          <>
            <Button click={ () => setIsUpdated(!isUpdated) } btnTitle="modifier" btnValue={ <FontAwesomeIcon icon="fa-solid fa-pen" /> } />
            <Button click={ () => handleDeleteComment(comment.id) } btnTitle="supprimer" btnValue={ <FontAwesomeIcon icon="fa-solid fa-trash-can" /> } />
          </>
        }
      </div>
    </>
  );
}

export default CommentCard;
