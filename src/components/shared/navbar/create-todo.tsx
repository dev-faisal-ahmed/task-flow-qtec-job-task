import { AddTodoSchema, AddTodoSchemaType } from '../../../lib/todo-schema';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/button';
import { Modal } from '../../ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../form/input';
import { TextArea } from '../form/text-area';
import { Select } from '../form/select';
import { priorities } from '../../../lib/data';
import { useTodoContext } from '../../../hooks/use-todo-context';
import { PriorityType } from '../../../utils/types';
import { useState } from 'react';

export function CreateTodo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTodoSchemaType>({
    resolver: zodResolver(AddTodoSchema),
  });

  const [open, setOpen] = useState(false);
  const { addNewTodo } = useTodoContext();

  const handleAddTodo = handleSubmit((data) => {
    const { title, description, priority } = data;
    const addedOn = new Date().getTime();
    const id = addedOn.toString(32);

    addNewTodo({
      title: title.trim(),
      description: description.trim(),
      priority: priority as PriorityType,
      addedOn,
      id,
      isCompleted: false,
    });

    reset();
    setOpen(false);
  });

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <span className='cursor-pointer whitespace-nowrap rounded bg-primary-600 px-3 py-2 text-white transition hover:bg-primary-700'>
          Create Todo
        </span>
      }
      title='Create Todo'
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
          required
        />
        <TextArea
          label='Description'
          name='description'
          placeholder='Write Descriptions'
          register={register}
          error={errors.description}
          required
        />
        <Select
          label='Priority'
          name='priority'
          register={register}
          error={errors.priority}
          options={priorities}
        />
        <Button className='mt-5'>Add To Do</Button>
      </form>
    </Modal>
  );
}
