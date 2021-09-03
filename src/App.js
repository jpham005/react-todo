import React from 'react';
import TodoHead from './components/TodoHead';
import Todos from './components/Todos';
import Fab from './components/Fab';
import { useTodoCurrentUser } from './TodoContext';
import CreateUser from './components/CreateUser';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut'
import CreateList from './components/CreateList';
import SelectList from './components/SelectList';
import { TodoProvider } from './TodoContext';

function App() {
  const currentUser = useTodoCurrentUser();

  return (
    <>
      <TodoProvider>
        <TodoHead />
        <Todos />
        {currentUser === undefined ? <LogIn /> : <LogOut />}
        <CreateUser /><br />
        <CreateList />
        {currentUser !== undefined && 
          <SelectList />
        }
        <Fab />
      </TodoProvider>
    </>
  );
}

export default App;
