import { Button } from '.';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

function ButtonEditProfile() {
  const handleClick = () => {
    document.querySelector("#EditProfile").style.display = "block"
  };

  return (
    <Button btnType="edit-profile" btnValue={[<FontAwesomeIcon key="editProfil" icon="fa-solid fa-gear" />, " Edit Profile"]} click={ handleClick } />
  );
}

export default ButtonEditProfile;
