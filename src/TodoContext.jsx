import React, { createContext, useReducer, useContext } from 'react';

const initialTodos = {
  user: {
    isLoggedIn: false,
    username: null,
    token: null
  },
  
  lists: [],

  items: [],

  isDeleting: false,

  currentList: null,

  currentListPage: 1,
}

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATELIST':
      return {
        ...state,
        lists: state.lists.concat(action.payload)
      }
    
    case 'CREATEITEM':
      return {
        ...state,
        items: state.items.concat(action.payload)
      }
    
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        lists: action.payload.lists,
        items: action.payload.items
      }
    
    case 'LOGOUT':
      return {
        ...initialTodos,
        user: {
          isLoggedIn: false,
          username: null,
          token: null
        }
      }
    
    case 'SWITCHLIST':
      return {
        ...state,
        currentList: action.payload
      }

    case 'REMOVE-ITEM':
      return {
        ...state,
        lists: action.payload.lists,
        items: action.payload.items
      }

    case 'TOGGLE-ITEM':
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.id)
            return action.payload;
          else
            return item
        })
      }
    
    case 'TOGGLE-DELETE':
      return {
        ...state,
        isDeleting: !state.isDeleting,
      }
    
    case 'PREVPAGE':
      return {
        ...state,
        currentListPage: state.currentListPage - 1
      }

    case 'NEXTPAGE':
      return {
        ...state,
        currentListPage: state.currentListPage + 1
      }

    case 'REMOVELIST':
      return {
        ...state,
        lists: action.payload.lists,
        items: action.payload.items,
        currentList: null
      }

    default:
      throw new Error(`unhandled action type: ${action.type}`)
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoValiateFromServerContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodoValidateFromServer() {
  return useContext(TodoValiateFromServerContext);
}