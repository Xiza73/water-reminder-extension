import '@src/SidePanel.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@extension/shared';
import { drinkStorage, optionsStorage } from '@extension/storage';
import { DrinkButton, Percent, ResetIcon, Tracker, Water, Wave } from '@extension/ui';

const SidePanel = () => {
  const { isInProgress, mililiters, mililitersPercent, time } = useStorageSuspense(drinkStorage);
  const { unitsPerDrink, totalUnits } = useStorageSuspense(optionsStorage);

  const drink = async ({ toDrink, isReset } = { toDrink: unitsPerDrink, isReset: false }) => {
    if (unitsPerDrink === 0 || totalUnits === 0) return;
    if (toDrink > 0 && mililiters + toDrink > totalUnits) return;
    if (mililiters + toDrink < 0) return;

    await drinkStorage.setInProgress(true);

    await rotateTracker(isReset);

    const newMililiters = mililiters + toDrink;
    let newMililitersPercent = (newMililiters / totalUnits) * 100;
    newMililitersPercent = newMililitersPercent > 100 ? 100 : newMililitersPercent;
    newMililitersPercent = Math.round(newMililitersPercent);

    const diff = mililitersPercent - newMililitersPercent;
    let provisionalPercent = mililitersPercent;

    const interval = setInterval(async () => {
      if (diff === 0 || provisionalPercent === newMililitersPercent) {
        await drinkStorage.setMililiters(newMililiters);
        await drinkStorage.setInProgress(false);
        if (isReset) await drinkStorage.setTime('');
        clearInterval(interval);
        return;
      }

      if (diff > 0) {
        provisionalPercent -= 1;
      } else {
        provisionalPercent += 1;
      }

      await drinkStorage.setMililitersPercent(provisionalPercent);
    }, 16);
  };

  const rotateTracker = async (isReset = false) => {
    if (isReset) return;

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const fixMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const time = `${hours}:${fixMinutes}`;

    await drinkStorage.setTime(time);
  };

  const handleClick = () => {
    if (isInProgress) return;

    drink();
  };

  const handleReset = async () => {
    if (isInProgress) return;

    await drink({ toDrink: -mililiters, isReset: true });
  };

  return (
    <div className="App">
      <Wave />
      <div className={`page ${isInProgress ? 'page_animated' : ''}`} id="page">
        <ResetIcon onReset={handleReset} />
        <Tracker time={time} />
        <Percent percent={mililitersPercent} />
        <DrinkButton onClick={handleClick} />
        <Water percent={mililitersPercent} />
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
