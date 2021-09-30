import React from 'react';
import { useTodoState } from '../TodoContext.jsx';
import TodoList from './TodoList.jsx';

function SelectList() {
  const state = useTodoState();
  const currentPage = state.currentListPage;
  const len = state.lists.length;

  const rendering = () => {
    const result = [];
      for (let i = ((currentPage - 1) * 4); 
        i < ((currentPage - 1) * 4) + 4; 
        i++) {
          if (i === len) break;

          result.push(
            <span key={i}>
              <TodoList
                list={state.lists[i]}
              />
            </span>
          )
        }    
    return result;
  }

  return <span>{rendering()}</span>;
}

  
export default SelectList;