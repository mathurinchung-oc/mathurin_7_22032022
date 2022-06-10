import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/actions/user.actions";
import { Form, FormControl, FormInput, FormUpload } from '../Form';
import { Avatar } from '../User';
import { Button } from '../Buttons';

function TabUser() {
  const { payload: { userId } } = JSON.parse(localStorage.getItem("auth") || "{}") || false;
  const currentUser = useSelector(state => state.user.currentUser);

  const [ fullname, setFullname ] = useState("");
  const [ bio, setBio ] = useState("");
  const [ job, setJob ] = useState("");
  const [ file, setFile ] = useState();
  const [ preview, setPreview ] = useState();

  const dispatch = useDispatch();

  const handleAttachment = e => {
    e.preventDefault();

    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };


  const handleSubmit = e => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullname", !fullname ? currentUser.fullname : fullname);
    data.append("bio", !bio ? currentUser.bio : bio);
    data.append("file", file);

    dispatch(updateUser(userId, data));

    setFullname("");
    setBio("");
    setFile("");
  };

  return (
    <section className="TabContent">
      <h3 className="EditProfileHeading">User Profile</h3>

      <Form class="UserForm" submit={ handleSubmit }>
        <div className="FormUploadAvatar">
          { !file ? <Avatar avatar={ currentUser.avatar } /> : <img src={ preview } alt="profile avatar" /> }
          <FormUpload id="upload" change={ handleAttachment } />
        </div>

        <FormControl for="fullname" label="Fullname">
          <FormInput id="fullname" type="text" value={ fullname } change={ e => setFullname(e.target.value) } />
        </FormControl>

        <FormControl for="bio" label="Bio">
          {/* <textarea type="text" /> */}
          <FormInput id="bio" type="text" value={ bio } change={ e => setBio(e.target.value) } />
        </FormControl>

        <FormControl for="job" label="Job">
          {/* <textarea type="text" /> */}
          <FormInput id="job" type="text" value={ job } change={ e => setJob(e.target.value) } />
        </FormControl>

        <Button type="submit">Submit</Button>
      </Form>
    </section>
  );
}

export default TabUser;
