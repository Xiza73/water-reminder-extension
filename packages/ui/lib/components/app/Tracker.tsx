import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utils';

export type TrackerProps = {
  time: string;
} & ComponentPropsWithoutRef<'div'>;

export function Tracker({ time, className, ...props }: TrackerProps) {
  /* .tracker {
  position: absolute;
  top: 6%;
  left: 0;
  width: 100%;
  color: #fff;
  text-align: center;
  height: 74px;
  overflow: hidden;
  z-index: 20;
}

.tracker__inner {
  transition: transform 0.2s ease-in-out;
}

.tracker__item {
  transition: opacity 0.2s ease-in-out;
  font-size: 1.1rem;
  padding-bottom: 10px;
  opacity: 0.7;
}

.tracker__item_active {
  opacity: 1;
}
 */
  /* <div className="tracker">
      <div className="tracker__item">Last drink</div>
      <div className="tracker__inner" id="tracker">
        <div className="tracker__item tracker__item_active">{time}</div>
      </div>
    </div> */
  return (
    <div
      className={cn(className, 'absolute top-10 left-0 w-full text-white text-center h-16 overflow-hidden z-20')}
      {...props}>
      <div className="transition-opacity duration-200 font-medium pb-2 opacity-70 ease-in-out">Last drink</div>
      <div className="transition-transform duration-200 ease-in-out" id="tracker">
        <div className="transition-opacity duration-200 font-medium opacity-100 ease-in-out">{time}</div>
      </div>
    </div>
  );
}
