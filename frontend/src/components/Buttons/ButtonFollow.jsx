import { Button } from '.';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

function ButtonFollow() {
  const handleClick = () => {};

  return (
    <Button btnType="follow" btnValue={[ <FontAwesomeIcon key={ "follow" } icon="fa-solid fa-user-plus" />, " Follow" ]} click={ handleClick } />
  );
}

export default ButtonFollow;
