function FormUpload(props) {
  const classes = [ "FormInput" ];
  classes.push(props.class);

  return (
    <input id={ props.id } className={ classes[1] ? classes.join(" ") : classes.join("") } name={ props.id } type="file" accept=".jpg, .jpeg, .png, .gif" placeholder={ props.placeholder } value={ props.value } onChange={ props.change } />
  );
}

export default FormUpload;
