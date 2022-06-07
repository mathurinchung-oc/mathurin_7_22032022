import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, deletePost } from '../../store/actions/post.actions';
import { Link } from 'react-router-dom';
import { ButtonSubmit } from '../Buttons';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { Avatar } from '../User';
import { CommentCard } from '.';

function PostCard({ post }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const [ isUpdated, setIsUpadted ] = useState(true);
  const [ contentUpdate, setContentUpdate ] = useState("");
  const [ attachmentUpdate, setAttachmentUpdate ] = useState("");
  const [ showComments, setShowComments ] = useState(false);

  const handleMenu = () => {};

  const handleLike = () => {};

  const handleComment = () => {};

  const handleUpdatePost = () => {
    if (contentUpdate || attachmentUpdate) {
      dispatch(updatePost(post.id, { contentUpdate, attachmentUpdate }))
    }

    setIsUpadted(false);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post.id));
  };

  return (
    <article className="post">
      <header>
        <Link className="post-user" to={ `/profile/${ 2 }` }>
          <Avatar avatar="/images/users/avatar.png" />
          <h3>Fullname</h3>
        </Link>
        { (currentUser.admin || currentUser.id === post.userId) && <button className="btn-menu" onClick={ handleMenu }><FontAwesomeIcon icon="fa-solid fa-ellipsis" /></button> }
        { <button onClick={ () => setIsUpadted(!isUpdated) }></button> }
        { <button onClick={ () => handleDeletePost }></button> }
        <div className="post-menu"></div>
      </header>


      { post.attachment === null ?
        <figure className="post-body">
          { isUpdated === false ? <img src={ post.attachment } alt="post attachment" /> : <input type="file" /> }
          <figcaption>
            { isUpdated === false ? <p className="post-content">{ post.content }</p>
              : <div><textarea value={ contentUpdate } onChange={ e => setContentUpdate(e.target.value) } /></div>}
          </figcaption>
        </figure>
      :
        <div className="post-body">
          { isUpdated === false ? <p className="post-content">{ post.content }</p>
            : <div><textarea value={ contentUpdate } onChange={ e => setContentUpdate(e.target.value) } /></div>}
        </div>
      }

      <footer>
        <div className="post-icons">
          <div className="post-icon">
            <FontAwesomeIcon onClick={ handleLike } icon="fa-regular fa-heart" />
            <span>{ post.likes.length }</span>
          </div>
          <div className="post-icon">
            <FontAwesomeIcon onClick={ setShowComments(!showComments) } icon="fa-regular fa-comment" />
            <span>{ post.comments.length }</span>
          </div>
        </div>

        { isUpdated && <ButtonSubmit btnType=".submit" btnValue="Submit" click={ handleUpdatePost } /> }

        <p className="timestamp">il y a 16 secondes</p>
      </footer>

      { showComments && <CommentCard post={ post } /> }
    </article>
  );
}

export default PostCard;
