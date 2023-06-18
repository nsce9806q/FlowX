import { Position, useReactFlow, getConnectedEdges  } from 'reactflow';
import { NodeWrapper, IOWrapper, IOHandle } from './FunctionNode';
import defaultFunctions from '../../../spec/functions';

function CustomNode({ id, data }) {
    
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
                {
                    data.output.map((e, i) => (
                        <IOHandle type="source" position={Position.Bottom} id={`o${i}`} isConnectable={!!e} text={e} key={i}/>
                    ))
                }
            </IOWrapper>
        </NodeWrapper>
    );
}

export default CustomNode;