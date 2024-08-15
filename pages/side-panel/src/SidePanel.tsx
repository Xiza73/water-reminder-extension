import '@src/SidePanel.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@extension/shared';
import { drinkStorage, optionsStorage } from '@extension/storage';
import { App } from '@extension/ui';

const SidePanel = () => {
  const { isInProgress, currentUnits, currentPercent, time } = useStorageSuspense(drinkStorage);
  const { unit, unitsPerDrink, totalUnits } = useStorageSuspense(optionsStorage);

  return (
    <App
      unit={unit}
      isInProgress={isInProgress}
      currentUnits={currentUnits}
      currentPercent={currentPercent}
      time={time}
      totalUnits={totalUnits}
      unitsPerDrink={unitsPerDrink}
      setInProgress={drinkStorage.setInProgress}
      setCurrentUnits={drinkStorage.setCurrentUnits}
      setCurrentPercent={drinkStorage.setCurrentPercent}
      setLastTime={drinkStorage.setLastTime}
    />
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
