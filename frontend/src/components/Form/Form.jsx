function Form(props) {
  const classes = [ "Form" ];
  classes.push(props.class);

  return (
    <form className={ classes[1] ? classes.join(" ") : classes.join("") } onSubmit={ props.submit }>
      { props.children }
    </form>
  );
}

export default Form;
