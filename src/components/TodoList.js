import React from 'react';
import { useTodoListIsOpen, useTodoState } from '../TodoContext';

function TodoList({ id, name }) {
  const state = useTodoState();
  const open = useTodoListIsOpen();

  const onSelectList = () => {
    state.currentList = Object.values(state.lists)
      .find(list => list.id === state.currentList.id);
    open.current = !open.current;
    return;
  }

  return (
    <button onClick={onSelectList}>
      {name}
    </button>
  )
}

export default TodoList;