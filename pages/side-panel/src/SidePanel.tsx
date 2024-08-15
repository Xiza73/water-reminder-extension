import '@src/SidePanel.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@extension/shared';
import { drinkStorage, optionsStorage } from '@extension/storage';
import { App } from '@extension/ui';

const SidePanel = () => {
  const { isInProgress, currentUnits, currentPercent, count, time } = useStorageSuspense(drinkStorage);
  const { unit, unitsPerDrink, totalUnits } = useStorageSuspense(optionsStorage);

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
    />
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
