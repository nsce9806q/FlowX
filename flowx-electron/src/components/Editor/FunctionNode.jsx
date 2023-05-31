import { Handle,getConnectedEdges } from 'reactflow';
import styled from 'styled-components';

const NW = styled.div`
    padding: 0 10px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    min-width: 100px;
    text-align: center;
`;

function CloseSquare(props) {
    return (
        <svg
            fontSize="inherit"
            style={{ 
                width: "14px",
                height: "14px",
                fill: "#D50000",
                cursor:"pointer",
                position:"absolute",
                top: "-5px",
                right: "-5px",
                background: "#fff",
            }}
            viewBox="0 0 24 24"
            {...props}
        >
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </svg>
    );
}

export const NodeWrapper = ({ children, id, setSelected }) => {
    return (
        <NW>
            <CloseSquare onClick={(e) => 
                setSelected((slt) => {
                    const connectedEdges = getConnectedEdges([slt.nodes.find(e=>e.id=id)], slt.edges);
                    console.log(slt.nodes.filter((node) =>{console.log( node.id, id); return node.id !== id}),slt.edges.filter((edge) => !connectedEdges.includes(edge)));
                    return { 
                        ...slt,
                        nodes: slt.nodes.filter((node) => node.id !== id),
                        edges: slt.edges.filter((edge) => !connectedEdges.includes(edge))
                    }
                })
            } />
            {children}
        </NW>
    );
}

export const IOWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 10px;
    align-items: center;
    position: relative;
    font-size: 0.8rem;
    color: #888;
`;

export const IOHandle = ({ type, position, id, isConnectable, text, events }) => {
    return (
        <div {...events}>
            {type === "source" && <div>
                {text}
            </div>}
            <Handle
                type={type}
                position={position}
                id={id}
                isConnectable={isConnectable}
                style={{ position: 'relative', zIndex: 10}}
            />
            {type === "target" && <div>
                {text}
            </div>}
        </div>
    );
}