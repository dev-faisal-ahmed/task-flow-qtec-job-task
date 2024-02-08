import { CreateTodo } from './create-todo';
import { Search } from './search';

export function Navbar() {
  return (
    <nav className='border-b border-gray-300 py-3'>
      <section className='container flex items-center justify-between gap-5'>
        <Search />
        <CreateTodo />
      </section>
    </nav>
  );
}
