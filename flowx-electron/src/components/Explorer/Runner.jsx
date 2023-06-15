import { useRef } from 'react';
import styled from 'styled-components';
const {ipcRenderer} = window.require('electron');

const RunnerWrapper = styled.div`
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #ccc;
    z-index: 50;
    height: 5rem;
`;

const Run = styled.button`
    background-color: #0091EA;
    color: #fff;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
`

export const Runner = ({file}) => {
    const fileRef = useRef(null);
    const fileNameRef = useRef(null);

    const run = () => {
        const {path,fileName, ...realfile} = file;
        realfile.csvPath = fileRef.current.files[0].path;
        ipcRenderer.send('run', realfile);
    }

    const onChange = () => {
        fileNameRef.current.value = fileRef.current.files[0].name;
    }

    const onClick = () => {
        fileRef.current.click();
    }

    return (
        <RunnerWrapper>
            <div>
                <input ref={fileNameRef}/>
                <label onClick={onClick}>파일찾기</label>
                <input onChange={onChange} ref={fileRef} type="file" style={{display:"none"}}/>
            </div>
            <Run onClick={run}>Run</Run>
        </RunnerWrapper>
    )
}