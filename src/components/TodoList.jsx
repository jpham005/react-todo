import React from 'react';
import { useTodoDispatch } from '../TodoContext.jsx';

function TodoList({ list }) {
  const dispatch = useTodoDispatch();
  
  const onSwitch = () => {
    dispatch({ type: 'SWITCHLIST', payload: list })
  }

  return (
    <button onClick={onSwitch}>{list.name}</button>
  )
}

export default TodoList;