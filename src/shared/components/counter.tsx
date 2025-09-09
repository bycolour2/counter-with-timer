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
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>%count%</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {COUNTER_CONFIG.buttons.map((button) => (
            <Button
              key={button.value}
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
