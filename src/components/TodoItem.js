import React from 'react';
import { useTodoDispatch, useTodoIsDeleting } from '../TodoContext';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();
  const isDeleting = useTodoIsDeleting();
  const onToggle = () => dispatch({ type: 'TOGGLE', id, isDeleting });
  
  return (
    <>
      <Item onClick={onToggle} done={done}>
        {text}
      </Item>
    </>
  )
}

export default TodoItem;


const Item = styled.li`
  display: flex;
  align-items: center;
  height: 3.75rem;
  font-size: 1.5rem;
  user-select: none;
  ${props =>
    props.done &&
    css`
      color: var(--grey-400);
      text-decoration: line-through;
    `
  }
`;