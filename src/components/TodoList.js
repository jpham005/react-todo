import React from 'react';
import { useTodoCurrentList, useTodoListIsOpen, useTodoState } from '../TodoContext';

function TodoList({ id, name }) {
  const state = useTodoState();
  const open = useTodoListIsOpen();
  const currentList = useTodoCurrentList();
  
  const onSelectList = () => {
    currentList.current = Object.values(state.lists)
      .find(list => list.id === currentList.current.id);
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