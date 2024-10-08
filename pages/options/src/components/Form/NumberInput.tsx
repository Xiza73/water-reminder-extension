import { useTheme } from '@extension/shared';
import { useId } from 'react';
import { Label } from './Label';
import { cn } from '@extension/ui';

export interface NumberInputProps {
  label: string;
  placeholder: string;
  isDisabled?: boolean;
  value: string;
  isDecimal?: boolean;
  setValue: (value: string) => void;
}

const parseToNumber = (value: string) => {
  let newValue = value.replace(/\D/g, '');
  newValue = newValue.replace(/^0+/, '');
  if (newValue === '') newValue = '0';

  return newValue;
};

const parseToDecimal = (value: string) => {
  value = value.replace(/[^0-9.]/g, '');
  value = value.replace(/^\./g, '');
  value = value.replace(/\.{2,}/g, '.');
  value = value.replace(/\..*\./g, '.');
  if (value.length > 1 && value[1] !== '.') value = value.replace(/^0+/g, '');
  value = value.replace(/\.\d{3,}/, '.' + value.split('.')[1]?.slice(0, 2));
  value = value === '' ? '0' : value;
  return value;
};

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  placeholder,
  isDisabled = false,
  value,
  isDecimal = false,
  setValue,
}) => {
  const { isLight } = useTheme();

  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = isDecimal ? parseToDecimal(e.target.value) : parseToNumber(e.target.value);

    setValue(newValue);
  };

  return (
    <div className="text-base">
      <Label text={label} htmlFor={id} />

      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        className={cn(
          'max-w-64 block mt-2 w-full placeholder-gray-400/70 rounded-lg border px-5 py-2.5 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40',
          isLight
            ? isDisabled
              ? 'border-gray-200 bg-gray-200 text-gray-500'
              : 'border-gray-200 bg-white text-gray-700'
            : isDisabled
              ? 'border-[#362e2e] bg-[#4b4040] text-gray-500'
              : 'border-[#241d1d] bg-[#3d2c2c] text-gray-300',
        )}
      />
    </div>
  );
};
