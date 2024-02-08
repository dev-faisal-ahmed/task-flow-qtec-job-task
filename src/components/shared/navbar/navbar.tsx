import { CreateTodo } from './create-todo';
import { Search } from './search';

export function Navbar() {
  return (
    <nav className='sticky top-0 border-b border-gray-300 bg-primary-50 py-3 backdrop-blur'>
      <section className='container flex items-center justify-between gap-5'>
        <Search />
        <CreateTodo />
      </section>
    </nav>
  );
}
