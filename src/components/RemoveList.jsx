import React from 'react';
import { useTodoDispatch, useTodoState } from '../TodoContext';

function RemoveList() {
  const state = useTodoState();
  const dispatch = useTodoDispatch();

  const onRemove = async () => {
    try {
      const response = await fetch('http://localhost:8300/list/remove', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${state.user.token}`
        },
        body: JSON.stringify({
          listId: state.currentList.id
        })
      })

      if (response.status === 400)
        throw Error('error!');;

      const newTodoList = await response.json();

      dispatch({ type: 'REMOVELIST', payload: {
        lists: newTodoList.lists,
        items: newTodoList.items
        }
      });
    } catch (e) {
      alert('bad server');
    }
  }

  return (
    <>
      <button onClick={onRemove}>
        현재 리스트 지우기
      </button>
    </>
  )
}

export default RemoveList