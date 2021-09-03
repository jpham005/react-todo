import React from 'react';
import { useTodoCurrentUser, useTodoState } from '../TodoContext';

function LogIn() {
  const state = useTodoState();
  const currentUser = useTodoCurrentUser();
  console.log(state.users)
  const onLogIn = () => {
    const username = prompt('what\'s your name?','');
    currentUser.current = Object.values(state.users)
      .find(user => user.username === username)
    const password = prompt('password?','');

    validate(currentUser.current, password);
  }

  const validate = (user, password) => {
    if (user === undefined || password !== user.password){
      currentUser.current = undefined;
      return alert('something is wrong');
    }
    alert('login success!');
  }

  return (
    <button onClick={onLogIn}>
      login
    </button>
  )
}

export default LogIn;