import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/shared/navbar/navbar';
import { AllTodo } from './components/shared/todo/all-todo';
import { TodoProvider } from './context-api/todo-context';

export function App() {
  return (
    <main className='customized_scrollbar h-screen overflow-y-auto'>
      <TodoProvider>
        <Navbar />
        <AllTodo />
        <Toaster />
      </TodoProvider>
    </main>
  );
}
