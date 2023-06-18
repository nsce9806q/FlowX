import { Position } from 'reactflow';
import { NodeWrapper, IOWrapper, IOHandle } from './FunctionNode';
import defaultFunctions from '../../../spec/functions';

function AssembleNode({ id, data, isConnectable }) {
    return (
        <NodeWrapper id={id} selectedFunction={data.selectedFunction} file={data.file} setFile={data.setFile} isDefaultNode>
            <IOWrapper>
                {
                    data.input.map((e, i) => (
                        <IOHandle type="target" position={Position.Top} id={`i${i}`} isConnectable={true} text={e} key={i}/>
                    ))
                }
                <IOHandle type="target" position={Position.Top} id={`i${data.input.length}`} isConnectable={isConnectable} text={""}/>
            </IOWrapper>
            <div>
                {data.name}
            </div>
        </NodeWrapper>
    );
}

export default AssembleNode;