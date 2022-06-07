function Button(props) {
  return (
    <button className={ "btn " + props.btnType } title={ props.btnTitle } onClick={ props.click }>{ props.btnValue }</button>
  );
}

export default Button;
