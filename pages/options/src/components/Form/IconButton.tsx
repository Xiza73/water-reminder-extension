export interface IconButtonProps {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({ name, icon, onClick }) => {
  return (
    <button
      className="max-w-32 text-base mt-3 flex justify-center items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
      onClick={onClick}>
      {icon}

      <span className="mx-1">{name}</span>
    </button>
  );
};
