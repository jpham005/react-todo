import React, { useState } from 'react';
import { useTodoDispatch } from '../TodoContext';
import CreateUser from './CreateUser';

function LogIn() {
  const dispatch = useTodoDispatch();
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const { username, password } = inputs;
  
  const onToggle = () => setOpen(!open);
  
  const onChange = e => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8300/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    });
    
    const token = await response.text();
    if (token === '') {
      alert('login failed');
      setOpen(false);
      setInputs({
        username: '',
        password: ''
      })
    } else {
      dispatch({
        type: 'LOGIN',
        payload: {
          username,
          token,
        }
      });      
    }
  };

  return (
    <>
      {open && (
        <form
          onSubmit={onSubmit}
        >
          <input
            name="username"
            value={username}
            placeholder="list name!"
            autoFocus
            onChange={onChange}
          />
          <input
            name="password"
            value={password}
            placeholder="password"
            onChange={onChange}
          />
          <button type={'submit'}>
            confirm
          </button>
        </form>
      )}
      <button onClick={onToggle}>
        {open ? 'cancel' : 'login'}
      </button>
      <CreateUser/>
    </>
  )
}

export default LogIn;