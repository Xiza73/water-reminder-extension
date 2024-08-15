import 'webextension-polyfill';
import { drinkStorage, exampleThemeStorage, optionsStorage } from '@extension/storage';

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
