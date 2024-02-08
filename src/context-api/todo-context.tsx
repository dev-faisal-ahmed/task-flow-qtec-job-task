import { Dispatch, createContext, useReducer } from 'react';
import { TodoType, WrapperType } from '../utils/types';
import {
  getTodoFromLocal,
  setTodoToLocal,
} from '../utils/helper/local-storage-helper';

type GlobalStateType = {
  allTodo: TodoType[];
};

const initialState: GlobalStateType = {
  allTodo: getTodoFromLocal(),
};

type ActionType = { type: 'ADD_TODO'; payload: TodoType };

function reducer(state: GlobalStateType, action: ActionType) {
  switch (action.type) {
    case 'ADD_TODO': {
      state.allTodo.push(action.payload);
      setTodoToLocal(state.allTodo);
      return state;
    }

    default:
      return state;
  }
}

export const TodoContext = createContext<{
  state: GlobalStateType;
  dispatch: Dispatch<ActionType>;
} | null>(null);

export function TodoProvider({ children }: WrapperType) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
