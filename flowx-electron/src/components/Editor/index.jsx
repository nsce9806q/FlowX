import { useRef, useState, useEffect, useCallback } from 'react';
import ReactFlow, { Panel, applyEdgeChanges, applyNodeChanges } from 'reactflow';
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

function Editor({ selectedFunction, file, setFile }) {
    const contextMenuRef = useRef(null);
    const onNodesChange = useCallback(
        (changes) => {
            if(changes.length === 1 && changes[0].type === "position" && changes[0].dragging){
                const {x,y} = changes[0].position;
                changes[0].position = {x:Math.round(x/50)*50,y:Math.round(y/20)*20};
            }
            setFile((pre) => ({
                ...pre,
                functions: pre.functions.map((func) => {
                    if(func.name === selectedFunction){
                        return {
                            ...func,
                            nodes: applyNodeChanges(changes, func.nodes)
                        }
                    }
                    return func;
                })
            }));
        },
        [file]
    );
    const onEdgesChange = useCallback(
        (changes) => setFile((pre) => ({
            ...pre,
            functions: pre.functions.map((func) => {
                if(func.name === selectedFunction){
                    return {
                        ...func,
                        edges: applyEdgeChanges(changes, func.edges)
                    }
                }
                return func;
            })
        })),
        [file]
    );
    const isValidConnection = useCallback(
        (edge) => {
            const selected = file.functions.find(e=>e.name===selectedFunction);
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
        [file]
    );
    const onConnect = useCallback(
        (connection) => {
            const selected = file.functions.find(e=>e.name===selectedFunction);
            const target = selected.nodes.find(e=>e.id==connection.target);
            const source = selected.nodes.find(e=>e.id==connection.source);
            const inputType = source.data.output[Number(connection.sourceHandle?.slice(1)??0)];
            const inputIndex = Number(connection.targetHandle?.slice(1)??0);
            const currentInput = target.data.input;
            const newInput = [...currentInput];
            newInput[inputIndex] = inputType;
            console.log(target.type,target.type==="assemble");
            if(target.type==="assemble")
                return setFile((pre) => ({
                    ...pre,
                    functions: pre.functions.map((func) => {
                        if(func.name === selectedFunction){
                            return {
                                ...func,
                                edges:[
                                    ... func.edges,
                                    {
                                        ...connection,
                                        id: `edge-${connection.source}${connection.sourceHandle??""}-${connection.target}${connection.targetHandle??""}`,
                                        data: {type: selected.nodes.find(e=>e.id==connection.source).data.output[Number(connection.sourceHandle?.slice(1)??0)]},
                                    }
                                ],
                                nodes: func.nodes.map((node) => {
                                    if(node.id === connection.target){
                                        return {...node,data:{...node.data,input:newInput}};
                                    }
                                    return node;
                                })
                            }
                        }
                        return func;
                    })
                }));
            const {input : possibleInputs ,output : possibleOutputs} = defaultFunctions[target.data.name];
            const newOutput = [...target.data.output];
            const outputIndex = possibleInputs.findIndex(e=>e.every((v,i)=>v===newInput[i]));
            if(outputIndex>=0)
                newOutput[0] = possibleOutputs[outputIndex];
            
            setFile((pre) => ({
                ...pre,
                functions: pre.functions.map((func) => {
                    if(func.name === selectedFunction){
                        return {
                            ...func,
                            edges:[
                                ... func.edges,
                                {
                                    ...connection,
                                    id: `edge-${connection.source}${connection.sourceHandle??""}-${connection.target}${connection.targetHandle??""}`,
                                    data: {type: selected.nodes.find(e=>e.id==connection.source).data.output[Number(connection.sourceHandle?.slice(1)??0)]},
                                }
                            ],
                            nodes: func.nodes.map((node) => {
                                if(node.id === connection.target){
                                    return {...node,data:{...node.data,input:newInput,output:newOutput}};
                                }
                                return node;
                            })
                        }
                    }
                    return func;
                })
            }));
        },
        [file, setFile]
    );

    if(!selectedFunction) return (<div style={{flexGrow:1,padding:"30px"}}>왼쪽에서 편집할 함수나 타입을 선택해주세요</div>);

    const onContextMenu = (e) => {
        e.preventDefault();
        contextMenuRef.current.style.display = "flex";
        contextMenuRef.current.style.left = e.clientX + "px";
        contextMenuRef.current.style.top = e.clientY + "px";
    }

    const selected = file.functions.find(e=>e.name===selectedFunction);
    const nodes = selected.nodes.map((node) => ({
        ...node,
        data: {
            ...node.data,
            file: file,
            setFile: setFile,
            selectedFunction: selectedFunction,
        }
    }));

    const edges = selected.edges.map((edge) => ({
        ...edge,
        data:{
            ...edge.data,
            file: file,
            setFile: setFile,
            selectedFunction: selectedFunction,
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
            >
                <Panel position="top-left">{selected.name}</Panel>
            </ReactFlow>
            <SelectFunction selectedFunction={selectedFunction} file={file} setFile={setFile} contextMenuRef={contextMenuRef}/>
        </div>
    );
}

export default Editor;