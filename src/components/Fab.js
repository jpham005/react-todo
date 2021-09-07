import React, { useState } from 'react';
import { useTodoDispatch } from '../TodoContext';
import styled from '@emotion/styled';

function Fab() {

  const [isExtended, setIsExtended] = useState(false);
  const onToggle = () => setIsExtended(!isExtended);

  const dispatch = useTodoDispatch();
  
  const onCreate = () => {
      const text = prompt('what to do', '');
      if (text === null || text === '') return;

      dispatch({ 
      type: 'CREATEITEM', 
      payload: {
        text: text,
        done: false,
      }
    })
  }

  const onRemove = () => {
    dispatch({ type: 'TOGGLE-DELETE' })
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