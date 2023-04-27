import React from "react";
import { Preload } from "preload";

var window: Preload.Window;

function App() {
    const sendMain = async () => {
        const response = await window.versions.ping();
        console.log(response);
    };
    return (
        <>
            <div>
                <button
                    onClick={() => {
                        sendMain();
                    }}
                >
                    Click to ping
                </button>
            </div>
        </>
    );
}

export default App;
