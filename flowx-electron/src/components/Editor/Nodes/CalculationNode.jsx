import { Position, useReactFlow, getConnectedEdges  } from 'reactflow';
import { NodeWrapper, IOWrapper, IOHandle } from './FunctionNode';
import defaultFunctions from '../../../spec/functions';

function CalculationNode({ id, data }) {
    return (
        <NodeWrapper id={id} selectedFunction={data.selectedFunction} file={data.file} setFile={data.setFile}>
            <IOWrapper>
                {
                    data.input.map((e, i) => (
                        <IOHandle type="target" position={Position.Top} id={`i${i}`} isConnectable={true} text={e} key={i}/>
                    ))
                }
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