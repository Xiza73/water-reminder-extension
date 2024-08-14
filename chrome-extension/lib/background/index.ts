import 'webextension-polyfill';
import { drinkStorage, exampleThemeStorage, optionsStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

drinkStorage.get().then(() => {
  drinkStorage.reset();
});

optionsStorage.get().then(() => {
  optionsStorage.reset();
});

console.log('background loaded');
console.log("Edit 'chrome-extension/lib/background/index.ts' and save to reload.");
