import React, { useEffect, useRef } from "react";
import FlowChart from "./components/FlowChart";
import "./style/app.scss";

function App() {
    const buttonRef = useRef(null);

    const handleClick = async () => {
        const isDarkMode = await window.darkMode.toggle();
        document.getElementById("theme-source")!.innerHTML =
            isDarkMode ? "Dark" : "Light";
    };

    useEffect(() => {
        if (buttonRef && buttonRef.current) {
            const ref: HTMLElement = buttonRef.current;
            ref.addEventListener("click", handleClick);
        }
    }, [buttonRef]);

    return (
        <div className="OuterDiv">
            <h2 id="theme-source">System</h2>
            <button id="toggle-dark-mode" ref={buttonRef}>
                Toggle Dark Mode
            </button>

            <FlowChart />
        </div>
    );
}

export default App;
