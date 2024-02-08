import { useForm } from 'react-hook-form';
import { Button } from '../../ui/button';
import { Modal } from '../../ui/modal';
import { AddTodoSchema, AddTodoSchemaType } from '../../../lib/todo-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../form/input';
import { TextArea } from '../form/text-area';

export function CreateTodo() {
  const {
    register,
    formState: { errors },
  } = useForm<AddTodoSchemaType>({
    resolver: zodResolver(AddTodoSchema),
  });
  return (
    <Modal
      trigger={<Button className='ml-auto'>Create Todo</Button>}
      title='Create Todo'
    >
      <form className='flex flex-col gap-3'>
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
      </form>
    </Modal>
  );
}
