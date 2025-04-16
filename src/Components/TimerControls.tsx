import "../App.css";

type TimerControlType = {
    onSelect: (type: "soft" | "medium" | "hard") => void;
};

const TimerControls = ({ onSelect }: TimerControlType) => (
    <div className="button-group">
        <button className="button start" onClick={
            () => onSelect("soft")}>Soft-Boiled</button>
        <button className="button start" onClick={
            () => onSelect("medium")}>Medium-Boiled</button>
        <button className="button start" onClick={
            () => onSelect("hard")}>Hard-Boiled</button>
    </div>
)

export default TimerControls
