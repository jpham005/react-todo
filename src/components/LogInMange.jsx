import React from 'react';
import { useTodoState } from '../TodoContext.jsx';
import CreateList from './CreateList.jsx';
import LogIn from './LogIn.jsx';
import LogOut from './LogOut.jsx';
import SelectList from './SelectList.jsx';
import Todos from './Todos.jsx'
import ListPaging from './ListPaging.jsx';
import RemoveList from './RemoveList.jsx';

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
            <ListPaging />
          </>
          )}<br />
        {state.currentList && <Todos />}<br />
        <RemoveList />
      </>
    )
}

export default LogInMange;