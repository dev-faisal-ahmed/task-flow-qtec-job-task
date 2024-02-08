import { LuSearch } from 'react-icons/lu';

export function Search() {
  return (
    <form className='focus-within:ring-primary-600 flex items-center gap-3 rounded border px-3 py-2 focus-within:border-transparent focus-within:ring-2'>
      <label htmlFor='search'>
        <LuSearch />
      </label>
      <input
        className='w-full outline-none'
        id='search'
        type='text'
        placeholder='Search Here...'
      />
    </form>
  );
}
