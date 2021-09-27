import React from 'react';
import { useTodoState } from '../TodoContext';
import TodoList from './TodoList';

function SelectList() {
  const state = useTodoState();
  const currentPage = state.currentListPage;
  const len = state.lists.length;

  const rendering = () => {
    const result = [];

    if (len >= 4) {
      for (let i = currentPage - 1; i < currentPage + 3; i++) {
        result.push(
          <span key={i}>
            <TodoList
              list={state.lists[i]}
            />
          </span>
        )
      }
    }
    else {
      for (let i = 0; i < len; i++) {
        result.push(
          <span key={i}>
            <TodoList
              list={state.lists[i]}
            />
          </span>
        )
      }
    }

    return result;
  }

  return <span>{rendering()}</span>;
}

  
export default SelectList;