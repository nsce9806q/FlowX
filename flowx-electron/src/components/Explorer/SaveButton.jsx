import styled from 'styled-components';
const {ipcRenderer} = window.require('electron');
const fs = window.require('fs');

const FloatingDiv = styled.div`
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 10001;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 0.5rem;
`;

const TostMessage = styled.div`
    display: none;
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10001;
    background-color: RGBA(0, 0, 0, 0.4);
    color: #fff;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:active {
        background-color: #455A64;
    }
`;
    

const Save = styled.button`
    background-color: #0091EA;
    color: #fff;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:active {
        background-color: #455A64;
    }
`;

export const SaveButton = ({setFile,file}) => {
    const saveAsFile = () => {
        ipcRenderer.send('save-dialog', file);
        console.log("save as");
    }

    ipcRenderer.on('saved-file', (event, path) => {
        if(path.canceled)
            return;
        fs.writeFile(path.filePath, JSON.stringify(file), (err) => {
            if(err) throw err;
            const tostMessage = document.getElementById('tostMessage');
            tostMessage.style.display = "block";
            setTimeout(() => {
                tostMessage.style.display = "none";
            }, 2000);
        });
        setFile({...file, path: path.filePath, fileName: path.filePath.split('\\').pop()});
    });

    const saveFile = () => {
        if(!file.path)
            return saveAsFile();
            const {path,fileName, ...realfile} = file;
            fs.writeFile(path, JSON.stringify(realfile), (err) => {
                if(err) throw err;
                const tostMessage = document.getElementById('tostMessage');
                tostMessage.style.display = "block";
                setTimeout(() => {
                    tostMessage.style.display = "none";
                }, 2000);
            });
    }

    return (
        <>
            <FloatingDiv>
                <Save onClick={saveFile}>Save</Save>
                <Save onClick={saveAsFile}>Save As</Save>
            </FloatingDiv>
            <TostMessage id="tostMessage">{file.fileName} Saved</TostMessage>
        </>
    )
}