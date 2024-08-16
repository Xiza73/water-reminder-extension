import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const rotateTracker = async () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return {
    hours,
    minutes,
  };
};

export const fixTime = (hours: number, minutes: number) => {
  const fixHours = hours < 10 ? `0${hours}` : hours;
  const fixMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${fixHours}:${fixMinutes}`;
};
