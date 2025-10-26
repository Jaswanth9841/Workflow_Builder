// customEdge.js - Custom edge with delete button on hover

import { useState } from 'react';
import { getBezierPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    evt.preventDefault();
    // Get the store to delete the edge
    const { onEdgesChange } = window.reactFlowStore.getState();
    onEdgesChange([{ type: 'remove', id }]);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{
          ...style,
          strokeWidth: isHovered ? 4 : 3,
          stroke: isHovered ? '#667eea' : '#2d3748',
        }}
      />
      {/* Invisible wider path for easier hover detection */}
      <path
        id={`${id}-hitbox`}
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={30}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
      />
      <EdgeLabelRenderer>
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            className="nodrag nopan pointer-events-auto p-2.5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={(event) => onEdgeClick(event, id)}
              onMouseDown={(e) => e.stopPropagation()}
              title="Delete connection"
              className="w-7 h-7 bg-red-500 border-2 border-white rounded-full cursor-pointer flex items-center justify-center text-white text-base font-bold shadow-lg transition-all duration-150 outline-none hover:bg-red-600 hover:scale-110 hover:shadow-xl"
            >
              ✕
            </button>
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
};

