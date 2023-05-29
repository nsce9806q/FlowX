import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';
import defaultFunctions from '../../spec/functions';

const NodeWrapper = styled.div`
    padding: 0 10px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    min-width: 100px;
    text-align: center;
`;

const IOWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    > div > div {
        font-size: 0.8rem;
        color: #888;
    }
`;

const IOHandle = ({ type, position, id, isConnectable, text }) => {
    return (
        <div style={{}}>
            {type === "source" && <div>
                {text}
            </div>}
            <Handle
                type={type}
                position={position}
                id={id}
                isConnectable={isConnectable}
                style={{ position: 'relative', zIndex: 10}}
            />
            {type === "target" && <div>
                {text}
            </div>}
        </div>
    );
}

function FunctionNode({ data, isConnectable }) {
    if(defaultFunctions[data.label].type === "calculation"){
        const {input, output} = defaultFunctions[data.label];
        const index = output.indexOf(data.output[0]);
        return (
            <NodeWrapper>
                <IOWrapper>
                    <IOHandle type="target" position={Position.Top} id="i0" isConnectable={isConnectable}
                        text={index !== -1 && input[index][0]}
                    />
                    <IOHandle type="target" position={Position.Top} id="i1" isConnectable={isConnectable} text={index !== -1 && input[index][1]}/>
                </IOWrapper>
                <div>
                    {data.label}
                </div>
                <IOWrapper>
                    <IOHandle type="source" position={Position.Bottom} isConnectable={isConnectable} text={index !== -1 && output[index]}/>
                </IOWrapper>
            </NodeWrapper>
        );
    } 

  return (
    <NodeWrapper>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        {data.label}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </NodeWrapper>
  );
}

export default FunctionNode;