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
        <CreateList /> <br />
        {state.lists && (
          <>
            리스트를 고르세요 : <SelectList />
            현재 페이지: {state.currentListPage}
          </>
          )}<br />
        {state.currentList && <Todos />}
      </>
    )
}

export default LogInMange;