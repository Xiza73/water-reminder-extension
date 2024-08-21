import '@src/Popup.css';
import { useStorageSuspense, useTheme, withErrorBoundary, withSuspense } from '@extension/shared';
import { drinkStorage, optionsStorage } from '@extension/storage';
import { App } from '@extension/ui';

const Popup = () => {
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
      isPopup
    />
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
