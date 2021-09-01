import React from 'react';
import TodoHead from './components/TodoHead';
import Todos from './components/Todos';
import Fab from './components/Fab';
import { TodoProvider } from './TodoContext';

function App() {
  return (
    <>
      <TodoProvider>
        <TodoHead />
        <Todos />
        <Fab />
      </TodoProvider>
    </>
  );
}

export default App;
