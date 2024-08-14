import { useTheme } from '@extension/shared';

export interface LabelProps {
  text: string;
  htmlFor: string;
}

export const Label: React.FC<LabelProps> = ({ text, htmlFor }) => {
  const { isLight } = useTheme();

  return (
    <>
      <label htmlFor={htmlFor} className={`block ${isLight ? 'text-gray-900' : 'text-gray-300'}`}>
        {text}
      </label>
    </>
  );
};
