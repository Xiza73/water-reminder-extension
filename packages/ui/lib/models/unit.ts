
export const Unit = {
  L: 'L',
  ML: 'ml',
  OZ: 'oz',
} as const;
export type Unit = (typeof Unit)[keyof typeof Unit];