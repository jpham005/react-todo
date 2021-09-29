import React from 'react';
import { useTodoDispatch, useTodoState } from '../TodoContext';

function ListPaging() {
  const state = useTodoState();
  const dispatch = useTodoDispatch();

  const onPreviousPage = () => {
    dispatch({ type: 'PREVPAGE' });
  }

  const onNextPage = () => {
    dispatch({ type: 'NEXTPAGE' });
  }
  
  return (
    <>
      <span>
        현재 페이지: {state.currentListPage}
      </span>
      <span>
        {state.currentListPage > 1 &&
          <button onClick={onPreviousPage}>
            이전 페이지
          </button>
        }
      </span>
      <span>
        {state.lists.length > 4 
          && (state.lists.length - (state.currentListPage * 4) > 0 )
          && <button onClick={onNextPage}>
                다음 페이지
             </button>
        }
      </span>
    </>
  )
}

export default ListPaging;