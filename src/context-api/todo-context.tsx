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
  search: (searchKeys: string[]) => void;
  reset: () => void;
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

  const search = (searchKeys: string[]) => {
    setAllTodo(() => {
      const allTodo = getTodoFromLocal();
      const todoObject = searchKeys.reduce(
        (obj: Record<string, TodoType>, searchKey) => {
          // object is being used so that same todo does not appear more than once.
          // we could have do it using array but that will increase time complexity

          for (const todo of allTodo) {
            const lowerSearchKey = searchKey.toLowerCase();
            const title = todo.title.toLowerCase();
            const description = todo.description.toLowerCase();

            if (
              title.includes(lowerSearchKey) ||
              description.includes(lowerSearchKey)
            ) {
              obj[todo.id] = todo; // if description or title matches we will insert in into the object
            }
          }
          return obj;
        },
        {}, // by default empty object
      );
      return Object.values(todoObject); // returning as array of todo
    });
  };

  const reset = () => {
    setAllTodo(getTodoFromLocal());
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
        search,
        reset,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
