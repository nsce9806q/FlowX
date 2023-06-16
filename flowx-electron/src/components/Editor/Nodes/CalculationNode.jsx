import { Position, useReactFlow, getConnectedEdges  } from 'reactflow';
import { NodeWrapper, IOWrapper, IOHandle } from './FunctionNode';
import defaultFunctions from '../../../spec/functions';

function CalculationNode({ id, data }) {
    return (
        <NodeWrapper id={id} selectedFunction={data.selectedFunction} file={data.file} setFile={data.setFile}>
            <IOWrapper>
                <IOHandle type="target" position={Position.Top} id="i0" isConnectable={true} text={data.input[0]}/>
                <IOHandle type="target" position={Position.Top} id="i1" isConnectable={true} text={data.input[1]}/>
            </IOWrapper>
            <div>
                {data.name}
            </div>
            <IOWrapper>
                <IOHandle type="source" position={Position.Bottom} isConnectable={!!data.output[0]} text={data.output[0]}/>
            </IOWrapper>
        </NodeWrapper>
    );
}

export default CalculationNode;