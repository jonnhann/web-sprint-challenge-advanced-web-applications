import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const { push } = useHistory();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  })

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const login = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/login`, formValues)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
        push('/colors');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <form onSubmit={login}>
        <label htmlFor="username">username</label>
        <input
          id='username'
          value={formValues.username}
          name='username'
          onChange={handleChanges}
        />
        <label htmlFor="password">password</label>
        <input
          type='password'
          id='password'
          value={formValues.password}
          name='password'
          onChange={handleChanges}
        />
        {(formValues.username !== 'Lambda School' || formValues.username !== 'i<3Lambd4') && <p>Username or Password not valid.</p>}
        <button>Login!</button>
      </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.