import { createContext, useState } from 'react';
import { TodoType, WrapperType } from '../utils/types';
import {
  getTodoFromLocal,
  setTodoToLocal,
} from '../utils/helper/local-storage-helper';

type TodoContextType = {
  allTodo: TodoType[];
  addNewTodo: (todo: TodoType) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: WrapperType) {
  const [allTodo, setAllTodo] = useState(getTodoFromLocal());

  const addNewTodo = (todo: TodoType) => {
    setAllTodo((prev) => {
      const tempAllTodo = prev;
      setTodoToLocal([...tempAllTodo, todo]);
      return [...tempAllTodo, todo];
    });
  };

  return (
    <TodoContext.Provider value={{ allTodo, addNewTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
