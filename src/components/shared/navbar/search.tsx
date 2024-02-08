import { FormEvent } from 'react';
import { LuSearch } from 'react-icons/lu';
import { useTodoContext } from '../../../hooks/use-todo-context';

export function Search() {
  const { search } = useTodoContext();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement & {
      search: { value: string };
    };

    const searchTerm = target.search.value.trim();
    const searchTeamArray = searchTerm.split(' ');
    search(searchTeamArray);
  };
  return (
    <form
      onSubmit={handleSearch}
      className='flex w-full items-center gap-3 rounded px-3 py-2 focus-within:border-transparent'
    >
      <label htmlFor='search'>
        <LuSearch />
      </label>
      <input
        className='w-full bg-transparent outline-none'
        id='search'
        name='search'
        type='text'
        placeholder='Search Here...'
      />
    </form>
  );
}
