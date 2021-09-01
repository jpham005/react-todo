import React from 'react';
import styled from '@emotion/styled';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';

function Todos() {
  const todos = useTodoState();

  return (
    <ContentContainer>
      <ContentList>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id}
            id={todo.id}
            text={todo.text}
            done={todo.done}
          />
        ))}
      </ContentList>
    </ContentContainer>
  )
}

const ContentContainer = styled.div`
  height: calc(100% - 7.5rem);
  padding: 24px 0px 24px 24px;
`;

const ContentList = styled.ul`
  height: 100%;
  overflow-y: auto;
  padding-right: 24px;
`;

export default Todos;