/** @format */

import { Position } from "reactflow";
import {
  NodeWrapper,
  IOWrapper,
  IOHandle,
} from "./FunctionNode";

import { Handle, getConnectedEdges } from "reactflow";

function ConstantNode({ id, data }) {
  return (
    <div
      style={{
        backgroundColor: "red",
        borderRadius: "50%",
        width: "80px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        type="text"
        value={data.label}
        onChange={(e) => data.onChange(e.target.value)}
        style={{ width: "70%", textAlign: "center" }}
      />
      <Handle
        type="target"
        position="left"
        id="b"
        style={{ top: "50%", background: "#555" }}
      />
    </div>
  );
}

export default ConstantNode;
