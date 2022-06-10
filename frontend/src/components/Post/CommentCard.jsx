import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateComment, deleteComment } from "../../store/actions/post.actions";
import { Button } from "../Buttons";
import { FontAwesomeIcon } from "../FontAwesomeIcon";
import { Avatar } from "../User";

function CommentCard({ comment }) {
  const dispatch = useDispatch();
  const { id, admin } = useSelector(state => state.user.currentUser);
  const [ isUpdated, setIsUpdated ] = useState(false);
  const [ commentUpdated, setCommentUpdated ] = useState(comment.comment);

  const handleUpdateComment = e => {
    e.preventDefault();

    if (commentUpdated !== "") {
      dispatch(updateComment(comment.id, commentUpdated));
      handleCancelUpdate();
    }
  };

  const handleCancelUpdate = () => {
    setCommentUpdated(comment.comment);
    setIsUpdated(false);
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };

  return (
    <>
      <div className="content">
        <Link to={ "/profile/" + comment.userId }>
          <Avatar avatar={ comment.User.avatar } />
        </Link>
        <div className="comment">
          <h3 className="fullname"> { comment.User.fullname }</h3>
          { !isUpdated ? <p className="content">{ comment.comment }</p>
                       : <textarea className="textarea content" value={ commentUpdated } onChange={ e => setCommentUpdated(e.target.value) } /> }
        </div>
      </div>

      { (admin || comment.userId === id) &&
      <div className="CommentMenu">
      { isUpdated ? <>
        <Button className="submit" click={ handleUpdateComment } title="valider">
          <FontAwesomeIcon icon="fa-solid fa-check" />
        </Button>
        <Button className="cancel" click={ handleCancelUpdate } btnTitle="annuler">
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </Button>
        </> : <>
        <Button className="modify" title="modifier" click={ () => setIsUpdated(!isUpdated) }>
          <FontAwesomeIcon icon="fa-solid fa-pen" />
        </Button>
        <Button className="delete" title="supprimer" click={ () => handleDeleteComment(comment.id) }>
          <FontAwesomeIcon icon="fa-solid fa-trash-can" />
        </Button> </> }
      </div> }
    </>
  );
}

export default CommentCard;
