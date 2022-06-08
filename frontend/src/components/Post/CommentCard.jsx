import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/actions/post.actions";
import { isEmpty } from "../../utils";
import { ButtonSubmit } from "../Buttons";
import { Form } from "../Form";

function CommentCard({ postId, comments }) {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.user.currentUser);
  const [ comment, setComment ] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const data = { userId: id, comment };

    dispatch(createComment(postId, data));

    setComment("");
  };

  console.log(comments)

  return (
    <div className="Comments">
      <Form submit={ handleSubmit }>
        <textarea placeholder="comment" value={ comment } onChange={ e => setComment(e.target.value) } />
        <ButtonSubmit value="Submit" />
      </Form>
        <ul className="CommentList">
          {
            !isEmpty(comments[0]) && comments.map(comment => {
              <li key={ comment.id }><div>{ comment.comment }</div></li>
            })
          }
        </ul>
    </div>
  );
}

export default CommentCard;
