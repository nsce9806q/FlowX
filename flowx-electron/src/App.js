import { useState } from "react";
import {
    ClearComp,
    DroDownComp,
    FileExplorer,
} from "./components/Explorer";
import Editor from "./components/Editor";

function App() {
    // selected file from GetFileButton Comp
    // and clear file with NewFileButton Comp
    const [file, setFile] = useState(null);

    return (
        <div className="App flex h-screen">
            {/* flex-1 for hidden explorer when not choose file */}
            <div className="w-1/4 flex-1 bg-gray-100">
                <FileExplorer file={file} />
            </div>

            <div className="flex w-full flex-col justify-center">
                {!file && <DroDownComp setFile={setFile} />}
                {file && (
                    <Editor file={file} setFile={setFile} />
                )}
                <ClearComp setFile={setFile} />
            </div>
        </div>
    );
}

export default App;
