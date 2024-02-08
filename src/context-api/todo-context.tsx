import { createContext, useState } from 'react';
import { FilterParamsType, TodoType, WrapperType } from '../utils/types';
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
  filter: (filterParams: FilterParamsType) => void;
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

  const filter = (filterParams: FilterParamsType) => {
    setAllTodo(() => {
      const todo = getTodoFromLocal();
      switch (filterParams) {
        case 'normal':
          return todo;
        case 'high':
          return todo.filter((todo) => todo.priority === 'high');
        case 'medium':
          return todo.filter((todo) => todo.priority === 'medium');
        case 'low':
          return todo.filter((todo) => todo.priority === 'low');
        case 'completed':
          return todo.filter((todo) => todo.isCompleted);
        case 'incompleted':
          return todo.filter((todo) => !todo.isCompleted);
        default:
          return getTodoFromLocal() || [];
      }
    });
  };

  return (
    <TodoContext.Provider
      value={{
        allTodo,
        addNewTodo,
        completeTodo,
        deleteTodo,
        updateTodo,
        filter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
