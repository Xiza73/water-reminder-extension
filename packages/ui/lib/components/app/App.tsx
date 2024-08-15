import { ResetIcon } from './ResetIcon';
import { Wave } from './Wave';
import { Tracker } from './Tracker';
import { Percent } from './Percent';
import { DrinkButton } from './DrinkButton';
import { Water } from './Water';
import { Progress } from './Progress';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utils';

export type AppProps = {
  unit: string;
  unitsPerDrink: number;
  totalUnits: number;
  currentUnits: number;
  currentPercent: number;
  time: string;
  isInProgress: boolean;

  setMililiters: (currentUnits: number) => Promise<void>;
  setInProgress: (isInProgress: boolean) => Promise<void>;
  setTime: (time: string) => Promise<void>;
  setMililitersPercent: (currentPercent: number) => Promise<void>;
} & ComponentPropsWithoutRef<'div'>;

export const App: React.FC<AppProps> = ({
  unit,
  unitsPerDrink,
  totalUnits,
  currentUnits,
  currentPercent,
  time,
  isInProgress,

  setMililiters,
  setInProgress,
  setTime,
  setMililitersPercent,

  className,
  ...props
}) => {
  const drink = async ({ toDrink, isReset } = { toDrink: unitsPerDrink, isReset: false }) => {
    if (unitsPerDrink === 0 || totalUnits === 0) return;
    if (toDrink > 0 && currentUnits + toDrink > totalUnits) return;
    if (currentUnits + toDrink < 0) return;

    await setInProgress(true);

    await rotateTracker(isReset);

    const newMililiters = currentUnits + toDrink;
    let newMililitersPercent = (newMililiters / totalUnits) * 100;
    newMililitersPercent = newMililitersPercent > 100 ? 100 : newMililitersPercent;
    newMililitersPercent = Math.round(newMililitersPercent);

    const diff = currentPercent - newMililitersPercent;
    let provisionalPercent = currentPercent;

    const interval = setInterval(async () => {
      if (diff === 0 || provisionalPercent === newMililitersPercent) {
        await setMililiters(newMililiters);
        await setInProgress(false);
        if (isReset) await setTime('');
        clearInterval(interval);
        return;
      }

      if (diff > 0) {
        provisionalPercent -= 1;
      } else {
        provisionalPercent += 1;
      }

      await setMililitersPercent(provisionalPercent);
    }, 16);
  };

  const rotateTracker = async (isReset = false) => {
    if (isReset) return;

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const fixHours = hours < 10 ? `0${hours}` : hours;
    const fixMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const time = `${fixHours}:${fixMinutes}`;

    await setTime(time);
  };

  const handleClick = () => {
    if (isInProgress) return;

    drink();
  };

  const handleReset = async () => {
    if (isInProgress) return;

    await drink({ toDrink: -currentUnits, isReset: true });
  };

  return (
    <div className={cn(className, 'App')} {...props}>
      <Wave />
      <div className={`page ${isInProgress ? 'page_animated' : ''}`} id="page">
        <ResetIcon onReset={handleReset} />
        <Tracker time={time} />
        <Progress progress={`${currentUnits} ${unit}`} />
        <Percent percent={currentPercent} />
        <DrinkButton onClick={handleClick} />
        <Water percent={currentPercent} />
      </div>
    </div>
  );
};
