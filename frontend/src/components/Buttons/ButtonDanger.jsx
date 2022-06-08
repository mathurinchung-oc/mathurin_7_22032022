import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../store/actions/user.actions';
import { Button } from '.';

function ButtonDanger() {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.user.currentUser);

  const handleClick = () => {
    if (window.confirm("voulez-vous supprimer votre compte ?")){
      dispatch(deleteUser(id));

      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Button btnType="danger" btnValue="Delete Account" click={ handleClick } />
  );
}

export default ButtonDanger;
