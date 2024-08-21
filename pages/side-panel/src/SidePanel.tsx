import '@src/SidePanel.css';
import { useStorageSuspense, useTheme, withErrorBoundary, withSuspense } from '@extension/shared';
import { drinkStorage, optionsStorage } from '@extension/storage';
import { App } from '@extension/ui';

const SidePanel = () => {
  const { isInProgress, currentUnits, currentPercent, count, time } = useStorageSuspense(drinkStorage);
  const { unit, unitsPerDrink, totalUnits } = useStorageSuspense(optionsStorage);
  const { isLight } = useTheme();

  return (
    <App
      unit={unit}
      isInProgress={isInProgress}
      currentUnits={currentUnits}
      currentPercent={currentPercent}
      count={count}
      time={time}
      totalUnits={totalUnits}
      unitsPerDrink={unitsPerDrink}
      setInProgress={drinkStorage.setInProgress}
      setCurrentUnits={drinkStorage.setCurrentUnits}
      setCurrentPercent={drinkStorage.setCurrentPercent}
      setCount={drinkStorage.setCount}
      setLastTime={drinkStorage.setLastTime}
      isLight={isLight}
    />
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
