import { useState } from 'react';
import { useSelector } from 'react-redux';
import { modifyEmail, /* modifyPassword */ } from '../../store/actions/user.actions';
import { Button } from '../Buttons';
import { Form, FormControl, FormInput } from '../Form';

function TabAuth() {
  const currentUser = useSelector(state => state.user.currentUser);
  const [ currentEmail, setCurrentEmail ] = useState("");
  const [ newEmail, setNewEmail ] = useState("");
  const [ confirmEmail, setConfirmEmail ] = useState("");

  // const [ currentPassword, setCurrentPassword ] = useState("");
  // const [ newPassword, setNewPassword ] = useState("");
  // const [ confirmPassword, setConfirmPassword ] = useState("");

  const handleEmail = e => {
    e.preventDefault();

    if (newEmail !== confirmEmail) return;
    if(currentEmail === newEmail) return;

    const data = { currentEmail, newEmail };

    modifyEmail(currentUser.id, data);

    setCurrentEmail("")
    setNewEmail("");
    setConfirmEmail("");
  };

  // const handlePassword = e => {
  //   e.preventDefault();

  //   if (newPassword !== confirmPassword) return;
  //   if(currentPassword === newPassword) return;

  //   const data = { currentPassword, newPassword };

  //   modifyPassword(currentUser.id, data);

  //   setCurrentPassword("")
  //   setNewPassword("");
  //   setConfirmPassword("");
  // };

  return (
    <section className="TabContent">
      <h3 className="EditProfileHeading">Authentication</h3>

      <Form class="UserForm" submit={ handleEmail }>
        <h4>Email</h4>
        <FormControl label="current email">
          <FormInput id="currentEmail" type="email" value={ currentEmail } change={ e => setCurrentEmail(e.target.value) } />
        </FormControl>
        <FormControl label="new email">
          <FormInput id="newEmail" type="email" value={ newEmail } change={ e => setNewEmail(e.target.value) } />
        </FormControl>
        <FormControl label="confirm email">
          <FormInput id="confirmEmail" type="email" value={ confirmEmail } change={ e => setConfirmEmail(e.target.value) } />
        </FormControl>
        <Button type="submit">Submit</Button>
      </Form>

      {/* <Form class="UserForm" submit={ handlePassword }>
        <h4>Password</h4>
        <FormControl label="current password">
          <FormInput id="currentPassword" type="text" value={ currentPassword } change={ e => setCurrentPassword(e.target.value) } />
        </FormControl>
        <FormControl label="new password">
          <FormInput id="newPassword" type="text" value={ newPassword } change={ e => setNewPassword(e.target.value) } />
        </FormControl>
        <FormControl label="confirm password">
          <FormInput id="confirmPassword" type="text" value={ confirmPassword } change={ e => setConfirmPassword(e.target.value) } />
        </FormControl>
        <Button type="submit">Submit</Button>
      </Form> */}
    </section>
  );
}

export default TabAuth;
