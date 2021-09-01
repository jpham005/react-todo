import React from 'react';
import styled from '@emotion/styled';
import { useTodoIsDeleting, useTodoState } from '../TodoContext'

function TodoHead() {
  const date = new Date();

  const timeFormat = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
  }).format(date);

  const isDeleting = useTodoIsDeleting();

  const state = useTodoState();
  const leftCount = state.filter(arr => !arr.done).length;

  return (
    <HeaderContainer>
      <HeaderTitle>
        {timeFormat.replaceAll('.', '')}
      </HeaderTitle>
      <HeaderLeftCount>
        {leftCount}개 할 일 남음 <br />{`${isDeleting.current}`}
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