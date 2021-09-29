import React, { useState } from 'react';
import { useTodoState } from '../TodoContext.jsx';

function CreateUser() {
  const state = useTodoState();

  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })

  const { username, password } = inputs;

  const onToggle = () => setOpen(!open);
  const onChange = e => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const validate = () => {    
    if (username === '') {
      throw Error('username is empty');
    }

    if (username.length < 1 || username.length > 20) {
      throw Error('username\'s length must be between 1 ~ 20');
    }

    if (password === '') {
      throw Error('password is empty');
    }

    if (password.length < 4 || password.length > 10) {
      throw Error('password must be between 4 ~ 10');
    }
  }

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      validate();
    
      const response = await fetch('http://localhost:8300/user/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${state.user.token}`
        },
        body: JSON.stringify({
          username,
          password,
          image: ''
        })
      })

      if (response.status === 400) {
        const error = response.text();
        throw Error(`${error}`);
      } else {
        alert('created!');
      }
    } catch (e) {
      if (e.message === 'username is empty')
        alert('username is empty');
      
      else if (e.message === 'username\'s length must be between 1 ~ 20')
        alert('username\'s length must be between 1 ~ 20');
      
      else if (e.message === 'password is empty')
        alert('password is empty');
     
      else if (e.message === 'password must be between 4 ~ 10')
        alert('password must be between 4 ~ 10');
      
      else {
        alert(`${e.message}`);
      }
    } finally {
      setInputs({ username: '', password: '' });
      setOpen(false);
    }
  }

  return (
    <>
      {open && (
        <form>
          <input
            name="username"
            value={username}
            placeholder="user name!"
            autoFocus
            onChange={onChange}
          />
          <input
            name="password"
            value={password}
            placeholder="password!"
            onChange={onChange}
          />
          <button onClick={onCreate}>
            submit
          </button>
        </form>
      )}
      <button onClick={onToggle}>
        {open ? 'cancel' : 'createuser'}
      </button>
    </>
  )
}

export default CreateUser;