import { Position } from 'reactflow';
import { NodeWrapper, IOWrapper, IOHandle } from './FunctionNode';
import defaultFunctions from '../../../spec/functions';

function AssembleNode({ id, data, isConnectable }) {
    return (
        <NodeWrapper id={id} selectedFunction={data.selectedFunction} file={data.file} setFile={data.setFile}>
            <IOWrapper>
                <IOHandle type="target" position={Position.Top} id="i0" isConnectable={isConnectable}
                    text={""}
                />
                <IOHandle type="target" position={Position.Top} id="i1" isConnectable={isConnectable} text={""}/>
            </IOWrapper>
            <div>
                {data.name}
            </div>
        </NodeWrapper>
    );
}

export default AssembleNode;