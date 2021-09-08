import React, { useState } from 'react';
import { useTodoDispatch, useTodoValidateFromServer } from '../TodoContext';

function CreateUser() {
  const dispatch = useTodoDispatch();
  const validateFromServer = useTodoValidateFromServer();
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
    const strUsername = String(username);
    if (strUsername === '') {
      console.log(1)
      alert('username is empty');
      return;
    }

    if (strUsername.length < 2 || strUsername.length > 10) {
      alert('username\'s length must be between 2 ~ 10');
      return;
    }

    if (password === '') {
      alert('password is empty');
      return;
    }

    if (password.length < 2 || password.length > 10) {
      alert('password must be between 2 ~ 10');
      return;
    }

    if (validateFromServer('user', strUsername) === 'failed') {
      alert('username has occupied');
      return;
    }
  }

  const onCreate = e => {
    e.preventDefault();
    validate();
    //async & await?
    dispatch({
      type: 'CREATEUSER',
      payload: {
        name: username,
        password,
      }
    });

    setInputs({ username: '', password: '' });
    setOpen(false);
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
        new user
      </button>
    </>
  )
}

export default CreateUser;