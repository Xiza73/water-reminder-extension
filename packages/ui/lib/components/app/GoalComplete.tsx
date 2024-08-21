import { cn } from '../../utils';
import { ComponentPropsWithoutRef } from 'react';

export type GoalCompleteProps = {
  isPopup?: boolean;
} & ComponentPropsWithoutRef<'div'>;

export const GoalComplete: React.FC<GoalCompleteProps> = ({ isPopup = false, className, ...props }) => {
  return (
    <div
      className={cn(
        className,
        'absolute left-0 w-full text-white text-center h-16 overflow-hidden z-20',
        isPopup ? 'bottom-24' : 'top-56',
      )}
      {...props}>
      <div className="transition-transform duration-200 ease-in-out" id="tracker">
        <div
          className={cn(
            'transition-opacity duration-200 font-bold opacity-100 ease-in-out flex justify-center',
            isPopup ? 'text-3xl' : 'text-4xl',
          )}>
          Goal Complete!
        </div>
      </div>
    </div>
  );
};
