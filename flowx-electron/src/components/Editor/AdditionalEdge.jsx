import React from "react";
import { getBezierPath, getMarkerEnd } from "reactflow";

const AdditionalEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  arrowHeadType,
  markerEndId,
}) => {
  const path = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  let color = "black";
  if (typeof data.type === "number") color = "blue";
  else if (typeof data.type === "string") color = "green";
  else if (typeof data.type === "boolean") color = "red";

  return (
    <g>
      <path
        id="reactflow__edge-path"
        stroke={color}
        className="reactflow__edge-path"
        d={path}
      />
      <path
        style={{ animation: "dash 2s linear infinite" }}
        stroke={color}
        className="animated-edge"
        d={path}
        markerEnd={getMarkerEnd(arrowHeadType, markerEndId)}
      />
    </g>
  );
}

export default AdditionalEdge;
