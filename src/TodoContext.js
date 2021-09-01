import React, { createContext, useReducer, useRef, useContext } from 'react';

const initialTodos = [];

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      if (action.isDeleting.current === true){
        return state.filter(todo => todo.id !== action.id)
      }
      return state.map(todo =>
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

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(3);
  const isDeleting = useRef(false);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          <TodoIsDeletingContext.Provider value={isDeleting}>
            {children}
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