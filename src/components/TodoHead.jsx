import React from 'react';
import styled from '@emotion/styled';
import { useTodoState } from '../TodoContext.jsx'

function TodoHead() {
  const date = new Date();

  const timeFormat = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
  }).format(date);

  const state = useTodoState();
  const leftCount = state.currentList !== null ? state.items.filter(item => 
    (item.done === false) && (item.listId === state.currentList.id)
  ).length : null;
  
  return (
    <HeaderContainer>
      <HeaderTitle>
        {timeFormat.replaceAll('.', '')}
      </HeaderTitle>
      <HeaderLeftCount>
        {`삭제 중: ${state.isDeleting}`}<br />
        {state.currentList === null
          ? '현재 리스트: 없음'
          : <>
              현재 리스트: {state.currentList.name}<br/>
              {leftCount}개 할 일 남음
            </>
        }
      </HeaderLeftCount>
    </HeaderContainer>
  )
}

export default TodoHead;

const HeaderContainer = styled.div`
  padding: 24px;
  height: 7.5rem;
  border-bottom: 1px solid var(--grey-200);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const HeaderTitle = styled.h1`
  color: var(--gray-700);
  font-size: 2.25rem;
`;

const HeaderLeftCount = styled.div`
  color: var(--green-400);
  margin-top: 8px;
  font-size: 1.25rem;
  font-weight: 700;
`;