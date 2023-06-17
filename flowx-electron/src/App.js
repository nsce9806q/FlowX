/** @format */

import { useState, useEffect } from "react";
import {
  ClearComp,
  DroDownComp,
  FileExplorer,
  NewFile,
  SaveButton,
  Runner,
} from "./components/Explorer";
import Editor from "./components/Editor";

function App() {
  // selected file from GetFileButton Comp
  // and clear file with NewFileButton Comp
  const [file, setFile] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);

  useEffect(() => {
      console.log(file);
  }, [file]);

  if (!file)
    return (
      <div className="flex h-full w-full justify-center">
        <NewFile setFile={setFile} />
        <DroDownComp setFile={setFile} />
      </div>
    );
  return (
    <>
      <div
        className="flex"
        style={{ minHeight: "calc(100% - 5rem)" }}
      >
        <div className="bg-gray-100" style={{ width: "200px" }}>
            <FileExplorer file={file} setSelectedFunction={setSelectedFunction}/>
        </div>
        <Editor file={file} setFile={setFile} selectedFunction={selectedFunction}/>
      </div>

      <SaveButton file={file} setFile={setFile} />
      <Runner file={file} />
    </>
  );
}

export default App;
