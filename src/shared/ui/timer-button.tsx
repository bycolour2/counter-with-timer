import { useEffect, useState } from 'react';

import { Button } from './button';

import { cn } from '../lib/utils';

export function TimerButton({
  duration,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  duration: number;
}) {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (percentage >= 100) {
        clearInterval(interval);
        setRunning(false);
      }
    }, 33);
    return () => clearInterval(interval);
  }, [running, duration]);

  const remaining = Math.max(duration - (progress / 100) * duration, 0).toFixed(1);

  return (
    <Button
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        if (!running) {
          setProgress(0);
          setRunning(true);
        }
      }}
      className={cn('relative overflow-hidden', props.className)}
    >
      <span
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `conic-gradient(var(--muted-foreground, oklch(0.552 0.016 285.938)) ${progress}%, transparent ${progress}% 100%)`,
          opacity: running ? 1 : 0,
        }}
      />
      <span className="relative z-10">{running ? `${remaining}s` : children}</span>
    </Button>
  );
}
