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

function save() {

}

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATEUSER':
      save(action.payload)
      return state;
    
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
        user: {
          isLoggedIn: true,
          username: action.payload.username,
          token: action.payload.token
        }
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

    case 'TOGGLE-ITEM':
      if (action.payload.isDeleting === true) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        }
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? {...item, done: !item.done} : item
        ),
      }
    
    case 'TOGGLE-DELETE':
      return {
        ...state,
        isDeleting: !state.isDeleting,
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
  const validateFromServer = (type, name) => {
    //somehow validate in server
  }

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoValiateFromServerContext.Provider value={validateFromServer}>
          {children}
        </TodoValiateFromServerContext.Provider>
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