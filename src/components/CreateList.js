import React from 'react';
import { useTodoDispatch, useTodoState } from '../TodoContext';
import { v4 as uuidv4 } from 'uuid';

function CreateList() {
  const dispatch = useTodoDispatch();
  const state = useTodoState();

  const onCreateList = () => {
    const id = uuidv4();

    const name = prompt('list name', '');
    if (name === null || name === '')
      return alert('name is empty');
    if (Object.values(state.users)
      .find(users => users.name === name) !== undefined)
      return alert('this name has occupied');
    
    const ownerId = state.currentUser.id;

    dispatch({ type: 'CREATELIST', list: {
      id,
      name,
      ownerId,
    }})
  }

  return (
    <button onClick={onCreateList}>
      new List
    </button>
  )
}

export default CreateList;