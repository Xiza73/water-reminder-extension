import { useStorageSuspense, useTheme, withErrorBoundary, withSuspense } from '@extension/shared';
import { useState } from 'react';
import { NumberInput } from './components/Form/NumberInput';
import { SelectInput } from './components/Form/SelectInput';
import { exampleThemeStorage, optionsStorage } from '@extension/storage';
import { Position, ThemeButton, Unit } from '@extension/ui';
import { IconButton } from './components/Form/IconButton';

const Options = () => {
  const { isLight } = useTheme();
  const storage = useStorageSuspense(optionsStorage);

  const [unit, setUnit] = useState<string>(storage.unit);
  const [unitsPerDrink, setUnitsPerDrink] = useState(storage.unitsPerDrink.toString());
  const [totalUnits, setTotalUnits] = useState(storage.totalUnits.toString());

  const handleSave = async () => {
    await optionsStorage.setState({
      unit: unit as Unit,
      unitsPerDrink: parseInt(unitsPerDrink),
      totalUnits: parseInt(totalUnits),
    });

    alert('Saved!');
  };

  return (
    <div
      className={`p-5 flex flex-col h-screen gap-5 relative ${isLight ? 'bg-sky-500 text-gray-900' : 'bg-sky-800 text-gray-300'}`}>
      <ThemeButton position={Position.RIGHT} handleClick={exampleThemeStorage.toggle} isLight={isLight} />
      <h1 className="text-2xl font-bold mb-3">Settings</h1>

      <SelectInput label="Unit" options={Object.values(Unit)} value={unit} setValue={setUnit} />
      <NumberInput
        label="Units per drink"
        placeholder="Number of units"
        value={unitsPerDrink.toString()}
        setValue={setUnitsPerDrink}
      />
      <NumberInput
        label="Total units"
        placeholder="Number of units"
        value={totalUnits.toString()}
        setValue={setTotalUnits}
      />

      <IconButton icon="" name="Save" onClick={handleSave} />
    </div>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
