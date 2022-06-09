import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteUser } from "../../store/actions/user.actions";
import Button from "./Button";

function ButtonDeleteUser() {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const handleDeleteUser = () => {
    if (window.confirm("voulez-vous supprimer votre compte ?")){
      dispatch(deleteUser(userId));
    }
  };

  return (
    <Button btnType="delete-user" btnValue="delete user" click={ handleDeleteUser } />
  );
}

export default ButtonDeleteUser;
