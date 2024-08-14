import { useTheme } from '@extension/shared';
import { useId } from 'react';
import { Label } from './Label';

export interface NumberInputProps {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

const parseToNumber = (value: string) => {
  let newValue = value.replace(/\D/g, '');
  newValue = newValue.replace(/^0+/, '');
  if (newValue === '') newValue = '0';

  return newValue;
};

export const NumberInput: React.FC<NumberInputProps> = ({ label, placeholder, value, setValue }) => {
  const { isLight } = useTheme();

  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseToNumber(e.target.value));
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
        className={`max-w-64 block mt-2 w-full placeholder-gray-400/70 rounded-lg border px-5 py-2.5 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
          isLight ? 'border-gray-200 bg-white text-gray-700' : 'border-gray-600 bg-gray-900 text-gray-300'
        }`}
      />
    </div>
  );
};
