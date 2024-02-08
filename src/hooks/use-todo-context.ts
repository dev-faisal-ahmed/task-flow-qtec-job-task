import { useContext } from 'react';
import { TodoContext } from '../context-api/todo-context';

export function useTodoContext() {
  const todoContext = useContext(TodoContext);
  if (!todoContext) throw new Error('Can not access context here');
  return todoContext;
}
