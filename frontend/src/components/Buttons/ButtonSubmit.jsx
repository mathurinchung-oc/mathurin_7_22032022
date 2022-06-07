import { Button } from '.';

function ButtonSubmit(props) {
  return (
    <Button btnType="primary submit" btnValue={ props.value } click={ props.click } />
  );
}

export default ButtonSubmit;
