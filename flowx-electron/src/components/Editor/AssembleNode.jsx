import { Position } from 'reactflow';
import { NodeWrapper, IOWrapper, IOHandle } from './FunctionNode';
import defaultFunctions from '../../spec/functions';

function AssembleNode({ id, data, isConnectable }) {
    const {input, output} = defaultFunctions[data.name];
    const index = output.indexOf(data.output?.[0]);
    return (
        <NodeWrapper id={id} setSelected={data.setSelected}>
            <IOWrapper>
                <IOHandle type="target" position={Position.Top} id="i0" isConnectable={isConnectable}
                    text={index !== -1 && input[index][0]}
                />
                <IOHandle type="target" position={Position.Top} id="i1" isConnectable={isConnectable} text={index !== -1 && input[index][1]}/>
            </IOWrapper>
            <div>
                {data.name}
            </div>
            <IOWrapper>
                <div>{output[0]}</div>
            </IOWrapper>
        </NodeWrapper>
    );
}

export default AssembleNode;