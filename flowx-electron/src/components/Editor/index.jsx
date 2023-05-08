import { useState } from 'react';
import SaveFileButton from './SaveFileButton';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

function Editor({file, setFile}) {
    const [selected,setSelected] = useState(null);

    return (
        <div>
            <LeftPanel file={file} selected={selected} setSelected={setSelected}/>
            <RightPanel selected={selected} setFile={setFile}/>
            <SaveFileButton file={file}/>
        </div>
    )
}

export default Editor;