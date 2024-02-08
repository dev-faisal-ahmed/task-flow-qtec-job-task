import { createContext, useState } from 'react';
import { TodoType, WrapperType } from '../utils/types';
import {
  getTodoFromLocal,
  setTodoToLocal,
} from '../utils/helper/local-storage-helper';

type TodoContextType = {
  allTodo: TodoType[];
  addNewTodo: (todo: TodoType) => void;
  completeTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: TodoType) => void;
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

  const completeTodo = (id: string) => {
    setAllTodo((prev) => {
      const updatedTodo = prev.map((todo) => {
        if (todo.id === id) {
          todo.isCompleted = true;
          return todo;
        }
        return todo;
      });
      setTodoToLocal(updatedTodo);
      return updatedTodo;
    });
  };

  const updateTodo = (targetTodo: TodoType) => {
    setAllTodo((prev) => {
      const updatedTodo = prev.map((todo) => {
        if (todo.id === targetTodo.id) {
          todo = targetTodo;
        }
        return todo;
      });
      setTodoToLocal(updatedTodo);
      return updatedTodo;
    });
  };

  const deleteTodo = (id: string) => {
    setAllTodo((prev) => {
      const remainingTodo = prev.filter((todo) => todo.id !== id);
      setTodoToLocal(remainingTodo);
      return remainingTodo;
    });
  };

  return (
    <TodoContext.Provider
      value={{ allTodo, addNewTodo, completeTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}
