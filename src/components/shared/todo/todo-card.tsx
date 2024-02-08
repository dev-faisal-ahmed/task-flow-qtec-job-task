import { twMerge } from 'tailwind-merge';
import { TodoType } from '../../../utils/types';
import { BiSolidEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useTodoContext } from '../../../hooks/use-todo-context';
import { useState } from 'react';
import { Modal } from '../../ui/modal';
import { Close } from '@radix-ui/react-dialog';
import { Button } from '../../ui/button';
import toast from 'react-hot-toast';

export function TodoCard({
  id,
  addedOn,
  title,
  description,
  isCompleted,
  priority,
}: TodoType) {
  const date = new Date(addedOn);
  const { completeTodo, deleteTodo } = useTodoContext();
  const [deleteDialog, setDeleteDialog] = useState(false);

  const onTodoComplete = () => {
    completeTodo(id);
    toast.success('Todo is completed');
  };

  const onTodoDelete = () => {
    deleteTodo(id);
    toast.success('Todo is deleted');
    setDeleteDialog(false);
  };

  return (
    <div className='rounded-md bg-white p-5 shadow'>
      <div className='flex items-center justify-between'>
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

          <button className='rounded bg-blue-600 p-1 text-white'>
            <BiSolidEdit />
          </button>
          <Modal
            title='Are you sure?'
            open={deleteDialog}
            onOpenChange={setDeleteDialog}
            trigger={
              <span className='cursor-pointer rounded bg-red-600 p-1 text-white'>
                <AiFillDelete />
              </span>
            }
          >
            <div className='flex items-center justify-end gap-3'>
              <Close>
                <span className='cursor-pointer rounded border border-transparent p-2 font-semibold text-gray-900 transition hover:border-red-600 hover:text-red-600'>
                  No
                </span>
              </Close>
              <Button onClick={onTodoDelete}>Yes</Button>
            </div>
          </Modal>
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
