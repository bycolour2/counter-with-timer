import { useState } from 'react';

import { Counter } from './shared/components/counter';
import { CounterConfigurator } from './shared/components/counter-configurator';
import { DEFAULT_COUNTER_CONFIG } from './shared/constants/counter-config';

export function App() {
  const [config, setConfig] = useState(DEFAULT_COUNTER_CONFIG);
  const [isSessionActive, setIsSessionActive] = useState(false);

  return (
    <main className="bg-background flex min-h-screen items-start justify-center px-8 pt-16">
      <div className="flex w-full max-w-md flex-col gap-3">
        <Counter config={config} onSessionChange={setIsSessionActive} />
        <CounterConfigurator
          config={config}
          onConfigChange={setConfig}
          isBlocked={isSessionActive}
        />
      </div>
    </main>
  );
}
