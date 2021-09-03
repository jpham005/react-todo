import React from 'react';
import { useTodoDispatch } from '../TodoContext';
import { v4 as uuidv4 } from 'uuid';

function CreateUser() {
  const dispatch = useTodoDispatch();

  const onCreateUser = () => {
    const id = uuidv4();
    
    const username = prompt('username', '');
    if (username === null || username === '')
      return alert('username is empty');

    const password = prompt('password', '');
    if (password === null || password === '')
      return alert('password is empty');
    if (password < 2 || password > 20)
      return alert('password must be between 2 ~ 20');
    
    const image = prompt('profile image','');

    dispatch({
      type: 'CREATEUSER',
      user: {
        id,
        username,
        password,
        image,
      }
    })
  }

  return (
    <>
      <button onClick={onCreateUser}>
        new user
      </button>
    </>
  )
}

export default CreateUser;