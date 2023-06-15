import { useRef, useState, useEffect, useCallback } from 'react';
import ReactFlow, { useReactFlow, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import CalculationNode from './Nodes/CalculationNode';
import SplitNode from './Nodes/SplitNode';
import AssembleNode from './Nodes/AssembleNode';
import BranchNode from './Nodes/BranchNode';
import CustomEdge from './CustomEdge';
import SelectFunction from './SelectFunction';
import defaultFunctions from '../../spec/functions';
import 'reactflow/dist/style.css';

const nodeTypes = {
    split: SplitNode,
    calculation: CalculationNode,
    compare: CalculationNode,
    bitOperation: CalculationNode,
    stringOperation: CalculationNode,
    typeConversion: CalculationNode,
    branch: BranchNode,
    errorHandling: CalculationNode,
    assemble: AssembleNode,
};
const edgeTypes = { custom: CustomEdge };

function Editor({ selected, setSelected }) {
    const contextMenuRef = useRef(null);
    const onNodesChange = useCallback(
        (changes) => {
            if(changes.length === 1 && changes[0].type === "position" && changes[0].dragging){
                const {x,y} = changes[0].position;
                changes[0].position = {x:Math.round(x/50)*50,y:Math.round(y/20)*20};
            }
            setSelected((slt) => ({...slt,nodes:applyNodeChanges(changes, slt.nodes)}))
        },
        [selected]
    );
    const onEdgesChange = useCallback(
        (changes) => setSelected((slt) => ({...slt,edges:applyEdgeChanges(changes, slt.edges)})),
        [selected]
    );
    const isValidConnection = useCallback(
        (edge) => {
            if(selected.edges.find(e=>(e.target == edge.target && e.targetHandle == edge.targetHandle)))
                return false;
            const target = selected.nodes.find(e=>e.id==edge.target);
            if(target.type==="assemble")
                return true;

            const source = selected.nodes.find(e=>e.id==edge.source);
            const inputType = source.data.output[Number(edge.sourceHandle?.slice(1)??0)];
            const possibleInputs = defaultFunctions[target.data.name].input;
            const inputIndex = Number(edge.targetHandle?.slice(1)??0);
            const currentInput = target.data.input;
            const newInput = [...currentInput];
            newInput[inputIndex] = inputType;
            if(possibleInputs.find(e=>e.every((v,i)=>v===newInput[i]||newInput[i]===null)))
                return true;
            return false;
        },
        [selected]
    );
    const onConnect = useCallback(
        (connection) => setSelected((slt) => {
            const target = selected.nodes.find(e=>e.id==connection.target);
            const source = selected.nodes.find(e=>e.id==connection.source);
            const inputType = source.data.output[Number(connection.sourceHandle?.slice(1)??0)];
            const {input : possibleInputs ,output : possibleOutputs} = defaultFunctions[target.data.name];
            const inputIndex = Number(connection.targetHandle?.slice(1)??0);
            const currentInput = target.data.input;
            const newInput = [...currentInput];
            newInput[inputIndex] = inputType;
            if(target.type==="assemble")
                return {
                    ...slt,
                    edges:[
                        ... slt.edges,
                        {
                            ...connection,
                            id: `edge-${connection.source}${connection.sourceHandle??""}-${connection.target}${connection.targetHandle??""}`,
                            data: {type: slt.nodes.find(e=>e.id==connection.source).data.output[Number(connection.sourceHandle?.slice(1)??0)]},
                        }
                    ],
                    nodes: slt.nodes.map((node) => {
                        if(node.id === connection.target){
                            return {...node,data:{...node.data,input:newInput}};
                        }
                        return node;
                    })
                }
            const newOutput = [...target.data.output];
            const outputIndex = possibleInputs.findIndex(e=>e.every((v,i)=>v===newInput[i]));
            if(outputIndex>=0)
                newOutput = [possibleOutputs[outputIndex]];
            console.log(newInput,newOutput);
            return {
                ...slt,
                edges:[
                    ... slt.edges,
                    {
                        ...connection,
                        id: `edge-${connection.source}${connection.sourceHandle??""}-${connection.target}${connection.targetHandle??""}`,
                        data: {type: slt.nodes.find(e=>e.id==connection.source).data.output[Number(connection.sourceHandle?.slice(1)??0)]},
                    }
                ],
                nodes: slt.nodes.map((node) => {
                    if(node.id === connection.target){
                        return {...node,data:{...node.data,input:newInput,output:newOutput}};
                    }
                    return node;
                })
            }
        }),
        [selected]
    );

    if(!selected) return (<div style={{flexGrow:1,padding:"30px"}}>왼쪽에서 편집할 함수나 타입을 선택해주세요</div>);

    const onContextMenu = (e) => {
        e.preventDefault();
        contextMenuRef.current.style.display = "flex";
        contextMenuRef.current.style.left = e.clientX + "px";
        contextMenuRef.current.style.top = e.clientY + "px";
    }

    const nodes = selected.nodes.map((node) => ({
        ...node,
        data: {
            ...node.data,
            setSelected: setSelected,
            selected: selected,
        }
    }));

    const edges = selected.edges.map((edge) => ({
        ...edge,
        data:{
            ...edge.data,
            setSelected: setSelected,
            selected: selected,
        }
    }));

    return (
        <div style={{flexGrow:1}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                isValidConnection={isValidConnection}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={{
                    type: "custom"
                }}
                onContextMenu={onContextMenu}
                onClick={(e)=>{contextMenuRef.current.style.display = "none";}}
            />
            <SelectFunction setSelected={setSelected} contextMenuRef={contextMenuRef}/>
        </div>
    );
}

export default Editor;
