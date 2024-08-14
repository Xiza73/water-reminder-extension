import { exampleThemeStorage } from '@extension/storage';
import { useStorageSuspense } from './useStorage';

export const useTheme = () => {
  const theme = useStorageSuspense(exampleThemeStorage);

  return {
    isLight: theme === 'light',
  };
};
