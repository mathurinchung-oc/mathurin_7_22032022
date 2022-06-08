import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, updateComment, deleteComment } from "../../store/actions/post.actions";
import { isEmpty } from "../../utils";
import { Button, ButtonSubmit } from "../Buttons";
import { FontAwesomeIcon } from "../FontAwesomeIcon";
import { Form } from "../Form";

function CommentCard({ postId, comments }) {
  const dispatch = useDispatch();
  const { id, admin } = useSelector(state => state.user.currentUser);
  const [ comment, setComment ] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const data = { userId: id, comment };

    dispatch(createComment(postId, data));

    setComment("");
  };

  const handleUpdateComment = () => {
    dispatch(updateComment())
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment(postId));
  };

  console.log(comments)

  return (
    <div className="Comments">
      <Form submit={ handleSubmit }>
        <textarea placeholder="comment" value={ comment } onChange={ e => setComment(e.target.value) } />
        <ButtonSubmit value="Submit" />
      </Form>

        { !isEmpty(comments[0]) ? 
          <ul className="CommentList">
            { comments.map((comment, index) => (
              <li key={ index }>
                <div>{ comment.comment }</div>
                { (admin || comment.userId === id) && <Button click={ handleUpdateComment } btnValue={ <FontAwesomeIcon icon="fa-solid fa-pen" /> } /> }
                { (admin || comment.userId === id) && <Button click={ handleDeleteComment } btnValue={ <FontAwesomeIcon icon="fa-solid fa-xmark" /> } /> }
              </li>
            )) }
          </ul>
          : null
        }
    </div>
  );
}

export default CommentCard;
