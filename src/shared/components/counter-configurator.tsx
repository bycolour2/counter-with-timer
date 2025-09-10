import { useState } from 'react';
import { ChevronDown, Lock, RotateCcw } from 'lucide-react';

import { type CounterConfig, DEFAULT_COUNTER_CONFIG } from '../constants/counter-config';
import { cn } from '../lib/utils';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type CounterConfiguratorProps = {
  config: CounterConfig;
  onConfigChange: (config: CounterConfig) => void;
  isBlocked?: boolean;
};

export function CounterConfigurator({
  config,
  onConfigChange,
  isBlocked = false,
}: CounterConfiguratorProps) {
  const [useCustomConfig, setUseCustomConfig] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formConfig, setFormConfig] = useState(config);

  const handleCustomConfigToggle = (enabled: boolean) => {
    if (isBlocked) return;

    setUseCustomConfig(enabled);
    if (!isExpanded && enabled) {
      setIsExpanded(true);
    }

    if (!enabled) {
      onConfigChange(DEFAULT_COUNTER_CONFIG);
    } else {
      onConfigChange(formConfig);
    }
  };

  const handleFormFieldChange = <F extends keyof CounterConfig>(
    field: F,
    value: (typeof formConfig)[F],
  ) => {
    const newConfig = { ...formConfig, [field]: value };
    setFormConfig(newConfig);
    if (useCustomConfig) {
      onConfigChange(newConfig);
    }
  };

  const handleFormReset = () => {
    setFormConfig(DEFAULT_COUNTER_CONFIG);
    onConfigChange(DEFAULT_COUNTER_CONFIG);
  };

  const handleFormButtonChange = <F extends keyof CounterConfig['buttons'][0]>(
    index: number,
    field: F,
    value: (typeof formConfig.buttons)[0][F],
  ) => {
    const newButtons = [...formConfig.buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    handleFormFieldChange('buttons', newButtons);
  };

  return (
    <Card
      className={cn(
        'w-full',
        isExpanded ? 'gap-4 max-sm:gap-8' : 'gap-0',
        isBlocked && 'opacity-60',
      )}
    >
      <CardHeader className="gap-0 pb-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex w-full flex-row gap-2 max-sm:flex-col">
            <div className="flex items-center gap-1">
              <p className="text-xl font-bold">Configurations</p>
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={handleFormReset}
                disabled={isBlocked}
                className="group cursor-pointer"
              >
                {isBlocked ? (
                  <Lock className="size-6" />
                ) : (
                  <RotateCcw className="rotate-65 transition-all duration-300 group-hover:-rotate-15" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2 text-lg font-semibold">
              <Tooltip>
                <TooltipTrigger className={isBlocked ? 'pointer-events-none' : ''}>
                  <Label htmlFor="toggle-custom-config" className="cursor-pointer">
                    Custom config
                  </Label>
                </TooltipTrigger>
                <TooltipContent className="max-w-48 text-center">
                  Enable custom configuration for the timer settings.
                </TooltipContent>
              </Tooltip>
              <Switch
                id="toggle-custom-config"
                checked={useCustomConfig}
                onCheckedChange={handleCustomConfigToggle}
                disabled={isBlocked}
                className="cursor-pointer"
              />
            </div>
          </div>

          <Button
            size={'icon'}
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer"
            disabled={isBlocked}
          >
            <ChevronDown
              className={cn('size-6 rotate-0 transition-all duration-300', {
                '-rotate-180': isExpanded,
              })}
            />
          </Button>
        </div>

        <div
          className={cn(
            'overflow-hidden transition-all duration-500 ease-out',
            isBlocked ? 'max-h-20 pt-2 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <p className="text-muted-foreground mt-2 text-xs">
            Configuration is locked during an active counter session. Wait for counter to reach 0.
          </p>
        </div>
      </CardHeader>

      <div
        className={cn(
          'overflow-hidden transition-all duration-500 ease-out',
          isExpanded ? 'max-h-120 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="cooldown-multiplier">Cooldown Multiplier</Label>
              <Input
                id="cooldown-multiplier"
                type="number"
                placeholder="Cooldown multiplier"
                step={0.1}
                min={0.1}
                value={formConfig.cooldownMultiplier}
                onChange={(e) =>
                  handleFormFieldChange('cooldownMultiplier', Number(e.target.value))
                }
                disabled={!useCustomConfig || isBlocked}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inactivity-delay">Inactivity Delay</Label>
              <Input
                id="inactivity-delay"
                type="number"
                placeholder="Inactivity delay"
                min={1}
                value={formConfig.inactivityDelay}
                onChange={(e) => handleFormFieldChange('inactivityDelay', Number(e.target.value))}
                disabled={!useCustomConfig || isBlocked}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="decrease-interval">Decrease Interval</Label>
              <Input
                id="decrease-interval"
                type="number"
                step={0.1}
                min={0.5}
                placeholder="Decrease interval"
                value={formConfig.decreaseInterval}
                onChange={(e) => handleFormFieldChange('decreaseInterval', e.target.valueAsNumber)}
                disabled={!useCustomConfig || isBlocked}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-lg">Button Configuration</Label>
              <div className="space-y-2">
                {formConfig.buttons.map((button, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      {index === 0 && <Label>Label</Label>}
                      <Input
                        placeholder="Label"
                        value={button.label}
                        onChange={(e) => handleFormButtonChange(index, 'label', e.target.value)}
                        disabled={!useCustomConfig || isBlocked}
                      />
                    </div>
                    <div className="space-y-2">
                      {index === 0 && <Label>Value</Label>}
                      <Input
                        type="number"
                        step={1}
                        min={1}
                        placeholder="Value"
                        value={button.value}
                        onChange={(e) =>
                          handleFormButtonChange(index, 'value', Number(e.target.value))
                        }
                        disabled={!useCustomConfig || isBlocked}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
