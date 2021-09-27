import React from 'react';
//import styled from '@emotion/styled';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';

function Todos() {
  const state = useTodoState();
  const currentListId = state.currentList.id;
  const items = state.items.filter(item => item.listId === currentListId)

  return (
//    <ContentContainer>
//      <ContentList>
<>
        {(items.length !== 0) 
          ? items.map(item => (
              <TodoItem 
                key={item.id}
                id={item.id}
                text={item.text}
                done={item.done}
              />
            )) 
          : <li>no items</li>
        }
</>
//      </ContentList>
//    </ContentContainer>
  )
}
/*
const ContentContainer = styled.div`
  height: calc(100% - 7.5rem);
  padding: 24px 0px 24px 24px;
`;

const ContentList = styled.ul`
  height: 100%;
  overflow-y: auto;
  padding-right: 24px;
`;
*/
export default Todos;