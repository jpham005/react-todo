import React, { createContext, useReducer, useRef, useContext } from 'react';
/*interface InitialState {
  user: {
    isLoggedIn: boolean;
    username: string;
  };
  lists: string[];
  items: {
    [key: string]: {
      id: string | null,
      text: string | null,
    }[];
  }
}*/
const initialTodos = {
  user: {
    isLoggedIn: true,
    username: 'admin',
  },
  lists: [
    {id: 1, name: 'list1'},
    {id: 2, name: 'list2'},
    {id: 3, name: 'list3'},
  ],
  items: [

  ],
  isDeleting: false,

  currentList: null,
}

function save() {

}

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATEUSER':
      save(action.payload)
      return state;
    
    case 'CREATELIST':
      save(action.payload)
      const newList = [];
      //const newList = load(by listname)
      return {
        ...state,
        lists: state.lists.concat(newList)
      }
    
    case 'CREATEITEM':
      save(action.payload)
      const newItem = {};
      return {
        ...state,
        items: state.items.concat(newItem)
      }
    
    case 'LOGIN':
      const newState = {user:{},lists:[],items:{}}
      //load user's lists, items from server
      return {
       ...newState,
       user: {
         isLoggedIn: true,
        }
      }
    
    case 'LOGOUT':
      return {
        ...initialTodos,
        user: {
          isLoggedIn: false,
          username: null,
        }
      }
    
    case 'SWITCHLIST':
      return {
        ...state,
        currentList: action.payload
      }

    case 'TOGGLE-ITEM':
      if (action.isDeleting === true) {
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