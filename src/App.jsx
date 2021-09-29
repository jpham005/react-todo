import React from 'react';
import TodoHead from './components/TodoHead.jsx';
import Fab from './components/Fab.jsx';
import { TodoProvider } from './TodoContext.jsx';
import LogInMange from './components/LogInMange.jsx';

function App() {
  return (
    <>
      <TodoProvider>
        <TodoHead />
        <LogInMange /><br />
        <Fab />
      </TodoProvider>
    </>
  );
}

export default App;
