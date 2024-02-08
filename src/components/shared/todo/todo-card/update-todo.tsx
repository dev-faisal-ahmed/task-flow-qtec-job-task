import { BiSolidEdit } from 'react-icons/bi';
import { PriorityType, TodoType } from '../../../../utils/types';
import { Modal } from '../../../ui/modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddTodoSchema, AddTodoSchemaType } from '../../../../lib/todo-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTodoContext } from '../../../../hooks/use-todo-context';
import { Input } from '../../form/input';
import { TextArea } from '../../form/text-area';
import { Select } from '../../form/select';
import { priorities } from '../../../../lib/data';
import { Button } from '../../../ui/button';
import toast from 'react-hot-toast';

type UpdateTodoProps = {
  todo: TodoType;
};

export function UpdateTodo({ todo }: UpdateTodoProps) {
  const { title, description, priority } = todo;
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTodoSchemaType>({
    resolver: zodResolver(AddTodoSchema),
  });

  const { updateTodo } = useTodoContext();

  const handleAddTodo = handleSubmit((data) => {
    const { title, description, priority } = data;

    updateTodo({
      ...todo,
      title: title.trim(),
      description: description.trim(),
      priority: priority as PriorityType,
    });

    reset();
    toast.success('Todo Updated!');
    setOpen(false);
  });

  return (
    <Modal
      trigger={
        <button className='rounded bg-blue-600 p-1 text-white'>
          <BiSolidEdit />
        </button>
      }
      title='Update Todo'
      open={open}
      onOpenChange={setOpen}
    >
      <form
        onSubmit={handleAddTodo}
        className='customized_scrollbar flex max-h-[70vh] flex-col gap-3 overflow-y-auto px-1'
      >
        <Input
          label='Title'
          name='title'
          placeholder='Add Title'
          register={register}
          type='text'
          error={errors.title}
          defaultValue={title}
          required
        />
        <TextArea
          label='Description'
          name='description'
          placeholder='Write Descriptions'
          register={register}
          error={errors.description}
          defaultValue={description}
          required
        />
        <Select
          label='Priority'
          name='priority'
          register={register}
          error={errors.priority}
          defaultValue={priority}
          options={priorities}
        />
        <Button className='mt-5'>Add To Do</Button>
      </form>
    </Modal>
  );
}
