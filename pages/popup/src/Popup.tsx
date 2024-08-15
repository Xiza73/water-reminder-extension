import '@src/Popup.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@extension/shared';
import { drinkStorage, optionsStorage } from '@extension/storage';
import { App } from '@extension/ui';

const Popup = () => {
  const { isInProgress, mililiters, mililitersPercent, time } = useStorageSuspense(drinkStorage);
  const { unit, unitsPerDrink, totalUnits } = useStorageSuspense(optionsStorage);

  return (
    <App
      unit={unit}
      isInProgress={isInProgress}
      currentUnits={mililiters}
      currentPercent={mililitersPercent}
      time={time}
      totalUnits={totalUnits}
      unitsPerDrink={unitsPerDrink}
      setInProgress={drinkStorage.setInProgress}
      setMililiters={drinkStorage.setMililiters}
      setMililitersPercent={drinkStorage.setMililitersPercent}
      setTime={drinkStorage.setTime}
    />
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
