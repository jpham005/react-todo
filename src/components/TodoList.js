import React, { useEffect, useState } from 'react';
import { useTodoState } from '../TodoContext';

function TodoList({ name }) {
  const state = useTodoState();
  const [value, setValue] = useState()
  
  useEffect(() => {

  }, [value])

  return (
    <option value={value}>{name}</option>
  )
}

export default TodoList;