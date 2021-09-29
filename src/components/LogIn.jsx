import React, { useState } from 'react';
import { useTodoDispatch } from '../TodoContext.jsx';
import CreateUser from './CreateUser.jsx';

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

    try {
      const response = await fetch('http://localhost:8300/user/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        })
      });

      if (response.status === 400) 
        throw Error('login failed!');

      const token = await response.text();

      const infoResponse = 
        await fetch('http://localhost:8300/user/gettodolist', {
          method: 'POST',  
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            token,
          })
        });

      const info = await infoResponse.json();
      const lists = info.lists;
      const items = info.items;

      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            isLoggedIn: true,
            username,
            token,
          },
          lists,
          items,
        }
      });      
    } catch (e) {
      alert('login failed!');
      setOpen(false);
      setInputs({
        username: '',
        password: ''
      })
      return;
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