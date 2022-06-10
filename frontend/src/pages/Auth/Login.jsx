import { useState } from 'react';
import { Link } from 'react-router-dom';
import { axios } from '../../api';
import { AuthHeader } from '../../components/Header';
import { Form, FormControl, FormInput } from '../../components/Form';
import { Button } from '../../components/Buttons';
import { FontAwesomeIcon } from '../../components/FontAwesomeIcon';

function Login() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = document.querySelector(".FormErrorMessage");
    const data = { email, password };

    try {
      const response = await axios.post("/user/login", data);
      localStorage.setItem("auth", JSON.stringify(response.data));

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
          <FormControl for="email" label={ <FontAwesomeIcon icon="fa-solid fa-envelope" /> }>
            <FormInput id="email" class="AuthInput" type="email" placeholder="Email" value={ email } change={ e => setEmail(e.target.value) } />
          </FormControl>
          <FormControl for="password" label={ <FontAwesomeIcon icon="fa-solid fa-lock" /> }>
            <FormInput id="password" class="AuthInput" type="password" placeholder="Password" value={ password } change={ e => setPassword(e.target.value) } />
          </FormControl>
          <Button type="submit">Log in</Button>
        </Form>
      </div>

      <div className="AuthContainer">
        <p className="AuthRedirection">Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </>
  );
}

export default Login;
