import React, { useState } from 'react';
import { useTodoDispatch, useTodoState } from '../TodoContext';

function CreateList() {
  const state = useTodoState();
  const dispatch = useTodoDispatch();
  //const validateFromServer = useTodoValidateFromServer();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const onToggle = () => setOpen(!open);
  const onChange = e => setValue(e.target.value)

  const validate = (strValue) => {
    if (strValue === '') {
      alert('listname is empty');
      return;
    }

    if (strValue.length < 2 || strValue.length > 10) {
      alert('value must be between 2 ~ 10');
      return;
    }
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const strValue = String(value);
    validate(strValue);
    
    const response = await fetch('http://localhost:8300/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'appication/json',
        authorization: `Bearer ${state.user.token}`
      },
      body: JSON.stringify({
        name: strValue
      })
    });

    if (response.status === 400){
      const data = await response.text();
      alert(data);
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
    
    setValue('');
    setOpen(false);
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