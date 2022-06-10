import { FontAwesomeIcon } from "../FontAwesomeIcon";

function ButtonUpload(props) {
  return (
    <div className="ButtonUpload">
      <label htmlFor={ props.id } className="btn secondary upload"><FontAwesomeIcon icon="fa-solid fa-camera" /> Image</label>
      <input id={ props.id } name={ props.id } type="file" accept="image/*f" onChange={ props.change } hidden />
    </div>
  );
}

export default ButtonUpload;
