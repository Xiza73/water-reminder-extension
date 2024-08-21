import { cn } from '@extension/ui';
import { ComponentPropsWithoutRef } from 'react';

export type IconButtonProps = {
  name: string;
  icon: React.ReactNode;
  isLight: boolean;
  onClick: () => void;
} & ComponentPropsWithoutRef<'button'>;

export const IconButton: React.FC<IconButtonProps> = ({ name, icon, isLight, onClick, className, ...props }) => {
  return (
    <button
      className={cn(
        className,
        'max-w-32 text-base mt-3 flex justify-center items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-opacity-80',
        isLight
          ? 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-300'
          : 'bg-[#967f5c] hover:bg-[#7e6a4f] focus:ring-[#967f5c]',
      )}
      onClick={onClick}
      {...props}>
      {icon}

      <span className="mx-1">{name}</span>
    </button>
  );
};
