import { useState } from 'react';
import { Link } from 'react-router-dom';
import { axios } from '../../api';
import { AuthHeader } from '../../components/Header';
import { Form, FormControl, FormInput } from '../../components/Form';
import { ButtonSubmit } from '../../components/Buttons';
import { FontAwesomeIcon } from '../../components/FontAwesomeIcon';

function Signup() {
  const [ fullname, setFullname ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = document.querySelector(".FormErrorMessage");
    const data = { fullname, email, password };

    try {
      await axios.post("/user/register", data);

      const response = await axios.post("/user/login", { email, password });
      localStorage.setItem("auth", JSON.stringify(response.data));

      setFullname("");
      setEmail("");
      setPassword("");

      window.location = "/";
    } catch (error) {
      errors.innerHTML = error.response.data.error;
    }
  };

  return (
    <>
      <div className="AuthContainer">
        <AuthHeader />
        <Form class="AuthForm" submit={ handleSubmit }>
          <FormControl for="fullname" label={ <FontAwesomeIcon icon="fa-solid fa-user" /> }>
            <FormInput id="fullname" class="AuthInput" type="text" placeholder="Fullname" value={ fullname } change={ e => setFullname(e.target.value) } />
          </FormControl>
          <FormControl for="email" label={ <FontAwesomeIcon icon="fa-solid fa-envelope" /> }>
            <FormInput id="email" class="AuthInput" type="email" placeholder="Email" value={ email } change={ e => setEmail(e.target.value) } />
          </FormControl>
          <FormControl for="password" label={ <FontAwesomeIcon icon="fa-solid fa-lock" /> }>
            <FormInput id="password" class="AuthInput" type="password" placeholder="Password" value={ password } change={ e => setPassword(e.target.value) } />
          </FormControl>
          <ButtonSubmit value="Sign up"/>
        </Form>
      </div>

      <div className="AuthContainer">
        <p className="AuthRedirection">Have an account already? <Link to="/login">Log in</Link></p>
      </div>
    </>
  );
}

export default Signup;
