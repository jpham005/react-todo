import React from 'react';
import { useTodoListIsOpen, useTodoState } from '../TodoContext';
import TodoList from './TodoList';

function SelectList() {
  const state = useTodoState();
  const open = useTodoListIsOpen();
  
  const onShowList = () => {
    open.current = !open.current
    return;
  }

  const userList = Object.values(state.lists)
    .filter(list => list.ownerId === state.user.username);

  if (userList === undefined) return alert('you dont have any list!')

  return (
    <>
      {open.current && (
        userList.map(list => 
          <TodoList
            key={list.id}
            id={list.id}
            name={list.name}
          />
        )
      )}
      <button onClick={onShowList}>
        select list
      </button>
    </>
  )
}

export default SelectList;