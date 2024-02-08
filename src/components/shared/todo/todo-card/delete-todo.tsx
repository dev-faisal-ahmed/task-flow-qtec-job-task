import { useState } from 'react';
import { Modal } from '../../../ui/modal';
import { useTodoContext } from '../../../../hooks/use-todo-context';
import { AiFillDelete } from 'react-icons/ai';
import { Close } from '@radix-ui/react-dialog';
import { Button } from '../../../ui/button';
import toast from 'react-hot-toast';

export function DeleteTodo({ id }: { id: string }) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { deleteTodo } = useTodoContext();

  const onTodoDelete = () => {
    deleteTodo(id);
    toast.success('Todo is deleted');
    setDeleteDialog(false);
  };
  return (
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
  );
}
