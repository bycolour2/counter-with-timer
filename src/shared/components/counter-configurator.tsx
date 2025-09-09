import type { CounterConfig } from '../constants/counter-config';

type CounterConfiguratorProps = {
  config: CounterConfig;
  setConfig: (config: CounterConfig) => void;
};

export function CounterConfigurator({ config, setConfig }: CounterConfiguratorProps) {
  return (
    <div>
      <h2>Counter Configurator</h2>
    </div>
  );
}
