import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { Button } from '.';

function ButtonClose({ element }) {
  const handleClose = () => {
    document.querySelector(element).style.display = "none";
  };

  return (
    <Button btnType="close" btnValue={ <FontAwesomeIcon icon="fa-solid fa-xmark" /> } click={ handleClose } />
  );
}

export default ButtonClose;
