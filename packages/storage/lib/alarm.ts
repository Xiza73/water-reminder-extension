import { chrome } from './base';

export const clearAlarm = (key: string) => {
  chrome?.alarms.clear(key);
};

export const createAlarm = (key: string, minutes: number) => {
  clearAlarm(key);

  chrome?.alarms.create(key, { /* periodInMinutes: minutes,  */ delayInMinutes: minutes });
};
