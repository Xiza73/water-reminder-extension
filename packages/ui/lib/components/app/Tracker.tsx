import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utils';

export type TrackerProps = {
  time: string;
} & ComponentPropsWithoutRef<'div'>;

export function Tracker({ time, className, ...props }: TrackerProps) {
  return (
    <div
      className={cn(className, 'absolute top-10 left-0 w-full text-white text-center h-16 overflow-hidden z-20')}
      {...props}>
      <div className="transition-opacity duration-200 font-medium pb-1 opacity-70 ease-in-out">Last drink</div>
      <div className="transition-transform duration-200 ease-in-out" id="tracker">
        <div className="transition-opacity duration-200 text-base font-medium opacity-100 ease-in-out">
          {time || 'No drinks yet'}
        </div>
      </div>
    </div>
  );
}
