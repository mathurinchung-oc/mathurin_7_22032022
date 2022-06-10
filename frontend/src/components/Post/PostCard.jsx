import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, deletePost, deleteAttachment, createComment } from '../../store/actions/post.actions';
import { dislikePost, likePost } from "../../store/actions/post.actions";
import { Link } from 'react-router-dom';
import { baseURL } from '../../api';
import { CommentCard } from '.';
import { Button } from '../Buttons';
import { Form, FormUpload } from '../Form';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { Avatar } from '../User';
import { isEmpty, dateParser } from '../../utils';

function Post({ post }) {
  const dispatch = useDispatch();
  const { admin, id, fullname, avatar } = useSelector(state => state.user.currentUser);

  const [ showMenu, setShowMenu ] = useState(false);
  const [ isUpdated, setIsUpadted ] = useState(false);
  const [ showComment, setShowComment ] = useState(false);
  
  const [ content, setContent ] = useState(post.content);
  const [ attachment, setAttachment ] = useState(post.attachment);
  const [ file, setFile ] = useState();
  const [ preview, setPreview ] = useState();
  const [ liked, setLiked ] = useState(false);
  const [ comment, setComment ] = useState("");

  const handleCancelButton = () => {
    setContent(post.content);
    setAttachment(post.attachment);
    setFile();
    setPreview();
    setIsUpadted(false)
    setShowMenu(false);
  };

  const handleAttachment = e => {
    e.preventDefault();

    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setAttachment(file);
  };

  const cancelAttachment = () => {
    if (post.attachment) {
      dispatch(deleteAttachment(post.id))
    }

    setPreview();
    setFile();
  };

  const handleUpdatePost = e => {
    e.preventDefault();

    if (content === "" && attachment === null) return handleDeletePost();

    const data = new FormData();
    data.append("content", content);
    attachment && data.append("file", file);

    dispatch(updatePost(post.id, data));

    setIsUpadted(false);
    setShowMenu(false);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post.id));
  };

  const handleLike = () => {
    if (!liked) {
      dispatch(likePost(post.id, id));
    } else {
      dispatch(dislikePost(post.id, id));
    }

    setLiked(!liked)
  };

  const handleSubmitComment = e => {
    e.preventDefault();
    const data = { userId: id, comment };

    dispatch(createComment(post.id, data));

    setComment("");
  };

  useEffect(() => {
    post.Likes.map(user => (user.userId === id) && setLiked(true));
  }, [ post, id ]);

  return (
    <article className="Post">
      <header className="PostHeading">
        <Link className="PostUserLink" to={ `/profile/${ post.userId }` }>
          <Avatar avatar={ post.User.avatar } />
          <div className="PostUserHeading">
            <h3 className="fulname">{ post.User.fullname }</h3>
            <h4 className="job">{ post.User.job }</h4>
          </div>
        </Link>

        { (admin || id === post.userId) && !showMenu &&
          <Button type="PostButtonMenu" click={ () => setShowMenu(!showMenu) }>
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
          </Button>
        }
        { (showMenu && !isUpdated) &&
          <div className="PostMenu">
            <Button type="modify" title="Modifier" click={ () => setIsUpadted(!isUpdated) }>
              <FontAwesomeIcon icon="fa-solid fa-pen" />
            </Button>

            <Button type="delete" title="Supprimer" click={ handleDeletePost } >
              <FontAwesomeIcon icon="fa-solid fa-trash-can" />
            </Button>

            <Button type="cancel" title="Annuler"  click={ handleCancelButton } >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </Button>
          </div>
        }
      </header>

      <figure className="PostBody">
          { isUpdated ? file ? <img className="attachment" src={ preview } alt="preview attachment" /> : null
                      : post.attachment && <img className="attachment" src={ baseURL + post.attachment } alt="post attachment" /> }

          <figcaption>
            { isUpdated ? <textarea id="content" className="textarea content" value={ content } placeholder="Quoi de neuf ?" onChange={ e => setContent(e.target.value) } />
                        : post.content && <p className="content">{ post.content }</p> }
          </figcaption>
      </figure>

      <footer className="PostFooter">
        { !isUpdated ? <>
          <div className="PostIcons">
            <div className="PostIcon">
              <Button type="like" click={ handleLike }>
              { liked ? <FontAwesomeIcon icon="fa-solid fa-heart" />
                      : <FontAwesomeIcon icon="fa-regular fa-heart" /> }
              </Button>
              <span>{ post.Likes.length }</span>
            </div>
            <div className="PostIcon">
              <Button type="comment" click={ () => setShowComment(!showComment) }>
                { showComment ? <FontAwesomeIcon icon="fa-solid fa-comment" />
                              : <FontAwesomeIcon icon="fa-regular fa-comment" /> }
              </Button>
              <span>{ post.Comments.length }</span>
            </div>
          </div>
          <p className="timestamp">{ dateParser(post.createdAt) }</p>
        </> :
        <div className="PostIsUpdated">
          { !file ? <FormUpload id="upload-update-post" change={ handleAttachment } />
                  : <Button type="secondary" click={ cancelAttachment }>Supprimer l'image</Button>
          }
          <Button type="submit" click={ handleUpdatePost }>Publier</Button>
        </div> }
      </footer>

      { showComment && 
      <div className="PostComments">
        <Form class="CommentItem" submit={ handleSubmitComment }>
          <div className="content">
            <Link to={ "/profile/" + id }>
              <Avatar avatar={ avatar } />
            </Link>
            <div className="comment">
              <h3 className="fullname"> { fullname }</h3>
              <textarea className="textarea content" value={ comment } onChange={ e => setComment(e.target.value) } />
            </div>
          </div>

          <div className="CommentMenu">
            <Button className="submit" title="valider">
              <FontAwesomeIcon icon="fa-solid fa-check" />
            </Button>
          </div>
        </Form>
        { !isEmpty(post.Comments[0]) ?
          <ul className="CommentList">
            { post.Comments.map(comment => <li className="CommentItem" key={ comment.id }><CommentCard comment={ comment } /></li> ) }
          </ul>
          : null
        }
      </div> }
    </article>
  );
}

export default Post;
