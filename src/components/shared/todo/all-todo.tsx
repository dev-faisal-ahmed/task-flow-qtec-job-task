/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useTodoContext } from '../../../hooks/use-todo-context';
import { TodoCard } from './todo-card/todo-card';
import { FilterParamsType } from '../../../utils/types';
import { getTodoFromLocal } from '../../../utils/helper/local-storage-helper';

export function AllTodo() {
  const { allTodo, filter, reset } = useTodoContext();
  const [filterParam, setFilterParam] = useState<FilterParamsType>('normal');

  const completedTaskCount = useMemo(() => {
    return allTodo.filter((todo) => todo.isCompleted).length;
  }, [allTodo]);

  useEffect(() => {
    filter(filterParam);
  }, [filterParam]);

  return (
    <section className='container my-5'>
      <div className='mb-5 flex items-center justify-between'>
        <div className='flex items-center gap-5'>
          <h1 className=' text-xl font-semibold'>
            Todo ({completedTaskCount}/{allTodo.length})
          </h1>
          {(getTodoFromLocal() || []).length !== allTodo.length && (
            <button
              onClick={reset}
              className='rounded border border-red-500 px-3 py-[2px] text-red-500'
            >
              Reset
            </button>
          )}
        </div>

        <div className='min-w-[120px] rounded-md bg-white px-3 py-1 shadow'>
          <select
            value={filterParam}
            onChange={(e) => setFilterParam(e.target.value as FilterParamsType)}
            className='w-full cursor-pointer outline-none'
          >
            <option value={'normal'}>Normal</option>
            <option value={'high'}>High</option>
            <option value={'medium'}>Medium</option>
            <option value={'low'}>Low</option>
            <option value={'completed'}>Completed</option>
            <option value={'incompleted'}>Incompleted</option>
          </select>
        </div>
      </div>
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
