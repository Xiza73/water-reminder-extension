import { useStorageSuspense, useTheme, withErrorBoundary, withSuspense } from '@extension/shared';
import { useEffect, useState } from 'react';
import { NumberInput } from './components/Form/NumberInput';
import { SelectInput } from './components/Form/SelectInput';
import { clearAlarm, createAlarm, exampleThemeStorage, optionsStorage } from '@extension/storage';
import { cn, Position, ThemeButton, Unit } from '@extension/ui';
import { IconButton } from './components/Form/IconButton';

const ACTIVE = 'Active';
const INACTIVE = 'Inactive';

const UnitsPerKg: {
  UNDERAGE: Record<Unit, number>;
  ADULT: Record<Unit, number>;
} = {
  UNDERAGE: {
    [Unit.ML]: 40,
    [Unit.OZ]: 1.4,
    [Unit.L]: 0.04,
  },
  ADULT: {
    [Unit.ML]: 30,
    [Unit.OZ]: 1,
    [Unit.L]: 0.03,
  },
};

const Options = () => {
  const { isLight } = useTheme();
  const storage = useStorageSuspense(optionsStorage);

  const [unit, setUnit] = useState<string>(storage.unit);
  const [unitsPerDrink, setUnitsPerDrink] = useState(storage.unitsPerDrink.toString());
  const [totalUnits, setTotalUnits] = useState(storage.totalUnits.toString());
  const [reminderStatus, setReminderStatus] = useState(storage.isReminderActive ? ACTIVE : INACTIVE);
  const [remindEvery, setRemindEvery] = useState(storage.remindEvery.toString());
  const [disableSave, setDisableSave] = useState(true);

  const [age, setAge] = useState('0');
  const [weight, setWeight] = useState('0');
  const [recommendedUnits, setRecommendedUnits] = useState(0);

  useEffect(() => {
    setDisableSave(
      unit === storage.unit &&
        unitsPerDrink === storage.unitsPerDrink.toString() &&
        totalUnits === storage.totalUnits.toString() &&
        reminderStatus === (storage.isReminderActive ? ACTIVE : INACTIVE) &&
        remindEvery === storage.remindEvery.toString(),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit, unitsPerDrink, totalUnits, reminderStatus, remindEvery]);

  const handleSave = async () => {
    await optionsStorage.setState({
      unit: unit as Unit,
      unitsPerDrink: parseInt(unitsPerDrink),
      totalUnits: parseInt(totalUnits),
      isReminderActive: reminderStatus === ACTIVE,
      remindEvery: parseInt(remindEvery),
    });

    if (reminderStatus === ACTIVE) {
      createAlarm('drinkReminder', parseInt(remindEvery));
    } else {
      clearAlarm('drinkReminder');
    }

    alert('Saved!');
  };

  const handleCalculate = () => {
    const ageValue = parseInt(age);
    const weightValue = parseFloat(weight);

    if (ageValue === 0 || weightValue === 0) {
      alert('Please fill in the form');
      return;
    }

    let water = UnitsPerKg[ageValue < 18 ? 'UNDERAGE' : 'ADULT'][storage.unit as Unit] * weightValue;
    water = Math.round(water * 100) / 100;

    setRecommendedUnits(water);
    setTotalUnits(water.toString());
  };

  return (
    <div
      className={cn(
        'flex flex-wrap h-screen gap-5 p-5',
        isLight ? 'bg-[#32bafa] text-gray-900' : 'bg-[#4a3c3c] text-gray-300',
      )}>
      <div
        className={cn(
          'p-5 pb-6 flex flex-col h-fit gap-5 relative border-2 rounded-lg shadow-lg border-opacity-10 border-none',
          isLight ? 'bg-[#2dade9] shadow-[#2ca7e0]' : 'bg-[#534343] shadow-[#302727]',
        )}>
        <ThemeButton position={Position.RIGHT} handleClick={exampleThemeStorage.toggle} isLight={isLight} />
        <h1 className="text-2xl font-bold mb-3">Settings</h1>

        <SelectInput label="Unit" options={Object.values(Unit)} value={unit} setValue={setUnit} />
        <NumberInput
          label={`Units per drink (${unit})`}
          placeholder="Number of units"
          value={unitsPerDrink.toString()}
          setValue={setUnitsPerDrink}
        />
        <NumberInput
          label={`Total units (${unit})`}
          placeholder="Number of units"
          value={totalUnits.toString()}
          setValue={setTotalUnits}
        />
        <SelectInput
          label="Reminder"
          options={[ACTIVE, INACTIVE]}
          value={reminderStatus}
          setValue={setReminderStatus}
        />
        {reminderStatus === ACTIVE && (
          <NumberInput
            label="Remind me every (minutes)"
            placeholder="Number of minutes"
            value={remindEvery.toString()}
            setValue={setRemindEvery}
          />
        )}

        <IconButton icon="" name="Save" isLight={isLight} onClick={handleSave} isDisabled={disableSave} />
      </div>
      <div
        className={cn(
          'p-5 pb-6 max-w-72 flex flex-col h-fit gap-5 relative border-2 rounded-lg shadow-lg border-opacity-10 border-none',
          isLight ? 'bg-[#2dade9] shadow-[#2ca7e0]' : 'bg-[#534343] shadow-[#302727]',
        )}>
        <h1 className="text-2xl font-bold mb-3">How much water you need to drink daily?</h1>

        <NumberInput label="Age" placeholder="Your age" value={age} setValue={setAge} />
        <NumberInput label="Weight (Kg)" placeholder="Your weight" value={weight} isDecimal setValue={setWeight} />

        <IconButton
          icon=""
          name="Calculate"
          isLight={isLight}
          onClick={handleCalculate}
          isDisabled={age === '0' || weight === '0'}
        />

        {Boolean(recommendedUnits) && (
          <div className="text-base">
            <p className="font-bold">You should drink approximately:</p>
            <p>
              <span className={cn('font-semibold')}>
                {recommendedUnits} {storage.unit}
              </span>{' '}
              of water daily.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
