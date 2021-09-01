import React, { useState } from 'react';
import { useTodoDispatch, useTodoIsDeleting, useTodoNextId } from '../TodoContext';
import styled from '@emotion/styled';
import fab from '../svgs/fab.svg';

function Fab() {

  const [isExtended, setIsExtended] = useState(false);
  const onToggle = () => setIsExtended(!isExtended);

  const isDeleting = useTodoIsDeleting();
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();
  
  const onCreate = () => {
      const text = prompt('what to do', '');
      if (text === null || text === '') return;

      dispatch({ 
      type: 'CREATE', 
      todo: {
        id: nextId.current,
        text: text,
        done: false,
      }
    })

    nextId.current += 1;
  }

  const onRemove = () => {
    isDeleting.current = !isDeleting.current
    return;
  }

  return (
    <StyledFab>
      {isExtended && (
        <>
          <button onClick={onCreate}>
            add
          </button>
          <button onClick={onRemove}>
            remove
          </button>
        </>
      )}
      <ExtendedFab onClick={onToggle} open={isExtended}>
        fab
      </ExtendedFab>
    </StyledFab>
  )
}

const StyledFab = styled.div`
  text-transform: none;
  -webkit-appearance: none;
  padding: 8px;
  border: 0;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  position: absolute;
  right: 16px;
  bottom: 16px;
  transition: transform 250ms, background-color 250ms;
`;

const ExtendedFab = styled.button`
  &:hover {
    background: var(--green-600);
  }

  background: ${props =>
    props.open ? 'var(--cerise-500)' : 'var(--green-500)'}
`;

export default Fab;