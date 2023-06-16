/** @format */

import { Handle, getConnectedEdges, Position } from "reactflow";
import styled, { css } from "styled-components";

const NW = styled.div`
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.padding &&
    css`
      padding: 0px 6px;
    `}/* ${(props) =>
    props.bigBox &&
    css`
      min-width: 160px;
      min-height: 100px;
    `} */
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

export const NodeWrapper = ({ children, id, file, setFile, selectedFunction }) => {
    return (
        <NW>
            <CloseSquare onClick={(e) => {
                e.stopPropagation();
                const connectedEdges = getConnectedEdges([file.functions.find(e=>e.name===selectedFunction).nodes.find(e=>e.id==id)], file.functions.find(e=>e.name===selectedFunction).edges);
                setFile((file) => ({
                    ...file,
                    functions: file.functions.map((func) => {
                        if (func.name === selectedFunction) {
                            return {
                                ...func,
                                nodes: func.nodes.filter((node) => node.id !== id),
                                edges: func.edges.filter((edge) => !connectedEdges.includes(edge))
                            }
                        }
                        return func;
                    })
                }))
            }} />
            {children}
        </NW>
    );
}

export const IOWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: space-around;
  font-size: 0.8rem;
  color: #888;
  gap: 8px;
`;

/**
 * foex: row가 되면,
 */
const IOHandleStyle = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.position === Position.Left ||
    props.position === Position.Right
      ? props.loc
        ? "row-reverse"
        : "row"
      : "column"};
  /* align-items: flex-start */
  justify-content: center
  flex-grow: 1
  gap: 8px
`;

export const IOHandle = ({
  type,
  position,
  id,
  isConnectable,
  text,
  events,
  style,
  loc,
}) => {
  return (
    <IOHandleStyle
      position={position}
      loc={loc}
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
          width: "9px",
          height: "9px",
          backgroundColor: !isConnectable ? "#da0000" : "#000",
        }}
      />
      {type === "target" && <div style={style}>{text}</div>}
    </IOHandleStyle>
  );
};
