import React from 'react';
import { useTodoDispatch } from '../TodoContext';
import CreateUser from './CreateUser';

function LogIn() {
  const dispatch = useTodoDispatch();

  const onLogIn = () => {
    const username = prompt('what\'s your name?','');
    const password = prompt('password?','');

    if (validate(username, password) === 'success')
      dispatch({ type: 'LOGIN', payload: username });
    else
      alert('something is wrong zz');
  }
  
  const validate = (user, password) => {
    //sendServerAndGetResult(user, password);
  }

  return (
    <>
      <button onClick={onLogIn}>
        login
      </button>
      <CreateUser />
    </>
  )
}

export default LogIn;