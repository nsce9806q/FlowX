import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import ReactFlow, { Panel, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import CalculationNode from './Nodes/CalculationNode';
import SplitNode from './Nodes/SplitNode';
import AssembleNode from './Nodes/AssembleNode';
import BranchNode from './Nodes/BranchNode';
import ConstantNode from './Nodes/ConstantNode'
import CustomEdge from './CustomEdge';
import AditionalEdge from './AdditionalEdge'
import SelectFunction from './SelectFunction';
import defaultFunctions from '../../spec/functions';
import 'reactflow/dist/style.css';

/**
 * @param {Object} props - Props for the component.
 * @param {{nodes: Array<{data: Object, dragging: boolean, height: int, id: string, position: Object, selected: boolean, type: string, width: int}>,
 *  edges: Array, input: string, name: string,
 *  output: string, type: string}} props.selected - Selected node information.
 * @param {Function} props.setSelected - Function to set the selected node.
 */
function Editor({ selectedFunction, file, setFile }) {
    const nodeTypes = useMemo(() => ({
        split: SplitNode,
        calculation: CalculationNode,
        compare: CalculationNode,
        bitOperation: CalculationNode,
        stringOperation: CalculationNode,
        typeConversion: CalculationNode,
        branch: BranchNode,
        errorHandling: CalculationNode,
        assemble: AssembleNode,
        constant: ConstantNode,
    }), []);

    const edgeTypes = { custom: CustomEdge, additional: AditionalEdge };
    const contextMenuRef = useRef(null);
    const onNodesChange = useCallback(
        (changes) => {
            if(changes.length === 1 && changes[0].type === "position" && changes[0].dragging){
                const {x, y} = changes[0].position;
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

    // valid한 연결인지 확인하는 함수
    /**
     * onConnect콜백이 실행되고 나서 유효한 간선정보인지 판단.
     */
    const isValidConnection = useCallback(
        (edge) => {
            // 같은 에지가 있으면 이를 추가해서는 안된다.
            const selected = file.functions.find(e=>e.name===selectedFunction);
            if(selected.edges.find(e=>(e.target == edge.target && e.targetHandle == edge.targetHandle)))
                return false;
            
            // 타겟 노드를 찾는다.
            const target = selected.nodes.find(e=>e.id == edge.target);
            if(target.type==="assemble")
                return true;
            
            // 소스 노드를 찾는다.
            const source = selected.nodes.find(e=>e.id==edge.source);
            
            // 인풋 타입은 source.data.output[]에 edges.sourceHandle("o1") 이런거 있으면 slice로 1만 취해온다. null이면 0
            const inputType = source.data.output[Number(edge.sourceHandle?.slice(1)??0)];

            // 함수 타입을 가져온다. defaultFunctions["add"].input
            const possibleInputs = defaultFunctions[target.data.name].input;

            // edge.targetHandle에서 edge.targetHandle을 참조해서 input에서 몇번째인지 가져옴
            const inputIndex = Number(edge.targetHandle?.slice(1)??0);
            const currentInput = target.data.input;
            const newInput = [...currentInput];
            newInput[inputIndex] = inputType;

            /**
             * newInput = ["int", null, "int"]
             * possibleInputs = [["float", "float"], ["int", "int"]]
             * 이런 상황에서 possibleInputs를 순회하면서 만족하는지 찾는다.
             */
            if(possibleInputs.find(e => (e.every((v,i) => v === newInput[i] || newInput[i] == null))))
                return true;
            return false;
        },
        [file]
    );

    // 간선을 연결할 때 쓰이는 함수
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

    // 우클릭했을 때 component를 보이게 한다.
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
            {/* 우클릭 메뉴 컴포넌트 */}
            <SelectFunction selectedFunction={selectedFunction} file={file} setFile={setFile} contextMenuRef={contextMenuRef}/>
        </div>
    );
}

export default Editor;