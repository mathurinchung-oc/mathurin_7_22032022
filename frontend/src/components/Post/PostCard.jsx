import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, deletePost } from '../../store/actions/post.actions';
import { Link } from 'react-router-dom';
import { baseURL } from '../../api';
// import { CommentCard } from '.';
import { Button, ButtonLike, ButtonSubmit } from '../Buttons';
import { FormUpload } from '../Form';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { Avatar } from '../User';
import { isEmpty, dateParser } from '../../utils';

function Post({ post }) {
  const dispatch = useDispatch();
  const { admin, id } = useSelector(state => state.user.currentUser);
  const users = useSelector(state => state.user.all);
  const [ showMenu, setShowMenu ] = useState(false);
  const [ showComment, setShowComment ] = useState(false);
  const [ isUpdated, setIsUpadted ] = useState(false);
  const [ contentUpdate, setContentUpdate ] = useState("");
  const [ attachmentUpdate, setAttachmentUpdate ] = useState("");

  const handleUpdatePost = e => {
    e.preventDefault();
    
    const data = new FormData();
    contentUpdate && data.append("content", contentUpdate);
    attachmentUpdate && data.append("file", attachmentUpdate);

    dispatch(updatePost(post.id, data));
    
    setIsUpadted(false);
    
    setContentUpdate("");
    setAttachmentUpdate("");
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post.id));
  };

  const handleCancelButton = () => {
    setIsUpadted(false);
    setShowMenu(false);
  };

  return (
    <article className="post">
      <header>
        <Link className="post-user" to={ `/profile/${ post.userId }` }>
          <Avatar avatar="/images/users/avatar.png" />
          <h3>{ !isEmpty(users[0]) && users.map(user => user.id === post.userId && user.fullname) }</h3>
        </Link>
        { (admin || id === post.userId) &&
          !showMenu &&
          <button className="btn-menu" onClick={ () => setShowMenu(!showMenu) }><FontAwesomeIcon icon="fa-solid fa-ellipsis" /></button> }
        { showMenu &&
        <div className="post-menu">
          <Button btnTitle="Modifier" btnValue={ <FontAwesomeIcon icon="fa-solid fa-pen" /> } click={ () => setIsUpadted(!isUpdated) } />
          <Button btnTitle="Supprimer" btnValue={ <FontAwesomeIcon icon="fa-solid fa-trash-can" /> } click={ handleDeletePost } />
          <Button btnTitle="Annuler" btnValue={ <FontAwesomeIcon icon="fa-solid fa-xmark" /> }  click={ handleCancelButton } />
        </div>
        }
      </header>

      <figure className="post-body">
        { isUpdated === false ? ( !post.attachment ? null : <img src={ baseURL + post.attachment } alt="post attachment" />) : <FormUpload change={ e => setAttachmentUpdate(e.target.files[0]) } /> }
        <figcaption>
          { isUpdated === false ? <p className="post-content">{ post.content }</p>
            : <div><textarea value={ contentUpdate } onChange={ e => setContentUpdate(e.target.value) } /></div>}
        </figcaption>
      </figure>

      <footer>
        <div className="post-icons">
          <div className="post-icon">
            {/* <ButtonLike post={ post } /> */}
            {/* <span>{ JSON.parse(post.likes).length }</span> */}
          </div>
          <div className="post-icon">
            <Button click={ () => setShowComment(!showComment) } btnValue={ <FontAwesomeIcon icon="fa-regular fa-comment" /> } />
            {/* <span>{ JSON.parse(post.comments).length }</span> */}
          </div>
        </div>

        { isUpdated && <ButtonSubmit btnType=".submit" value="Submit" click={ handleUpdatePost } /> }

        <p className="timestamp">{ dateParser(post.createdAt) }</p>
      </footer>
      {/* { showComment && !isEmpty(JSON.parse(post.comments)[0]) &&  <CommentCard postId={ post.id } comments={ JSON.parse(post.comments) } /> } */}
    </article>
  );
}

export default Post;
