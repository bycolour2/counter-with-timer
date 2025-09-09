export type CounterConfig = {
  buttons: { value: number; label: string }[];
  cooldownMultiplier: number;
  inactivityDelay: number;
  decreaseInterval: number;
};

export const DEFAULT_COUNTER_CONFIG: CounterConfig = {
  buttons: [
    { value: 1, label: '+1' },
    { value: 2, label: '+2' },
    { value: 3, label: '+3' },
  ],
  cooldownMultiplier: 0.5,
  inactivityDelay: 10,
  decreaseInterval: 1,
};
