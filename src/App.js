import React from 'react';
import TodoHead from './components/TodoHead';
import Fab from './components/Fab';
import { TodoProvider } from './TodoContext';
import LogInMange from './components/LogInMange';

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
