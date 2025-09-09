import { useState } from 'react';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const COUNTER_CONFIG = {
  buttons: [
    { value: 1, label: '+1' },
    { value: 2, label: '+2' },
    { value: 3, label: '+3' },
  ],
  cooldownMultiplier: 0.5,
  inactivityDelay: 10,
  decreaseInterval: 1,
};

const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

export function Counter() {
  const [count, setCount] = useState(0);
  const [disabledButtons, setDisabledButtons] = useState<Set<number>>(new Set());

  const handleButtonClick = (buttonValue: number) => {
    setCount((prev) => prev + buttonValue);

    setDisabledButtons((prev) => new Set(prev).add(buttonValue));

    setTimeout(
      () => {
        setDisabledButtons((prev) => {
          const newSet = new Set(prev);
          newSet.delete(buttonValue);
          return newSet;
        });
      },
      COUNTER_CONFIG.cooldownMultiplier * buttonValue * 1000,
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-primary text-6xl font-bold">{count}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {COUNTER_CONFIG.buttons.map((button) => (
            <Button
              key={button.value}
              onClick={() => handleButtonClick(button.value)}
              disabled={disabledButtons.has(button.value)}
              variant={disabledButtons.has(button.value) ? 'secondary' : 'default'}
              className="h-12 text-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              {button.label}
            </Button>
          ))}
        </div>

        <div className="text-muted-foreground space-y-1 text-center text-sm">
          <p>
            Button cooldowns:{' '}
            {formatter.format(
              COUNTER_CONFIG.buttons.map(
                (button) => `${(button.value * COUNTER_CONFIG.cooldownMultiplier).toFixed(1)}s`,
              ),
            )}
          </p>
          <p>Auto-decrease starts after {COUNTER_CONFIG.inactivityDelay}s of inactivity</p>
        </div>
      </CardContent>
    </Card>
  );
}
