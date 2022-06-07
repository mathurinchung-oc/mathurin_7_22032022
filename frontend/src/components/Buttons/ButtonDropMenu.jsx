import { Button } from '.';
import { Avatar } from '../User';

function ButtonDropMenu({ user }) {
  return (
    <Button btnType="drop-menu" btnValue={ <Avatar avatar={ user.avatar } /> } />
  );
}

export default ButtonDropMenu;
