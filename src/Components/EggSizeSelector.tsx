
type EggSizeType = {
    eggSize: "small" | "medium" | "large";
    onSelect: (size: "small" | "medium" | "large") => void;
};

const EggSizeSelector = ({ eggSize, onSelect }: EggSizeType) => {
    return (
        <div className="size-selector">
            <label>Select Egg Size:</label>
            <select value={eggSize} onChange={(e) => onSelect(e.target.value as any)}>
                <option value={"small"}>Small</option>
                <option value={"medium"}>Medium</option>
                <option value={"large"}>Large</option>
            </select>
        </div>
    )
};

export default EggSizeSelector;