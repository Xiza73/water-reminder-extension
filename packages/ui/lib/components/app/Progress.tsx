import { cn } from '../../utils';
import { ComponentPropsWithoutRef } from 'react';

export type ProgressProps = {
  progress: string;
} & ComponentPropsWithoutRef<'div'>;

export const Progress: React.FC<ProgressProps> = ({ progress, className, ...props }) => {
  return (
    <div
      className={cn(className, 'absolute top-24 left-0 w-full text-white text-center h-16 overflow-hidden z-20')}
      {...props}>
      <div className="transition-opacity duration-200 font-medium pb-2 opacity-70 ease-in-out">Progress</div>
      <div className="transition-transform duration-200 ease-in-out" id="tracker">
        <div className="transition-opacity duration-200 font-medium opacity-100 ease-in-out">{progress}</div>
      </div>
    </div>
  );
};
