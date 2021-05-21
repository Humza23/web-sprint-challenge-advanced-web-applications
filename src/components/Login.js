import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const initialValue = {
  username: 'Lambda School',
  password: 'i<3Lambd4',
}

const initialError = {
  error: 'Username or Password not valid'
}

const Login = () => {
  const [credentials, setCredentials] = useState(initialValue)
  const [formError, setFormError] = useState(initialError)

  const {push} = useHistory()
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
    // console.log(credentials);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/login', credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      push('/bubblepage')
      console.log(res.data.payload);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
        <form onSubmit={submitHandler}>
        <label>
          Username:
          <input data-testid="username" type="text" name="username" onChange={handleChange} value={credentials.username}/>
        </label>
        <label>
          Password:
          <input data-testid="password" type="password" name="password" onChange={handleChange} value={credentials.password}/>
        </label>
        <button> Log in! </button>
      </form>
      </div>
      <div data-testid="errorMessage" className="error">
        {
          credentials.username === '' || credentials.password === '' ? <p> {formError.error} </p>
        : null }
        </div>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.