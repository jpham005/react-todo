import React, { useEffect, useState } from 'react';
import { useTodoDispatch, useTodoState } from '../TodoContext';

function SelectList() {
  const state = useTodoState();
  const dispatch = useTodoDispatch();
  const switchList = '';

  useEffect(() => {
    dispatch({ type: 'SWITCHLIST', payload: switchList })  
  }, [switchList])

  return (
    <form>
      <select name={switchList}>
        {state.lists.map(list => {
          <option value={list.name}>{list.name}</option>
        })}
      </select>
    </form>
  )
}

export default SelectList;