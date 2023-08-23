import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { loginRoute } from '../utills/ApiRouter'
function Login() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (handleValidation()) {
        const { username,email, password } = values
        const { data } = await axios.post(loginRoute, {
          username,
          email,
          password,
        })
        if (data.status === false) {
          toast.error(data.msg, toastOptions)
        }
        if (data.status === true) {
      localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
          navigate('/')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const toastOptions = {
    position: 'top-center',
    autoClose: 5000,
    theme: 'outline',
    draggable: true,
  }
  const handleValidation = () => {
    const { username, email, password } = values
    if (username==="") {
      toast.error('Enter the username', toastOptions)
      return false
    }
    if (password==="") {
      toast.error('Enter the password', toastOptions)
      return false
    }
    if (!email.includes('@') || email === '') {
      toast.error('Invalid Email', toastOptions)
      return false
    }
    return true
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <h1>TalkBook</h1>
            <img src={logo} alt="logo" />
          </div>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/Register">Register</Link>
          </span>
        </form>
        <ToastContainer />
      </FormContainer>
    </>
  )
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
      height: 5rem;
    }

    h1 {
      font-size: 3rem;
      color: #fff;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 6rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #997af0;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: #997af0;
      }
    }
  }
`

export default Login
