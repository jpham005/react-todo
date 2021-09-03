import React from 'react';
import { useTodoCurrentUser } from '../TodoContext';

function LogOut() {
  const currentUser = useTodoCurrentUser();
  const onLogOut = () => currentUser.current = undefined;

  return (
    <button onClick={onLogOut}>
      logout
    </button>
  )
}

export default LogOut;