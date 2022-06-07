function FormControl(props) {
  const classes = [ "FormLabel" ];
  classes.push(props.class);

  return (
    <div className="FormControl">
      <label htmlFor={ props.for } className={ classes[1] ? classes.join(" ") : classes.join("") }>{ props.label }</label>
      { props.children }
      <p className={ "FormErrorMessage " + props.for }></p>
    </div>
  );
}

export default FormControl;
