import { config, axios } from '../../api';
import { useSelector } from 'react-redux';
import { Button } from '.';

function ButtonDanger() {
  const { id } = useSelector(state => state.user.currentUser);

  const handleClick = async () => {
    if (window.confirm("voulez-vous supprimer votre compte ?")){
      try {
        await axios.delete(`user/${ id }`, config);

        localStorage.clear();
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }

  };

  return (
    <Button btnType="danger" btnValue="Delete Account" click={ handleClick } />
  );
}

export default ButtonDanger;
