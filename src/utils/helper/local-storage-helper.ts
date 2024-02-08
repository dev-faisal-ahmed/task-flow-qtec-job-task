import { TodoType } from '../types';

export const setTodoToLocal = (allTodo: TodoType[]) => {
  localStorage.setItem('allTodo', JSON.stringify(allTodo));
};

export const getTodoFromLocal = (): TodoType[] => {
  const dataFromLocal = localStorage.getItem('allTodo');
  if (!dataFromLocal) return [];

  const allTodo = JSON.parse(dataFromLocal);
  return allTodo;
};
