import { useState, useEffect } from "react";
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
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if(!selected) return;
        const newFile = {
            ...file
        };
        newFile[selected.type][selected.funcName] = selected.nodes;
        setFile(newFile);
    }, [selected]);

    if(!file)
        return (
            <div className="flex h-full w-full flex-col justify-center">
                <DroDownComp setFile={setFile} />
            </div>
        );
    return(
        <>
            <div className="flex" style={{minHeight:"calc(100% - 57px)"}}>
                <div className="bg-gray-100" style={{width:"200px"}}>
                    <FileExplorer file={file} setSelected={setSelected}/>
                </div>
                <Editor selected={selected} setSelected={setSelected}/>
            </div>
            <ClearComp setFile={setFile} setSelected={setSelected}/>
        </>
    );
}

export default App;
