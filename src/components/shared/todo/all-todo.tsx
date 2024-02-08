import { useTodoContext } from '../../../hooks/use-todo-context';
import { TodoCard } from './todo-card';

export function AllTodo() {
  const { allTodo } = useTodoContext();
  return (
    <section className='container mt-5'>
      <h1 className='mb-5 text-xl font-semibold'>All Todo</h1>
      {allTodo.length > 0 ? (
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
          {allTodo.map((todo) => (
            <TodoCard key={todo.id} {...todo} />
          ))}
        </div>
      ) : (
        <div className='text-center font-semibold'>No Todo Found</div>
      )}
    </section>
  );
}
