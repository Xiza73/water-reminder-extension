import { useId } from 'react';
import { Label } from './Label';
import { useTheme } from '@extension/shared';

export interface SelectInputProps {
  label: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({ label, options, value, setValue }) => {
  const { isLight } = useTheme();

  const id = useId();

  return (
    <div className="text-base">
      <Label text={label} htmlFor={id} />

      <select
        id={id}
        value={value}
        onChange={e => setValue(e.target.value)}
        className={`max-w-64 block mt-2 w-full placeholder-gray-400/70 rounded-lg border px-5 py-2.5 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 ${
          isLight ? 'border-gray-200 bg-white text-gray-700' : 'border-[#241d1d] bg-[#3d2c2c] text-gray-300'
        }`}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
