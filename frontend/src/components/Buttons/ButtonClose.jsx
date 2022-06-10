import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { Button } from '.';

function ButtonClose({ element }) {
  const handleClose = () => {
    document.querySelector(element).style.display = "none";
  };

  return (
    <Button type="close" click={ handleClose }>
      <FontAwesomeIcon icon="fa-solid fa-xmark" /> 
    </Button>
  );
}

export default ButtonClose;
