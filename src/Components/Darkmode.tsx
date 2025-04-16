import { useEffect, useState } from "react";

export const Darkmode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("dark-mode", isDarkMode);
        document.documentElement.classList.toggle("dark-mode", isDarkMode); 
    }, [isDarkMode]);

    return (
        <div className="dark-mode-switch">
            <label className="switch">
                <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={() => setIsDarkMode((prev) => !prev)}
                />
                <span className="slider"></span>
            </label>

            <span className="switch-label">{isDarkMode ? "Light mode" : "Dark mode"}</span>
        </div>
    )
}