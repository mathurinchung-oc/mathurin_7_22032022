function Button(props) {
  return (
    <button className={ "btn " + props.type } title={ props.title } onClick={ props.click }>{ props.children }</button>
  );
}

export default Button;
