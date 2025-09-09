import { Counter } from './shared/components/counter';

export function App() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1>Hello Hystax</h1>
        <Counter />
      </div>
    </main>
  );
}
