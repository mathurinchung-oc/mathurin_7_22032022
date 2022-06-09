import { useState } from 'react';
import { useSelector } from 'react-redux';
import { modifyEmail, modifyPassword } from '../../store/actions/user.actions';
import { ButtonSubmit } from '../Buttons';
import { Form, FormControl, FormInput } from '../Form';

function TabAuth() {
  const currentUser = useSelector(state => state.user.currentUser);
  const [ currentEmail, setCurrentEmail ] = useState("");
  const [ newEmail, setNewEmail ] = useState("");
  const [ confirmEmail, setConfirmEmail ] = useState("");

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

  const handlePassword = e => {
    e.preventDefault();

    modifyPassword();

    console.log(e);
  };

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
        <ButtonSubmit value="Submit" />
      </Form>

      <Form class="UserForm" submit={ handlePassword }>
        <h4>Password</h4>
        <FormControl label="current password">
          <FormInput />
        </FormControl>
        <FormControl label="new password">
          <FormInput />
        </FormControl>
        <FormControl label="confirm password">
          <FormInput />
        </FormControl>
        <ButtonSubmit value="Submit" />
      </Form>
    </section>
  );
}

export default TabAuth;
