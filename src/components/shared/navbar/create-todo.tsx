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

export function CreateTodo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTodoSchemaType>({
    resolver: zodResolver(AddTodoSchema),
  });

  const { dispatch } = useTodoContext();

  const handleAddTodo = handleSubmit((data) => {
    const { title, description, priority } = data;
    const date = new Date().getTime();
    const id = date.toString(32);

    dispatch({
      type: 'ADD_TODO',
      payload: {
        id,
        title: title.trim(),
        description: description.trim(),
        date,
        isCompleted: false,
        priority: priority as PriorityType,
      },
    });

    reset();
  });

  return (
    <Modal
      trigger={
        <span className='whitespace-nowrap rounded bg-primary-600 px-3 py-2 text-white transition hover:bg-primary-700'>
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
