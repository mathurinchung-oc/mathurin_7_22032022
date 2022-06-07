import { ButtonSubmit } from '../Buttons';
import { Form, FormControl, FormInput } from '../Form';

function TabAuth() {
  const handleEmail = e => {
    e.preventDefault();
    console.log(e);
  };

  const handlePassword = e => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <section className="TabContent">
      <h3 className="EditProfileHeading">Authentication</h3>

      <Form class="UserForm" submit={ handleEmail }>
        <h4>Email</h4>
        <FormControl label="current email">
          <FormInput />
        </FormControl>
        <FormControl label="new email">
          <FormInput />
        </FormControl>
        <FormControl label="confirm email">
          <FormInput />
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
