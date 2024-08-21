import { cn } from '../../utils';
import { ComponentPropsWithoutRef } from 'react';

export type WaterProps = {
  percent: number;
  isLight: boolean;
} & ComponentPropsWithoutRef<'div'>;

export const Water: React.FC<WaterProps> = ({ percent, isLight, className, ...props }) => {
  return (
    <div
      className={cn(className, 'water', isLight ? 'bg-[#32bafa]' : 'bg-[#4a3c3c]')}
      id="water"
      style={{
        transform: `translateY(${100 - percent}%)`,
      }}
      {...props}>
      {/* for light the style is like water, for dark, we simulate coffee */}
      <svg
        className={cn('water__wave water__wave_back', isLight ? 'fill-[#2c7fbe]' : 'fill-[#3d2c2c]')}
        viewBox="0 0 560 20">
        <use xlinkHref="#wave"></use>
      </svg>
      <svg
        className={cn('water__wave water__wave_front', isLight ? 'fill-[#32bafa]' : 'fill-[#4a3c3c]')}
        viewBox="0 0 560 20">
        <use xlinkHref="#wave"></use>
      </svg>
      <div className="water__inner">
        <div className="bubble bubble_1"></div>
        <div className="bubble bubble_2"></div>
        <div className="bubble bubble_3"></div>
      </div>
    </div>
  );
};
