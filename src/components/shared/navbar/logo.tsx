export function Logo() {
  return (
    <h1 className='flex cursor-pointer gap-1 font-bold'>
      <span className='bg-primary-600 flex items-center rounded-s px-3 py-1 text-white'>
        Task
      </span>{' '}
      <span className='text-primary-600 border-primary-600 flex items-center border-y-2 px-2 py-1'>
        Flow
      </span>
    </h1>
  );
}
