import { twMerge } from 'tailwind-merge';
import { TodoType } from '../../../utils/types';
import { BiSolidEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { ImCheckmark } from 'react-icons/im';

export function TodoCard({
  id,
  addedOn,
  title,
  description,
  isCompleted,
  priority,
}: TodoType) {
  const date = new Date(addedOn);

  console.log(isCompleted);

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
            <button className='rounded bg-red-200 px-3 py-1 text-xs text-red-600'>
              Incomplete
            </button>
          )}

          <button className='rounded bg-blue-600 p-1 text-white'>
            <BiSolidEdit />
          </button>
          <button className='rounded bg-red-600 p-1 text-white'>
            <AiFillDelete />
          </button>
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
