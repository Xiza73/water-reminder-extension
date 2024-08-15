import { BaseStorage, createStorage, StorageType } from './base';

interface DrinkState {
  isInProgress: boolean;
  currentUnits: number;
  currentPercent: number;
  count: number;
  time: string;
}

type DrinkStorage = BaseStorage<DrinkState> & {
  setInProgress: (isInProgress: boolean) => Promise<void>;
  setCurrentUnits: (currentUnits: number) => Promise<void>;
  setCurrentPercent: (currentPercent: number) => Promise<void>;
  setCount: (count: number) => Promise<void>;
  setLastTime: (time: string) => Promise<void>;
  reset: () => Promise<void>;
};

const initialState: DrinkState = {
  isInProgress: false,
  currentUnits: 0,
  currentPercent: 0,
  time: '',
  count: 0,
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
  setCurrentUnits: async (currentUnits: number) => {
    await storage.set(state => ({ ...state, currentUnits }));
  },
  setCurrentPercent: async (currentPercent: number) => {
    await storage.set(state => ({ ...state, currentPercent }));
  },
  setCount: async (count: number) => {
    await storage.set(state => ({ ...state, count }));
  },
  setLastTime: async (time: string) => {
    await storage.set(state => ({ ...state, time }));
  },
  reset: async () => {
    await storage.set(initialState);
  },
};
