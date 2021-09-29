import React from 'react';
import { useTodoDispatch, useTodoState } from '../TodoContext.jsx';
//import styled from '@emotion/styled';

function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();
  const state = useTodoState();
  const isDeleting = state.isDeleting;

  const onToggle = async () => {
    if (isDeleting === true) {
      const response = await fetch('http://localhost:8300/item/remove',{
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${state.user.token}`
        },
        body: JSON.stringify({
          itemId: id
        })
      })

      const newTodoList = await response.json(); 

      dispatch({
        type: 'REMOVE-ITEM', payload: {
          lists: newTodoList.lists,
          items: newTodoList.items
        }
      });
    } else {
      const response = await fetch('http://localhost:8300/item/toggle',{
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${state.user.token}`
        },
        body: JSON.stringify({
          itemId: id
        })
      })

      const newItemState = await response.json();

      dispatch({
        type: 'TOGGLE-ITEM', payload: {
          id: newItemState.id,
          text: newItemState.text,
          done: newItemState.done,
          listId: newItemState.listId
        } 
      });
    }   
  }
  
  return (
    <>
      <li onClick={onToggle} done={done}>
        {text}
      </li>
    </>
  )
}

export default TodoItem;

/*
const Item = styled.li`
  display: flex;
  align-items: center;
  height: 3.75rem;
  font-size: 1.5rem;
  user-select: none;
  ${props =>
    props.done && `
      color: var(--grey-400);
      text-decoration: line-through;
    `
  }
`;*/