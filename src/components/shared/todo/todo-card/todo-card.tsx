import { twMerge } from 'tailwind-merge';
import { TodoType } from '../../../../utils/types';
import { useTodoContext } from '../../../../hooks/use-todo-context';
import { DeleteTodo } from './delete-todo';
import { UpdateTodo } from './update-todo';
import toast from 'react-hot-toast';

export function TodoCard(todo: TodoType) {
  const { id, addedOn, title, description, isCompleted, priority } = todo;
  const date = new Date(addedOn);
  const { completeTodo } = useTodoContext();

  const onTodoComplete = () => {
    completeTodo(id);
    toast.success('Todo is completed');
  };

  return (
    <div className='rounded-md bg-white p-5 shadow'>
      <div className='mb-2 flex items-center justify-between'>
        {/* todo priority color */}
        <p
          className={twMerge(
            'mb-1 w-fit rounded px-2 py-1 text-xs font-semibold uppercase',
            priority === 'high' ? 'bg-primary-100 text-primary-600' : null,
            priority === 'medium' ? 'bg-orange-100 text-orange-600' : null,
            priority === 'low' ? 'bg-yellow-100 text-yellow-600' : null,
          )}
        >
          {priority}
        </p>

        {/* completed status */}
        <div className='flex items-center gap-2'>
          {isCompleted ? (
            <button className='rounded bg-green-200 px-3 py-1 text-xs text-green-600'>
              Completed
            </button>
          ) : (
            <button
              onClick={onTodoComplete}
              className='rounded bg-red-200 px-3 py-1 text-xs text-red-600'
            >
              Incomplete
            </button>
          )}

          {/* update todo */}
          <UpdateTodo todo={todo} />
          {/* delete todo */}
          <DeleteTodo id={id} />
        </div>
      </div>

      <h2 className='text-lg font-semibold capitalize'>{title}</h2>
      <p className='mt-1 text-xs text-gray-500'>
        {date.toString().slice(0, 15)}
      </p>
      <p className='mt-2 text-gray-700'>{description}</p>
    </div>
  );
}
