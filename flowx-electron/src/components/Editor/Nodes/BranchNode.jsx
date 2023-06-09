/** @format */

import React from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { setSelectedFunction } from '../../../utils/file';
import {
  NodeWrapper,
  IOWrapper,
  IOHandle,
} from "./FunctionNode";

function TurnSquare({ locRight, ...restProps }) {
  // console.log('locRight: ', locRight)
  return (
    <div {...restProps} style={{ background: "#fff" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#00cf00"
        className="h-4 w-4"
        style={{
          cursor: "pointer",
          position: "absolute",
          right: locRight && "-5px",
          bottom: "-7px",
          left: !locRight && "-5px",
        }}
      >
        {locRight ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
          />
        )}
      </svg>
    </div>
  );
}

/**
 * 옆구리에다가 data.locRight를 기준으로 간선들을 만들것이다.
 */
const BranchNode = ({ id, data }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  return (
    <NodeWrapper id={id} selectedFunction={data.selectedFunction} file={data.file} setFile={data.setFile}>
      <IOWrapper>
        <IOHandle
          type="target"
          position={Position.Top}
          id="i0"
          isConnectable={true}
          text={data.input[0]}
        />
      </IOWrapper>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexGrow: "1",
        }}
      >
        {!data?.locRight && (
          <IOWrapper direction="column">
            {
              new Array(data.input.length-1).fill(0).map((_, i) => (
                <IOHandle
                  type="target"
                  position={Position.Left}
                  id={`i${i+1}`}
                  isConnectable={true}
                  text={data.input[i+1]}
                  key={i+1}
                />
              ))
            }
          </IOWrapper>
        )}

        <div
          style={{
            flexGrow: "1",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {data.name}
        </div>

        {data?.locRight && (
          <IOWrapper direction="column">
            <IOHandle
              type="target"
              position={Position.Right}
              id="i1"
              isConnectable={true}
              text={data.input[1]}
              loc={data?.locRight}
            />
            <IOHandle
              type="target"
              position={Position.Right}
              id="i2"
              isConnectable={true}
              text={data.input[2]}
              loc={data?.locRight}
            />
          </IOWrapper>
        )}
      </div>

      {/* 가로축으로 정렬되어야 한다. */}
      <IOWrapper>
        <IOHandle
          type="source"
          position={Position.Bottom}
          isConnectable={!!data.output[0]}
          text={data.output[0]}
        />
      </IOWrapper>

      <TurnSquare
        locRight={!!data?.locRight}
        onClick={(e) =>{
          setSelectedFunction(
            data.setFile,
            data.selectedFunction,
            (slt) => {
            const connectedNode = slt.nodes.find(
              (e) => e.id === id
            );
            console.log("selected");
            return {
              ...slt,
              nodes: [
                ...slt.nodes.filter((node) => node.id !== id),
                {
                  ...connectedNode,
                  data: {
                    ...connectedNode.data,
                    locRight: !!!connectedNode.data?.locRight,
                  },
                },
              ],
            };
          })
          updateNodeInternals(id);
        }}
      />
    </NodeWrapper>
  );
};

export default BranchNode;