import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utils';

export type ResetIconProps = {
  onReset: () => void;
} & ComponentPropsWithoutRef<'svg'>;

export const ResetIcon: React.FC<ResetIconProps> = ({ onReset, className, ...props }) => {
  return (
    <svg
      className={cn(className, 'absolute top-2 right-2 cursor-pointer text-white text-2xl z-30')}
      onClick={onReset}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 21 21"
      {...props}>
      <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.578 6.487A8 8 0 1 1 2.5 10.5" />
        <path d="M7.5 6.5h-4v-4" />
      </g>
    </svg>
  );
};
