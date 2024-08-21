import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../utils';

export type FillIconProps = {
  stroke?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
} & ComponentPropsWithoutRef<'svg'>;

export function FillIcon({
  stroke = 'currentColor',
  width = 16,
  height = 16,
  onClick,
  className,
  ...props
}: FillIconProps) {
  return (
    <svg
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 17 16"
      onClick={onClick}
      {...props}>
      <path
        fill={stroke}
        fillRule="evenodd"
        d="m1.365 12.336l3.295 3.303a1.21 1.21 0 0 0 1.713.015l10.251-7.722a1.213 1.213 0 0 0-.014-1.713L10.765.364A1.209 1.209 0 0 0 9.054.35L1.351 10.622c-.47.47-.462 1.237.014 1.714m5.971-2.564c-1.59.008-3.354-1.247-3.354-1.247l2.677-3.43l2.659-3.408a1.168 1.168 0 0 1 1.631.014l4.393 4.323a1.12 1.12 0 0 1 .012 1.604l-4.565 3.428c-.001.001-1.6-1.293-3.453-1.284"
      />
    </svg>
  );
}
