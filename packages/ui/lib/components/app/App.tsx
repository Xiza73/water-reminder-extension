import { ResetIcon } from './ResetIcon';
import { Wave } from './Wave';
import { Tracker } from './Tracker';
import { Percent } from './Percent';
import { DrinkButton } from './DrinkButton';
import { Water } from './Water';
import { Progress } from './Progress';
import { ComponentPropsWithoutRef } from 'react';
import { cn, fixTime, rotateTracker } from '../../utils';
import { FillIcon } from './FillIcon';
import { GoalComplete } from './GoalComplete';

const HOUR = 0;
const MINUTE = 1;

export type AppProps = {
  unit: string;
  unitsPerDrink: number;
  totalUnits: number;
  currentUnits: number;
  currentPercent: number;
  count: number;
  time: string;
  isInProgress: boolean;

  isLight: boolean;
  isPopup?: boolean;

  setCurrentUnits: (currentUnits: number) => Promise<void>;
  setInProgress: (isInProgress: boolean) => Promise<void>;
  setCount: (count: number) => Promise<void>;
  setLastTime: (time: string) => Promise<void>;
  setCurrentPercent: (currentPercent: number) => Promise<void>;
} & ComponentPropsWithoutRef<'div'>;

export const App: React.FC<AppProps> = ({
  unit,
  unitsPerDrink,
  totalUnits,
  currentUnits,
  currentPercent,
  count,
  time,
  isInProgress,

  isLight,
  isPopup = false,

  setCurrentUnits,
  setInProgress,
  setCount,
  setLastTime,
  setCurrentPercent,

  className,
  ...props
}) => {
  const getProvisionalPartialTime = (partialTime: number, currentTime: number, intervals: number, isReset: boolean) => {
    let partialTimeDiff = partialTime - currentTime;

    if (!time || isReset) partialTimeDiff = partialTime;

    const provisionalTime = time ? currentTime : 0;
    const decimalTime = provisionalTime;

    let addPerInterval = Math.abs(partialTimeDiff) / intervals;
    addPerInterval = addPerInterval < 1 ? addPerInterval : Math.floor(addPerInterval);

    return {
      provisionalTime,
      decimalTime,
      addPerInterval,
    };
  };

  const getProvisionalCount = (goalCount: number, currentCount: number, intervals: number) => {
    const countDiff = goalCount - currentCount;

    const provisionalCount = currentCount;
    const decimalCount = provisionalCount;

    let countToAddPerInterval = Math.abs(countDiff) / intervals;
    countToAddPerInterval = countToAddPerInterval < 1 ? countToAddPerInterval : Math.floor(countToAddPerInterval);

    return {
      provisionalCount,
      decimalCount,
      countToAddPerInterval,
    };
  };

  const isValidateForDrink = (toDrink: number) => {
    if (unitsPerDrink === 0 || totalUnits === 0) return false;
    if (currentUnits + toDrink < 0) return false;

    return true;
  };

  const drink = async ({ toDrink, isReset } = { toDrink: unitsPerDrink, isReset: false }) => {
    if (!isValidateForDrink(toDrink)) return;

    if (toDrink > 0 && currentUnits + toDrink > totalUnits) toDrink = totalUnits - currentUnits;

    await setInProgress(true);

    const { hours, minutes } = await rotateTracker();
    const newUnits = currentUnits + toDrink;
    const newCount = Math.floor(newUnits / unitsPerDrink);
    let newPercent = (newUnits / totalUnits) * 100;
    newPercent = newPercent > 100 ? 100 : newPercent;
    newPercent = Math.round(newPercent);

    const diff = currentPercent - newPercent;
    const isFill = diff > 0;
    let provisionalUnits = currentUnits;
    let provisionalPercent = currentPercent;

    const intervals = Math.abs(diff);
    let {
      provisionalTime: provisionalHours,
      decimalTime: decimalHours,
      // eslint-disable-next-line prefer-const
      addPerInterval: hoursToAddPerInterval,
    } = getProvisionalPartialTime(hours, parseInt(time.split(':')[HOUR]), intervals, isReset);
    let {
      provisionalTime: provisionalMinutes,
      decimalTime: decimalMinutes,
      // eslint-disable-next-line prefer-const
      addPerInterval: minutesToAddPerInterval,
    } = getProvisionalPartialTime(minutes, parseInt(time.split(':')[MINUTE]), intervals, isReset);
    const unitsToAddPerInterval = Math.round(Math.abs(toDrink) / intervals);
    let {
      provisionalCount,
      decimalCount,
      // eslint-disable-next-line prefer-const
      countToAddPerInterval,
    } = getProvisionalCount(newCount, count, intervals);

    const interval = setInterval(async () => {
      if (diff === 0 || provisionalPercent === newPercent) {
        console.log('clear');
        await setCurrentUnits(newUnits);
        await setCurrentPercent(newPercent);
        await setCount(newCount);
        await setInProgress(false);
        await setLastTime(isReset ? '' : fixTime(hours, minutes));
        clearInterval(interval);
        return;
      }

      if (isFill) {
        provisionalUnits -= unitsToAddPerInterval;
        provisionalPercent -= 1;
        decimalCount -= countToAddPerInterval;
        if (Math.ceil(decimalCount) !== provisionalCount) {
          provisionalCount = Math.ceil(decimalCount);
          decimalCount = provisionalCount;
        }
      } else {
        provisionalUnits += unitsToAddPerInterval;
        provisionalPercent += 1;
        decimalCount += countToAddPerInterval;
        if (Math.floor(decimalCount) !== provisionalCount) {
          provisionalCount = Math.floor(decimalCount);
          decimalCount = provisionalCount;
        }
      }

      if (isReset) {
        decimalHours -= hoursToAddPerInterval;
        if (Math.ceil(decimalHours) !== provisionalHours) {
          provisionalHours = Math.ceil(decimalHours);
          decimalHours = provisionalHours;
        }
        decimalMinutes -= minutesToAddPerInterval;
        if (Math.ceil(decimalMinutes) !== provisionalMinutes) {
          provisionalMinutes = Math.ceil(decimalMinutes);
          decimalMinutes = provisionalMinutes;
        }
      } else {
        decimalHours += hoursToAddPerInterval;
        if (Math.floor(decimalHours) !== provisionalHours) {
          provisionalHours = Math.floor(decimalHours);
          decimalHours = provisionalHours;
        }
        decimalMinutes += minutesToAddPerInterval;
        if (Math.floor(decimalMinutes) !== provisionalMinutes) {
          provisionalMinutes = Math.floor(decimalMinutes);
          decimalMinutes = provisionalMinutes;
        }
      }

      await setLastTime(fixTime(provisionalHours, provisionalMinutes));
      await setCurrentUnits(provisionalUnits);
      await setCurrentPercent(provisionalPercent);
      await setCount(provisionalCount);
    }, 20);
  };

  const handleClick = () => {
    if (isInProgress) return;

    drink();
  };

  const handleFill = () => {
    if (isInProgress) return;

    drink({ toDrink: -unitsPerDrink, isReset: false });
  };

  const handleReset = async () => {
    if (isInProgress) return;

    await drink({ toDrink: -currentUnits, isReset: true });
  };

  return (
    <div className={cn(className, 'App', isLight ? 'bg-[#1B5887]' : 'bg-[#B4986F]')} {...props}>
      <Wave />
      <div className={`page ${isInProgress ? 'page_animated' : ''}`} id="page">
        <ResetIcon onReset={handleReset} />
        <Tracker time={time} />
        <Progress count={count} units={`${currentUnits} ${unit}`} isLight={isLight} />
        {currentPercent === 100 && <GoalComplete isPopup={isPopup} />}
        <Percent percent={currentPercent} />
        <DrinkButton onClick={handleClick} />
        <Water percent={currentPercent} isLight={isLight} />
        {Boolean(currentPercent) && (
          <FillIcon
            className="absolute top-2 left-2 cursor-pointer z-30 text-white"
            width={24}
            height={24}
            onClick={handleFill}
          />
        )}
      </div>
    </div>
  );
};
