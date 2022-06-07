import { baseURL } from '../../api';

function Avatar(props) {
  return (
    <div className="Avatar">
      <img src={ baseURL + props.avatar } alt="avatar profile" />
    </div>
  );
}

export default Avatar;
