import React from 'react';
import { useTodoDispatch } from '../TodoContext.jsx';

function LogOut() {
  const dispatch = useTodoDispatch();
  const onLogOut = () => dispatch({ type: 'LOGOUT' })

  return (
    <button onClick={onLogOut}>
      logout
    </button>
  )
}

export default LogOut;