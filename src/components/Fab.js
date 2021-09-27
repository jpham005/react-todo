import React, { useState } from 'react';
import { useTodoDispatch, useTodoState } from '../TodoContext';
import styled from '@emotion/styled';

function Fab() {
  const state = useTodoState();
  const [isExtended, setIsExtended] = useState(false);
  const onToggle = () => setIsExtended(!isExtended);

  const dispatch = useTodoDispatch();
  
  const onCreate = async () => {
    if (state.currentList === null) {
      alert('plz select list');
      return;
    }

    const text = prompt('what to do', '');

    if (text === null || text === '') {
      alert('item is empty');
      return;
    }

    if (text.length > 20) {
      alert('item must be shorter than 20');
      return;
    }

    const response = await fetch('http://localhost:8300/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'appication/json',
        authorization: `Bearer ${state.user.token}`
      },
      body: JSON.stringify({
        listId: state.currentList.id,
        description: text,
        image: ''
      })
    });

    const data = await response.json();
    console.log(data);
    dispatch({ 
      type: 'CREATEITEM', 
      payload: {
        id: data.id,
        text: data.description,
        done: false,
        listId: data.listId
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