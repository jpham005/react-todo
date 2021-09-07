import React, { useState } from 'react';
import { useTodoDispatch, useTodoValidateFromServer } from '../TodoContext';

function CreateList() {
  const dispatch = useTodoDispatch();
  const validateFromServer = useTodoValidateFromServer();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const onToggle = () => setOpen(!open);
  const onChange = e => setValue(e.target.value)

  const validate = () => {
    if (value === '') {
      alert('listname is empty');
      return;
    }

    if (value < 2 || value > 10) {
      alert('value must be between 2 ~ 10');
      return;
    }
    
    if (validateFromServer('list', value) === 'failed') {
      alert('list name has occupied');
      return;
    }
  }
  
  const onSubmit = e => {
    e.preventDefault();
    validate();
    //async & await?
    dispatch({
      type: 'CREATELIST',
      payload: {
        name: value,
      }
    });

    setValue('');
    setOpen(false);
  }

  return (
    <>
      {open && (
        <form onSubmit={onSubmit}>
          <input
            type="text"
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