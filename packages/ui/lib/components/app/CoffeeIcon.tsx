import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utils';

export type CoffeeIconProps = {
  color?: string;
  size?: number;
} & ComponentPropsWithoutRef<'svg'>;

export function CoffeeIcon({ color = 'currentColor', size = 16, className, ...props }: CoffeeIconProps) {
  return (
    <svg
      className={cn(className, 'relative top-[2.6px] ml-[3px] mr-[2px]')}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      {...props}>
      <path
        fill={color}
        d="M822.592 192h14.272a32 32 0 0 1 31.616 26.752l21.312 128A32 32 0 0 1 858.24 384h-49.344l-39.04 546.304A32 32 0 0 1 737.92 960H285.824a32 32 0 0 1-32-29.696L214.912 384H165.76a32 32 0 0 1-31.552-37.248l21.312-128A32 32 0 0 1 187.136 192h14.016l-6.72-93.696A32 32 0 0 1 226.368 64h571.008a32 32 0 0 1 31.936 34.304zm-64.128 0l4.544-64H260.736l4.544 64zm-548.16 128H820.48l-10.688-64H214.208l-10.688 64zm68.736 64l36.544 512H708.16l36.544-512z"
      />
    </svg>
  );
}
