import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/actions/user.actions";
import { Form, FormControl, FormInput } from '../Form';
import { UploadAvatar } from '.';
import { Avatar } from '../User';
import { ButtonSubmit } from '../Buttons';

function TabUser() {
  const { payload: { userId } } = JSON.parse(localStorage.getItem("auth") || "{}") || false;
  const currentUser = useSelector(state => state.user.currentUser);
  const [ fullname, setFullname ] = useState("");
  const [ bio, setBio ] = useState("");
  const [ file, setFile ] = useState("");

  const dispatch = useDispatch();

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
        <Avatar avatar={ currentUser.avatar } />
        <UploadAvatar change={ e => setFile(e.target.files[0]) } />

        <FormControl for="fullname" label="Fullname">
          <FormInput id="fullname" type="text" value={ fullname } change={ e => setFullname(e.target.value) } />
        </FormControl>

        <FormControl for="bio" label="Bio">
          {/* <textarea type="text" /> */}
          <FormInput id="bio" type="text" value={ bio } change={ e => setBio(e.target.value) } />
        </FormControl>

        <ButtonSubmit value="Submit" />
      </Form>
    </section>
  );
}

export default TabUser;
