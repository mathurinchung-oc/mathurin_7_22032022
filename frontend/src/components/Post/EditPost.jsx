import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost } from '../../store/actions/post.actions';
import { Avatar } from '../User';
import { Form, FormControl, FormUpload } from '../Form';
// import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { Button, ButtonSubmit } from '../Buttons';

function EditPost() {
  const { id, avatar, admin } = useSelector(state => state.user.currentUser);
  const [ content, setContent ] = useState("");
  const [ attachment, setAttachment ] = useState(null);
  const [ file, setFile ] = useState();

  const handleSubmit = e => {
    e.preventDefault();

    if (content || attachment) {
      const data = new FormData();
      data.append('UserId', id);
      data.append('content', content);
      if (file) data.append('file', file);

      createPost(data);

      setContent("");
      setAttachment("");
      setFile("");
    }
  };

  const handleAttachment = e => {
    setAttachment(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setContent("");
    setAttachment("");
    setFile("");
  };

  return (
    <div id="EditPost">
      { !admin &&
      <div className="wrapper">
        <Link to={`/profile/${ id }`}>
          <Avatar avatar={ avatar } />
        </Link>
        <Form class="EditPostForm" submit={ handleSubmit }>
          <FormControl for="content" label="content">
            <textarea id="content" name="content" type="text" value={ content } placeholder="What's happening?" onChange={ e => setContent(e.target.value) } />
          </FormControl>

          <div className="btn-form">
            {/* <Button btnType="attachment" btnValue={[ <FontAwesomeIcon key="attachment" icon="fa-solid fa-camera" />, " Image" ]} /> */}
            <FormUpload change={ e => handleAttachment(e) } />
            { content || attachment ? <Button click={ cancelPost } btnValue="Cancel" /> : null }
            <ButtonSubmit value="Post" />
          </div>
        </Form>
      </div>
      }
    </div>
  );
}

export default EditPost;
