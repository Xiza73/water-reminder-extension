export interface PercentProps {
  percent: number;
};

export const Percent: React.FC<PercentProps> = ({ percent }) => {
  return (
    <div className="percent">
      <div className="percent__inner">
        <div className="percent__num" id="count">
          {percent}
        </div>
        <div className="percent__sign">%</div>
      </div>
    </div>
  );
};
