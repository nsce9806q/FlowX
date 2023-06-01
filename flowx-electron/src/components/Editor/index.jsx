import { useRef, useState, useEffect, useCallback } from 'react';
import ReactFlow, { useReactFlow, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import CalculationNode from './CalculationNode';
import SplitNode from './SplitNode';
import AssembleNode from './AssembleNode';
import CustomEdge from './CustomEdge';
import SelectFunction from './SelectFunction';
import 'reactflow/dist/style.css';

const nodeTypes = { split: SplitNode, calculation: CalculationNode, assemble: AssembleNode };
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
    const onConnect = useCallback(
        (connection) => setSelected((slt) => ({
            ...slt,
            edges:[
                ... slt.edges,
                {
                    ...connection,
                    id: `edge-${connection.source}${connection.sourceHandle??""}-${connection.target}${connection.targetHandle??""}`,
                    data: {type: slt.nodes.find(e=>e.id==connection.source).data.output[Number(connection.sourceHandle?.slice(1)??0)]},
                }
            ]
        })),
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
