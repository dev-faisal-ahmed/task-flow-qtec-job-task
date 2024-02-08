import { LuSearch } from 'react-icons/lu';

export function Search() {
  return (
    <form className='flex w-full items-center gap-3 rounded px-3 py-2 focus-within:border-transparent'>
      <label htmlFor='search'>
        <LuSearch />
      </label>
      <input
        className='w-full bg-transparent outline-none'
        id='search'
        type='text'
        placeholder='Search Here...'
      />
    </form>
  );
}
