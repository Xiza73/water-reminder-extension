export const Position = {
  RIGHT: 'right',
  LEFT: 'left',
} as const;
export type Position = (typeof Position)[keyof typeof Position];

export interface ThemeButtonProps {
  position: Position;
  isLight: boolean;
  handleClick: () => void;
}

export const ThemeButton: React.FC<ThemeButtonProps> = ({ position, isLight, handleClick }) => {
  return (
    <svg
      className={`absolute top-5 ${position === Position.RIGHT ? 'right-5' : 'left-5'} cursor-pointer`}
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24">
      <path
        fill="none"
        stroke={isLight ? 'black' : 'white'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8a2.83 2.83 0 0 0 4 4a4 4 0 1 1-4-4m0-6v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"
      />
    </svg>
  );
};
