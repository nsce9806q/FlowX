import { useRef } from "react";
import { newFunction } from "../../utils/file";
import styled from "styled-components";

function CloseSquare(props) {
    return (
        <svg
            fontSize="inherit"
            style={{
                width: "20px",
                height: "20px",
                fill: "#D50000",
                cursor: "pointer",
                display: "inline-block",
                float: "right",
                background: "#fff",
                margin: "4px",
                flexShrink: 0,
                flexGrow: 0,
            }}
            viewBox="0 0 24 24"
            {...props}
        >
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </svg>
    );
}

function PlusSquare(props) {
    return (
        <svg
            fontSize="inherit"
            style={{
                width: "20px",
                height: "20px",
                fill: "#000000",
                cursor: "pointer",
                background: "#fff",
                margin: "4px",
                flexShrink: 0,
                flexGrow: 0,
            }}
            viewBox="0 0 24 24"
            {...props}
        >
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </svg>
    );
}

const FuntionElement = styled.div`
    background: ${(props) => (props.selected ? "#aaa":"")};
    padding: 2px;
    cursor: pointer;
    &:hover {
        background: #ccc;
    }
`;

const FileSystemNavigator = ({ file,setFile,selectedFunction, setSelectedFunction }) => {
    const ref = useRef(null);
    return (
        <div className="pr-2 pt-2 h-full" style={{ width: "200px", paddingLeft: "10px"}}>
            <div style={{display:"flex",flexDirection:"row"}}>
                <div className="text-lg font-bold" style={{display:"inline-block",overflow: "hidden",textOverflow: "ellipsis"}}>{file.fileName??"New File"}</div>
                <CloseSquare onClick={e=>{
                    setFile(null);
                    setSelectedFunction(null);
                }}/>
            </div>
            <div>
                {file.functions.map(
                    (e, index) => {
                        return (
                            <FuntionElement
                                key={index}
                                onClick={() =>
                                    setSelectedFunction(e.name)
                                }
                                selected={e.name === selectedFunction}
                            >{e.name}</FuntionElement>
                        );
                    }
                )}
            </div>
            <div style={{display:"flex",flexDirection:"row"}}>
                <input type="text" style={{width:"100%"}} className="border-2 border-gray-300" placeholder="new function name" ref={ref}/>
                <PlusSquare onClick={e=>{
                    const name = ref.current.value;
                    if(name.length===0) return;
                    if(file.functions.find(e=>e.name===name)) return;
                    file.functions.push(newFunction(name));
                    setFile({...file});
                    setSelectedFunction(name);
                    ref.current.value="";
                }}/>
            </div>
        </div>
    );
};

export { FileSystemNavigator as FileExplorer };
