export const Unit = {
  L: 'L',
  ML: 'mL',
  OZ: 'Oz',
} as const;
export type Unit = (typeof Unit)[keyof typeof Unit];
