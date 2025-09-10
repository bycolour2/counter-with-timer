import { useCallback, useEffect, useRef, useState } from 'react';

import type { CounterConfig } from '../constants/counter-config';
import { cn } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TimerButton } from '../ui/timer-button';

const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

type CounterProps = {
  config: CounterConfig;
  onSessionChange?: (isActive: boolean) => void;
};

export function Counter({ config, onSessionChange }: CounterProps) {
  const [count, setCount] = useState(0);
  const [disabledButtons, setDisabledButtons] = useState<Set<number>>(new Set());
  const [isDecreasing, setIsDecreasing] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const inactivityTimeoutRef = useRef<NodeJS.Timeout>(null);
  const decreaseIntervalRef = useRef<NodeJS.Timeout>(null);

  const clearTimers = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
      inactivityTimeoutRef.current = null;
    }
    if (decreaseIntervalRef.current) {
      clearTimeout(decreaseIntervalRef.current);
      decreaseIntervalRef.current = null;
    }
  }, []);

  const startInactivityTimer = useCallback(() => {
    clearTimers();
    setIsDecreasing(false);

    inactivityTimeoutRef.current = setTimeout(() => {
      setIsDecreasing(true);

      decreaseIntervalRef.current = setInterval(() => {
        setCount((prev) => {
          if (prev <= 0) {
            setIsDecreasing(false);
            if (decreaseIntervalRef.current) {
              clearInterval(decreaseIntervalRef.current);
              decreaseIntervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, config.decreaseInterval * 1000);
    }, config.inactivityDelay * 1000);
  }, [clearTimers, config.inactivityDelay, config.decreaseInterval]);

  const handleButtonClick = (buttonValue: number) => {
    setCount((prev) => prev + buttonValue);

    if (!hasInteracted) {
      setHasInteracted(true);
      onSessionChange?.(true);
    }

    setDisabledButtons((prev) => new Set(prev).add(buttonValue));

    setTimeout(
      () => {
        setDisabledButtons((prev) => {
          const newSet = new Set(prev);
          newSet.delete(buttonValue);
          return newSet;
        });
      },
      config.cooldownMultiplier * buttonValue * 1000,
    );

    startInactivityTimer();
  };

  useEffect(() => {
    if (count === 0 && hasInteracted) {
      setHasInteracted(false);
      onSessionChange?.(false);
    }
  }, [count, hasInteracted, onSessionChange]);

  useEffect(() => {
    if (count <= 0) {
      setIsDecreasing(false);
      return;
    }
    startInactivityTimer();

    return () => {
      clearTimers();
    };
  }, [startInactivityTimer, clearTimers]);

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle
          className={cn(
            'text-primary text-6xl font-bold transition-colors duration-300',
            isDecreasing && 'text-destructive animate-pulse',
          )}
        >
          {count}
        </CardTitle>
        {isDecreasing ? (
          <p className="text-destructive animate-pulse text-sm">Auto-decreasing...</p>
        ) : (
          <div className="invisible h-5 opacity-0" />
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {config.buttons.map((button, index) => (
            <TimerButton
              key={`${button.value}-${button.label}-${index}`}
              duration={config.cooldownMultiplier * button.value}
              onClick={() => handleButtonClick(button.value)}
              disabled={disabledButtons.has(button.value)}
              variant={disabledButtons.has(button.value) ? 'secondary' : 'default'}
              className="h-12 text-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              {button.label}
            </TimerButton>
          ))}
        </div>

        <div className="text-muted-foreground space-y-1 text-center text-sm">
          <p>
            Button cooldowns:{' '}
            {formatter.format(
              config.buttons.map(
                (button) => `${(button.value * config.cooldownMultiplier).toFixed(1)}s`,
              ),
            )}
          </p>
          <p>Auto-decrease starts after {config.inactivityDelay}s of inactivity</p>
        </div>
      </CardContent>
    </Card>
  );
}
