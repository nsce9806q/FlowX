import { Position, useReactFlow, getConnectedEdges  } from 'reactflow';
import { NodeWrapper, IOWrapper, IOHandle } from './FunctionNode';
import defaultFunctions from '../../spec/functions';

function CalculationNode({ id, data }) {
    const {input:funcInput, output:funcOutput} = defaultFunctions[data.name];
    const reactFlowInstance = useReactFlow();
    const incommerEdges = getConnectedEdges([reactFlowInstance.getNode(id)], reactFlowInstance.getEdges())
        .filter(e=>e.target===id)
        .reduce((acc,cur)=>({...acc,[cur.targetHandle]:cur.data.type}),{});
    const output = funcOutput[funcInput.findIndex(e=>e[0]===incommerEdges["i0"] && e[1]===incommerEdges["i1"])]
        ?? (incommerEdges["i0"]===undefined || incommerEdges["i1"]===undefined ? "" : "Error");
    return (
        <NodeWrapper id={id} setSelected={data.setSelected}>
            <IOWrapper>
                <IOHandle type="target" position={Position.Top} id="i0" isConnectable={true}
                    text={incommerEdges["i0"] ?? ""}/>
                <IOHandle type="target" position={Position.Top} id="i1" isConnectable={true} text={incommerEdges["i1"] ?? ""}/>
            </IOWrapper>
            <div>
                {data.name}
            </div>
            <IOWrapper>
                <IOHandle type="source" position={Position.Bottom} isConnectable={!["","Error"].includes(output)} text={output}/>
            </IOWrapper>
        </NodeWrapper>
    );
}

export default CalculationNode;