import React, { useState } from 'react';
import { useTodoDispatch, useTodoState } from '../TodoContext.jsx';

function CreateList() {
  const state = useTodoState();
  const dispatch = useTodoDispatch();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const onToggle = () => setOpen(!open);
  const onChange = e => setValue(e.target.value)

  const validate = (value) => {
    if (value === '') {
      throw Error('listname is empty');
    }

    if (value.length < 1 || value.length > 20) {
      throw Error('listname must be between 1 ~ 20');
    }
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      validate(value);
      
      const response = await fetch('http://localhost:8300/list/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'appication/json',
          authorization: `Bearer ${state.user.token}`
        },
        body: JSON.stringify({
          name: value
        })
      });

      if (response.status === 400){
        const error = await response.text();
        throw Error(`${error}`);
      } else {
        const data = await response.json();

        dispatch({
          type: 'CREATELIST',
          payload: {
            name: data.name,
            id: data.id,
          }
        });  
      }
    } catch (e) {
      if (e.message === 'listname is empty')
        alert('listname is empty');

      else if (e.message === 'listname must be between 1 ~ 20')
        alert('listname must be between 1 ~ 20');
      
      else
        alert(`${e.message}`);
    } finally {
      setValue('');
      setOpen(false);
    }
  }

  return (
    <>
      {open && (
        <form onSubmit={onSubmit}>
          <input
            value={value}
            placeholder="list name!"
            autoFocus
            onChange={onChange}
          />
        </form>
      )}
      <button onClick={onToggle}>
        new List
      </button>
    </>
  )
}

export default CreateList;