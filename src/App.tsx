import { useState } from 'react';

import { Counter } from './shared/components/counter';
import { CounterConfigurator } from './shared/components/counter-configurator';
import { DEFAULT_COUNTER_CONFIG } from './shared/constants/counter-config';

export function App() {
  const [config, setConfig] = useState(DEFAULT_COUNTER_CONFIG);

  return (
    <main className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1>Hello Hystax</h1>
        <CounterConfigurator config={config} setConfig={setConfig} />
        <Counter config={config} />
      </div>
    </main>
  );
}
