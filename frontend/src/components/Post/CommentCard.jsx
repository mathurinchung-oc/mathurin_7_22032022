import { useState } from "react";
import { useSelector } from "react-redux";
import { createComment } from "../../store/actions/post.actions";
import { isEmpty } from "../../utils";
import { ButtonSubmit } from "../Buttons";
import { Form } from "../Form";

function CommentCard({ postId, comments }) {
  const { id } = useSelector(state => state.user.currentUser);
  const [ content, setContent ] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const data = { userId: id, message: content };

    createComment(postId, data);

    setContent("");
  };

  console.log(comments)

  return (
    <div className="Comments">
      <Form submit={ handleSubmit }>
        <textarea placeholder="comment" onChange={ e => setContent(e.target.value) } />
        <ButtonSubmit value="Submit" />
      </Form>
        <ul className="CommentList">
          {
            !isEmpty(comments[0]) && comments.map(comment => {
              <li><div>{ comment.message }</div></li>
            })
          }
        </ul>
    </div>
  );
}

export default CommentCard;
