import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost } from '../../store/actions/post.actions';
import { Avatar } from '../User';
import { Form, FormUpload } from '../Form';
import { Button } from '../Buttons';

function EditPost() {
  const dispatch = useDispatch();
  const { id, fullname, avatar } = useSelector(state => state.user.currentUser);
  const [ content, setContent ] = useState("");
  const [ file, setFile ] = useState();
  const [ preview, setPreview ] = useState();

  const handleAttachment = e => {
    e.preventDefault();

    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const cancelAttachment = () => {
    setPreview();
    setFile();
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (content || file) {
      const data = new FormData();
      data.append('UserId', id);
      data.append('content', content);
      if (file) data.append('file', file);

      dispatch(createPost(data));

      setContent("");
      setFile("");
    }
  };

  return (
    <div className="EditPost">
      <div className="wrapper">
        <header className="PostHeading">
          <Link className="PostUserLink" to={ `/profile/${ id }` }>
            <Avatar avatar={ avatar } />
            <div className="PostUserHeading">
              <h3 className="fulname">{ fullname }</h3>
              <h4 className="job">{ "job" }</h4>
            </div>
          </Link>
        </header>

        <Form class="EditPostForm" submit={ handleSubmit }>

          <figure className="PostBody">
            { file ? <img className="attachment" src={ preview } alt="preview attachment" /> : null }
            <figcaption>
              {/* <label htmlFor="content"></label> */}
              <textarea id="content" className="textarea content" value={ content } placeholder="Quoi de neuf ?" onChange={ e => setContent(e.target.value) } />
            </figcaption>
          </figure>

          <footer className="PostFooter">
            <div className="PostIsUpdated">
              { !file ? <FormUpload id="upload" change={ handleAttachment } />
                      : <Button type="secondary cancel" click={ cancelAttachment }>Supprimer l'image</Button> }
              <Button type="submit">Publier</Button>
            </div>
          </footer>
        </Form>
      </div>
    </div>
  );
}

export default EditPost;
