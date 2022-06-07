import { Button } from '.';
import { FontAwesomeIcon } from '../FontAwesomeIcon';

function ButtonUnfollow() {
  const handleClick = () => {};

  return (
    <Button btnType="unfollow" btnValue={[ <FontAwesomeIcon key={ "unfollow" } icon="fa-solid fa-user-minux" />, " Unfollow" ]} click={ handleClick } />
  );
}

export default ButtonUnfollow;
