import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utils';

export type GlassIconProps = {
  stroke?: string;
  width?: number;
  height?: number;
} & ComponentPropsWithoutRef<'svg'>;

export function GlassIcon({ stroke = 'currentColor', width = 16, height = 16, className, ...props }: GlassIconProps) {
  return (
    <svg
      className={cn(className, 'relative top-[2.6px] ml-[3px] mr-[2px]')}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      {...props}>
      <g fill="none" stroke={stroke} strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m7.5 11l1 5" />
        <path d="M3.04 4.294a.5.5 0 0 1 .191-.479C3.927 3.32 6.314 2 12 2s8.073 1.32 8.769 1.815a.5.5 0 0 1 .192.479l-1.7 12.744a4 4 0 0 1-1.98 2.944l-.32.183a10 10 0 0 1-9.922 0l-.32-.183a4 4 0 0 1-1.98-2.944z" />
        <path d="M3 5c2.571 2.667 15.429 2.667 18 0" />
      </g>
    </svg>
  );
}
