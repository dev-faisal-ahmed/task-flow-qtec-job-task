import { Logo } from './logo';
import { Search } from './search';

export function Navbar() {
  return (
    <nav className='bg-white py-3'>
      <section className='container grid grid-cols-3 items-center'>
        <Logo />
        <Search />
      </section>
    </nav>
  );
}
