import { useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import styled from 'styled-components';

const EdgeWrapper = styled.g`
    path {
        stroke: ${(props) => (props.isHovered ? '#000000' : '#b1b1b7')};
        stroke-width: 2px;
        position: absolute;
        z-index: ${(props) => (props.isHovered ? 1000 : 1)};
    }
    &:hover {
        path {
            stroke: #000000;
            stroke-width: 2px;
            z-index: 1000;
        }
    }
`;

export default function CustomEdge({ id, data, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd }) {
    const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const onEdgeClick = (e) => {
        data.setSelected((prev) => ({
            ...prev,
            edges: prev.edges.filter((edge) => edge.id !== id)
        }));
    };

    return (
        <EdgeWrapper isHovered={isHovered}>
            <BaseEdge path={edgePath} markerEnd={markerEnd} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${targetX}px,${targetY}px)`,
                        fontSize: 12,
                        pointerEvents: 'all',
                        zIndex: 10000,
                        background: 'white',
                        borderRadius: '100%',
                        border: '1px solid #da0000',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#da0000',
                        fontWeight: 'bold',
                    }}
                    className="nodrag nopan"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button className="edgebutton" onClick={onEdgeClick}>
                        ×
                    </button>
                </div>
            </EdgeLabelRenderer>
        </EdgeWrapper>
    );
}