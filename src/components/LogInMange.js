import React from 'react';
import { useTodoState } from '../TodoContext';
import CreateList from './CreateList';
import LogIn from './LogIn';
import LogOut from './LogOut';
import SelectList from './SelectList';
import Todos from './Todos'

function LogInMange() {
  const state = useTodoState();

  if (state.user.isLoggedIn === false)
    return <LogIn />
  else
    return (
      <>
        <LogOut /> <br />
        <CreateList />
        <SelectList /><br />
        {state.currentList && <Todos />}
      </>
    )
}

export default LogInMange;