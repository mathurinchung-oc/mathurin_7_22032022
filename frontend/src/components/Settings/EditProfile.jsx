import { Tabs } from '.';
import { ButtonClose } from '../Buttons';

function EditProfile() {
  return (
    <div id="EditProfile">
      <div className="overlay"></div>

      <div className="modal">
        <header className="EditProfileMainHeading">
          <h2>User settings</h2>
          <ButtonClose element="#EditProfile" />
        </header>

        <Tabs />
      </div>
  </div>
  );
}

export default EditProfile;
