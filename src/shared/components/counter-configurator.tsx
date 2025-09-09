import { useState } from 'react';
import { ChevronDown, RotateCcw } from 'lucide-react';

import { type CounterConfig, DEFAULT_COUNTER_CONFIG } from '../constants/counter-config';
import { cn } from '../lib/utils';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';

type CounterConfiguratorProps = {
  config: CounterConfig;
  onConfigChange: (config: CounterConfig) => void;
};

export function CounterConfigurator({ config, onConfigChange }: CounterConfiguratorProps) {
  const [useCustomConfig, setUseCustomConfig] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [formConfig, setFormConfig] = useState(config);

  const handleCustomConfigChange = (enabled: boolean) => {
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

  const handleFormConfigChange = <F extends keyof CounterConfig>(
    field: F,
    value: (typeof formConfig)[F],
  ) => {
    const newConfig = { ...formConfig, [field]: value };
    setFormConfig(newConfig);
    if (useCustomConfig) {
      onConfigChange(newConfig);
    }
  };

  const handleFormConfigReset = () => {
    setFormConfig(DEFAULT_COUNTER_CONFIG);
    onConfigChange(DEFAULT_COUNTER_CONFIG);
  };

  const handleFormConfigButtonChange = <F extends keyof CounterConfig['buttons'][0]>(
    index: number,
    field: F,
    value: (typeof formConfig.buttons)[0][F],
  ) => {
    const newButtons = [...formConfig.buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    handleFormConfigChange('buttons', newButtons);
  };

  return (
    <Card className={cn('w-full', isExpanded ? 'gap-4' : 'gap-0')}>
      <CardHeader className="gap-0 pb-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <p className="text-xl font-bold">Configurations</p>
            <Button variant={'ghost'} size={'icon'} onClick={handleFormConfigReset}>
              <RotateCcw />
            </Button>
          </div>
          <div className="flex items-center gap-1 text-lg font-semibold">
            <Label htmlFor="toggle-custom-config">Custom config</Label>
            <Switch
              id="toggle-custom-config"
              checked={useCustomConfig}
              onCheckedChange={handleCustomConfigChange}
            />
          </div>

          <Button size={'icon'} onClick={() => setIsExpanded(!isExpanded)}>
            <ChevronDown
              className={cn('size-6 rotate-0 transition-all duration-300', {
                '-rotate-180': isExpanded,
              })}
            />
          </Button>
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
                  handleFormConfigChange('cooldownMultiplier', Number(e.target.value))
                }
                disabled={!useCustomConfig}
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
                onChange={(e) => handleFormConfigChange('inactivityDelay', Number(e.target.value))}
                disabled={!useCustomConfig}
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
                onChange={(e) => handleFormConfigChange('decreaseInterval', e.target.valueAsNumber)}
                disabled={!useCustomConfig}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-lg">Button Configuration</Label>
              <div className="space-y-2">
                {formConfig.buttons.map((button, index) => (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      {index === 0 && <Label>Label</Label>}
                      <Input
                        placeholder="Label"
                        value={button.label}
                        onChange={(e) =>
                          handleFormConfigButtonChange(index, 'label', e.target.value)
                        }
                        disabled={!useCustomConfig}
                      />
                    </div>
                    <div className="space-y-2">
                      {index === 0 && <Label>Value</Label>}
                      <Input
                        type="number"
                        placeholder="Value"
                        value={button.value}
                        onChange={(e) =>
                          handleFormConfigButtonChange(index, 'value', Number(e.target.value))
                        }
                        disabled={!useCustomConfig}
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
