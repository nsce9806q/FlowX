import styled from 'styled-components';
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

export const SaveButton = ({file}) => {
    const saveAsFile = () => {
        const {path,fileName, ...realfile} = file;
        const element = document.createElement("a");
        const tempfile = new Blob([JSON.stringify(realfile)], {type: "text/json"});
        element.href = URL.createObjectURL(tempfile);
        element.download = "flowx.json";
        element.click();
    }

    const saveFile = () => {
        if(!file.path)
            return saveAsFile();
            const {path,fileName, ...realfile} = file;
            fs.writeFile(path, JSON.stringify(realfile), (err) => {
                if(err) throw err;
                console.log("file saved");
            });
    }

    return (
        <FloatingDiv>
            <Save onClick={saveFile}>Save</Save>
            <Save onClick={saveAsFile}>Save As</Save>
        </FloatingDiv>
    )
}