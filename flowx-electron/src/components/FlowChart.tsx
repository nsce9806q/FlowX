import React, { useCallback } from "react";

import ReactFlow, {
    addEdge,
    useEdgesState,
    useNodesState,
    MiniMap,
    Controls,
    Background,
    BackgroundVariant,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    {
        id: "2",
        position: { x: 0, y: 100 },
        data: { label: "2" },
    },
];
const initialEdges: any = [];

const FlowChart = () => {
    const [nodes, setNodes, onNodesChange] =
        useNodesState(initialNodes);

    const [edges, setEdges, onEdgesChange] =
        useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div className="w-screen h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <MiniMap />
                <Background
                    variant={"dots" as BackgroundVariant}
                    gap={12}
                    size={1}
                />
            </ReactFlow>
        </div>
    );
};

export default FlowChart;
