import 'webextension-polyfill';
import { drinkStorage, exampleThemeStorage, optionsStorage } from '@extension/storage';
import { chrome } from '@extension/storage/lib/base';

chrome.alarms.onAlarm.addListener(async alarm => {
  console.log('onAlarm', alarm, 'sec');

  const optionsState = await optionsStorage.get();

  if (!optionsState.isReminderActive) return;

  chrome.windows.create({
    width: 350,
    height: 250,
    top: 200,
    left: 400,
    type: 'popup',
    url: 'alarm/index.html',
  });
});

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

drinkStorage.get().then(state => {
  // drinkStorage.reset();
  console.log('state', state);
});

optionsStorage.get().then(state => {
  // optionsStorage.reset();
  console.log('options', state);
});

console.log('background loaded');
console.log("Edit 'chrome-extension/lib/background/index.ts' and save to reload.");
