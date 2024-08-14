export interface DrinkButtonProps {
  onClick: () => void;
}

export const DrinkButton: React.FC<DrinkButtonProps> = ({ onClick }) => {
  return (
    <button className="button" id="button" onClick={onClick}>
      Drink
    </button>
  );
};
