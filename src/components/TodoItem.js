import React from 'react';
import { useTodoDispatch, useTodoState } from '../TodoContext';
//import styled from '@emotion/styled';

function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();
  const state = useTodoState();
  const isDeleting = state.isDeleting;

  const onToggle = () => dispatch({ type: 'TOGGLE-ITEM', payload: {
      id, 
      isDeleting,
    } 
  });
  
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