export interface ResetIconProps {
  onReset: () => void;
}

export const ResetIcon: React.FC<ResetIconProps> = ({ onReset }) => {
  return (
    <svg
      className="reset-icon"
      onClick={onReset}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 21 21">
      <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.578 6.487A8 8 0 1 1 2.5 10.5" />
        <path d="M7.5 6.5h-4v-4" />
      </g>
    </svg>
  );
};
