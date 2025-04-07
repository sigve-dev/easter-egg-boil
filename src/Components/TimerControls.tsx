import "../App.css";

type Props = {
  onSelect: (type: "soft" | "hard") => void;
};

export const TimerControls = ({ onSelect }: Props) => (
  <div className="button-group">
    <button className="button start" onClick={() => onSelect("soft")}>Soft-Boiled
    </button>
    <button
      className="button start" onClick={() => onSelect("hard")}>Hard-Boiled
    </button>
  </div>
);