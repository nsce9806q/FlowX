import { useState, useEffect } from "react";
import {
    ClearComp,
    DroDownComp,
    FileExplorer,
    NewFile,
    SaveButton
} from "./components/Explorer";
import Editor from "./components/Editor";

function App() {
    // selected file from GetFileButton Comp
    // and clear file with NewFileButton Comp
    const [file, setFile] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        console.log(file);
    }, [file]);

    useEffect(() => {
        if(!selected) return;
        const newFile = {
            ...file,
            [selected.type]:{
                ...file[selected.type],
                [selected.funcName]: {
                    ...file[selected.type][selected.funcName],
                    nodes: selected.nodes,
                    edges: selected.edges
                }
            }
        };
        setFile(newFile);
    }, [selected]);

    if(!file)
        return (
            <div className="flex h-full w-full justify-center">
                <NewFile setFile={setFile} />
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
            <SaveButton file={file} setFile={setFile}/>
        </>
    );
}

export default App;
