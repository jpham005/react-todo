import React, { createContext, useReducer, useRef, useContext } from 'react';

const initialTodos = {
  users: {
    admin: {
      id: 'admin',
      username: 'admin',
      password: 'admin',
    }
  },
  lists: {
    preventNull: {
      id: null,
      name: null,
      ownerId: null,
    }
  },
  items: {
    preventNull: {
      id: null,
      listId: null,
      text: null,
    }
  },
}

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATEUSER':
      return {
        ...state,
        users.action.user.id: action.user
      }
      return state.users[action.user.id] = action.user;
    case 'CREATELIST':
      return state.lists[action.list.id] = action.list;
    case 'CREATEITEM':
      return state.items[action.item.id] = action.item;
      
    case 'TOGGLE':
      if (action.isDeleting.current === true){
        return state.items.filter(todo => todo.id !== action.id)
      }
      return state.items.map(todo =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        );
    default:
      throw new Error(`unhandled action type: ${action.type}`)
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
const TodoIsDeletingContext = createContext();
const TodoListIsOpenContext = createContext();
const TodoCurrentUserContext = createContext();
const TodoCurrentListContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(3);
  const isDeleting = useRef(false);
  const listIsOpen = useRef(false);
  const currentUser = useRef(`asdf`);
  const currentList = useRef(undefined);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          <TodoIsDeletingContext.Provider value={isDeleting}>
            <TodoListIsOpenContext.Provider value={listIsOpen}>
              <TodoCurrentUserContext.Provider value={currentUser}>
                <TodoCurrentListContext.Provider value={currentList}>
                  {children}
                </TodoCurrentListContext.Provider>
              </TodoCurrentUserContext.Provider>
            </TodoListIsOpenContext.Provider>
          </TodoIsDeletingContext.Provider> 
        </TodoNextIdContext.Provider>
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

export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}

export function useTodoIsDeleting() {
  return useContext(TodoIsDeletingContext);
}

export function useTodoListIsOpen() {
  return useContext(TodoListIsOpenContext);
}

export function useTodoCurrentUser() {
  return useContext(TodoCurrentUserContext);
}

export function useTodoCurrentList() {
  return useContext(TodoCurrentListContext);
}