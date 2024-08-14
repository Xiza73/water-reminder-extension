export interface TrackerProps {
  time: string;
}

export const Tracker: React.FC<TrackerProps> = ({ time }) => {
  return (
    <div className="tracker">
      <div className="tracker__item">Last drink</div>
      <div className="tracker__inner" id="tracker">
        <div className="tracker__item tracker__item_active">{time}</div>
      </div>
    </div>
  );
};
