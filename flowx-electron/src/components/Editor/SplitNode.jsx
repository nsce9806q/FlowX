import { Position } from 'reactflow';
import { NodeWrapper,IOWrapper, IOHandle } from './FunctionNode';
import defaultFunctions from '../../spec/functions';
import styled from 'styled-components';
import {useRef,useState} from 'react';

const SelectTypes = styled.div`
    display: none;
    min-width: 100px;
    flex-direction: column;
    position: absolute;
    top:0;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background-color: white;
    align-items: stretch;
    z-index: 100;
    > div {
        padding: 4px;
        cursor: pointer;
        &:hover {
            background-color: #eee;
        }
        ~div {
            border-top: 1px solid #ddd;
        }
    }
    :hover {
        display: flex;
    }
`;

function PlusSquare(props) {
    return (
        <svg
            fontSize="inherit"
            style={{ width: "14px", height: "14px",fill: "#00C853" }}
            viewBox="0 0 24 24"
            {...props}
        >
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </svg>
    );
}


function InputNode({ id, data, isConnectable }) {
    const {input, output} = defaultFunctions[data.name];
    const selectRef = useRef(null);
    const [selectedOutputIndex, setSelectedOutputIndex] = useState(null);

    const changeType = (index,type) => (e) => {
        data.setSelected((prev) => {
            const newSelected = {...prev};
            newSelected.nodes.find((item) => item.id === id).data.output[index] = type;
            return newSelected;
        });
        selectRef.current.style.display = "none";
    }

    return (
        <NodeWrapper id={id} setSelected={data.setSelected}>
            <IOWrapper>
                <div>{input[0]}</div>
            </IOWrapper>
            <div>
                {data.name}
            </div>
            <IOWrapper>
                {data.output?.map((item, index) => <IOHandle
                        type="source"
                        id={"o"+index}
                        position={Position.Bottom}
                        isConnectable={isConnectable}
                        text={item}
                        events={{
                            onClick : (e) => {
                                setSelectedOutputIndex(index);
                                selectRef.current.style.display = "flex";
                                selectRef.current.style.left = (e.target.offsetLeft+e.target.offsetWidth+5)+"px";
                            }
                        }}
                        key={index}
                    />
                )}
                <PlusSquare 
                    onClick={(e) => {
                        setSelectedOutputIndex(data.output?.length??0);
                        selectRef.current.style.display = "flex";
                        selectRef.current.style.left = "100%";
                    }}
                />
                <SelectTypes ref={selectRef}>
                    {output.map((item, index) => {
                        return <div onClick={changeType(selectedOutputIndex,item)} key={index}>{item}</div>
                    })}
                </SelectTypes>
            </IOWrapper>
        </NodeWrapper>
    );
}

export default InputNode;