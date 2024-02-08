import { Navbar } from './components/shared/navbar/navbar';
import { TodoProvider } from './context-api/todo-context';

export function App() {
  return (
    <TodoProvider>
      <Navbar />
    </TodoProvider>
  );
}
