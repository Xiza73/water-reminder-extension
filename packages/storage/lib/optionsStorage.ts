import { BaseStorage, createStorage, StorageType } from './base';

export const Unit = {
  L: 'L',
  ML: 'ml',
  OZ: 'oz',
} as const;
export type Unit = (typeof Unit)[keyof typeof Unit];

interface OptionsState {
  unit: Unit;
  unitsPerDrink: number;
  totalUnits: number;
  isReminderActive: boolean;
  remindEvery: number;
}

type OptionsStorage = BaseStorage<OptionsState> & {
  setState: (state: Partial<OptionsState>) => Promise<void>;
  reset: () => Promise<void>;
};

const initialState: OptionsState = {
  unit: Unit.ML,
  unitsPerDrink: 500,
  totalUnits: 2000,
  isReminderActive: false,
  remindEvery: 30,
};

const storage = createStorage<OptionsState>('options-storage', initialState, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const optionsStorage: OptionsStorage = {
  ...storage,
  setState: async (state: Partial<OptionsState>) => {
    await storage.set(s => ({ ...s, ...state }));
  },
  reset: async () => {
    await storage.set(initialState);
  },
};
