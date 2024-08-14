import { BaseStorage, createStorage, StorageType } from './base';

interface DrinkState {
  isInProgress: boolean;
  mililiters: number;
  mililitersPercent: number;
  time: string;
}

type DrinkStorage = BaseStorage<DrinkState> & {
  setInProgress: (isInProgress: boolean) => Promise<void>;
  setMililiters: (mililiters: number) => Promise<void>;
  setMililitersPercent: (mililitersPercent: number) => Promise<void>;
  setTime: (time: string) => Promise<void>;
  reset: () => Promise<void>;
};

const initialState: DrinkState = {
  isInProgress: false,
  mililiters: 0,
  mililitersPercent: 0,
  time: '',
};

const storage = createStorage<DrinkState>('drink-storage', initialState, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const drinkStorage: DrinkStorage = {
  ...storage,
  setInProgress: async (isInProgress: boolean) => {
    await storage.set(state => ({ ...state, isInProgress }));
  },
  setMililiters: async (mililiters: number) => {
    await storage.set(state => ({ ...state, mililiters }));
  },
  setMililitersPercent: async (mililitersPercent: number) => {
    await storage.set(state => ({ ...state, mililitersPercent }));
  },
  setTime: async (time: string) => {
    await storage.set(state => ({ ...state, time }));
  },
  reset: async () => {
    await storage.set(initialState);
  },
};
