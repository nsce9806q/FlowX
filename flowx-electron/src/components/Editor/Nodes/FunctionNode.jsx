/** @format */

import { Handle, getConnectedEdges, Position } from "reactflow";
import styled, { css } from "styled-components";


const NW = styled.div`
  /* padding: 0 10px; */
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
        cursor: "pointer",
        position: "absolute",
        top: "-5px",
        right: "-5px",
        background: "#fff",
      }}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </svg>
  );
}



export const NodeWrapper = ({ children, id, setSelected }) => {
  return (
    <NW>
      <CloseSquare
        onClick={(e) =>
          setSelected((slt) => {
            const connectedEdges = getConnectedEdges(
              [slt.nodes.find((e) => e.id == id)],
              slt.edges
            );
            return {
              ...slt,
              nodes: slt.nodes.filter((node) => node.id !== id),
              edges: slt.edges.filter(
                (edge) => !connectedEdges.includes(edge)
              ),
            };
          })
        }
      />
  
      {children}
    </NW>
  );
};


export const IOWrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};  // Add this line
  justify-content: space-around;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
  gap: 8px;
`;

/**
 * foex: row가 되면, 
 */
const IOHandleStyle = styled.div`
  flex-direction: ${({ position }) =>
    position === Position.Left || position === Position.Right ? 'row' : 'column'};
  align-items: flex-start
  justify-content: center
`;

export const IOHandle = ({
  type,
  position,
  id,
  isConnectable,
  text,
  events,
  style,
}) => {
  return (
    <IOHandleStyle
      position={position}
      {...events}
      style={
        isConnectable
          ? {}
          : { cursor: "not-allowed", color: "#da0000" }
      }
    >
      {type === "source" && <div style={style}>{text}</div>}
      <Handle
        type={type}
        position={position}
        id={id}
        isConnectable={isConnectable}
        style={{
          position: "relative",
          zIndex: 10,
          width: "7px",
          height: "7px",
          backgroundColor: !isConnectable ? "#da0000" : "#000",
        }}
      />
      {type === "target" && <div style={style}>{text}</div>}
    </IOHandleStyle>
  );
};
