export interface WaterProps {
  percent: number;
}

export const Water: React.FC<WaterProps> = ({ percent }) => {
  return (
    <div
      className="water"
      id="water"
      style={{
        transform: `translateY(${100 - percent}%)`,
      }}>
      <svg className="water__wave water__wave_back" viewBox="0 0 560 20">
        <use xlinkHref="#wave"></use>
      </svg>
      <svg className="water__wave water__wave_front" viewBox="0 0 560 20">
        <use xlinkHref="#wave"></use>
      </svg>
      <div className="water__inner">
        <div className="bubble bubble_1"></div>
        <div className="bubble bubble_2"></div>
        <div className="bubble bubble_3"></div>
      </div>
    </div>
  );
};
