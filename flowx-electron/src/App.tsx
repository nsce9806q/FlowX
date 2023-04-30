import React, { useEffect, useRef } from "react";
import FlowChart from "./components/FlowChart";
import "./style/global.css";
import CounterContainer from "./containers/example/CounterContainer";

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
        <div className="h-96">
            {/* electron light-dark mode example */}
            <h2 id="theme-source">System</h2>
            <button id="toggle-dark-mode" ref={buttonRef}>
                Toggle Dark Mode
            </button>

            {/* redux-example (flux pattern) */}
            <CounterContainer />

            {/* react flow chart */}
            <FlowChart />
        </div>
    );
}

export default App;
