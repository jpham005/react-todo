import React, { useState } from 'react';
import { useTodoDispatch, useTodoState } from '../TodoContext';

function RemoveUser() {
  const state = useTodoState();
  const dispatch = useTodoDispatch();
  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen(true);
  }

  const onRemove = async () => {
    try {
      const response = await fetch('http://localhost:8300/user/remove', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${state.user.token}`
        },
        body: JSON.stringify({})
      })

      if (await response.text() === 'done') {
        dispatch({ type: 'LOGOUT' });
      } else {
        throw Error('error');
      }
    } catch (e) {
      alert('bad server');
    }
  }

  const onCancel = () => {
    setOpen(false);
  }

  return (
    <>
      {open
        ? <>
          really?
          <button onClick={onRemove}>
            yes
          </button>
          <button onClick={onCancel}>
            no
          </button>
        </>
        : <button onClick={onToggle}>
          delete user
        </button>
      }
    </>
  );
}

export default RemoveUser;