import { useRef, useState, useEffect, useCallback } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import FunctionNode from './FunctionNode';
import 'reactflow/dist/style.css';

const nodeTypes = { function: FunctionNode };

function Editor({ selected, setSelected }) {
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
        (connection) => setSelected((slt) => ({...slt,edges:addEdge(connection, slt.edges)})),
        [selected]
    );

    if(!selected) return (<div style={{flexGrow:1}}>왼쪽에서 편집할 함수나 타입을 선택해주세요</div>);

    return (
        <div style={{flexGrow:1}}>
            <ReactFlow
                nodes={selected.nodes}
                edges={selected.edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={{
                    type: "smoothstep"
                }}
            />
        </div>
    );
}

export default Editor;
