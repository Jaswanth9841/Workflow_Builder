// textNode.js

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.reactFlowStore) {
      const { onNodesChange } = window.reactFlowStore.getState();
      onNodesChange([{ type: 'remove', id }]);
    }
  };

  // Extract variables from text (e.g., {{variableName}})
  useEffect(() => {
    const regex = /\{\{(\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*)\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const extractedVars = matches.map(match => match[1].trim());
    // Remove duplicates
    const uniqueVars = [...new Set(extractedVars)];
    
    // Clean up edges for removed variables
    if (window.reactFlowStore && variables.length > 0) {
      const removedVars = variables.filter(v => !uniqueVars.includes(v));
      if (removedVars.length > 0) {
        const { edges, onEdgesChange } = window.reactFlowStore.getState();
        const edgesToRemove = edges
          .filter(edge => {
            // Remove edges connected to deleted variable handles
            return removedVars.some(varName => edge.target === id && edge.targetHandle === `${id}-${varName}`);
          })
          .map(edge => ({ type: 'remove', id: edge.id }));
        
        if (edgesToRemove.length > 0) {
          onEdgesChange(edgesToRemove);
        }
      }
    }
    
    setVariables(uniqueVars);
  }, [currText, id, variables]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  // Measure content width/height using a hidden mirror with identical typography
  useLayoutEffect(() => {
    if (!mirrorRef.current) return;
    // Use a single space to avoid zero sizes when empty
    mirrorRef.current.textContent = currText || ' ';
    const measuredWidth = mirrorRef.current.scrollWidth;
    const measuredHeight = mirrorRef.current.scrollHeight;
    setContentSize({ width: measuredWidth, height: measuredHeight });
  }, [currText]);

  const handleTextChange = (e) => {
    let newText = e.target.value;
    
    // Automatically add space between adjacent variables
    // Finds patterns like {{var1}}{{var2}} and adds space: {{var1}} {{var2}}
    const adjacentVarsRegex = /\}\}\{\{/g;
    newText = newText.replace(adjacentVarsRegex, '}}&nbsp;<br />{{');
    
    setCurrText(newText);
  };

  // Calculate dynamic node dimensions
  const minWidth = 250;
  const minHeight = 100;
  const baseMaxWidth = 550;
  const horizontalPadding = 60; // container + inner paddings
  const verticalExtra = 95; // header + labels + inner paddings

  // Calculate base width and height
  let baseWidth = Math.max(
    minWidth,
    Math.min(baseMaxWidth, (contentSize.width || minWidth) + horizontalPadding)
  );
  let baseHeight = Math.max(
    minHeight,
    (contentSize.height || 0) + verticalExtra
  );

  // Responsive sizing: if height grows significantly, expand width to reduce wrapping
  // This creates a balanced aspect ratio - avoid tall and narrow nodes
  let dynamicMaxWidth = baseMaxWidth;
  const heightRatio = baseHeight / minHeight;
  
  if (heightRatio > 1.5) {
    // Content is getting very tall, expand width to reduce vertical growth
    dynamicMaxWidth = Math.min(700, baseMaxWidth + (heightRatio - 1) * 100);
  }

  // Recalculate width with dynamic maxWidth
  const dynamicWidth = Math.max(
    minWidth,
    Math.min(dynamicMaxWidth, (contentSize.width || minWidth) + horizontalPadding)
  );
  
  const dynamicHeight = baseHeight;

  return (
    <div 
      className="bg-gradient-teal border-2 border-purple-darker rounded-xl p-3 shadow-md font-sans relative"
      style={{
        width: dynamicWidth,
        minHeight: dynamicHeight,
        maxWidth: dynamicMaxWidth,
        display: 'flex',
        flexDirection: 'column',
      }}>
      {/* Hover zone for delete button - invisible area covering header and top-right corner */}
      <div 
        className="absolute top-0 left-0 right-0 h-12 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: 1 }}
      />
      
      {/* Delete button - shows on hover */}
      {isHovered && (
        <button
          onClick={handleDelete}
          className="delete-node-button"
          onMouseEnter={() => setIsHovered(true)}
          title="Delete node"
        >
          ✕
        </button>
      )}
      {/* Dynamic input handles for each variable */}
      {variables.map((variable, index) => {
        const topPosition = `${((index + 1) * 100) / (variables.length + 1)}%`;
        return (
          <React.Fragment key={`var-${variable}`}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${variable}`}
              style={{
                top: topPosition,
                background: '#48bb78',
                width: '12px',
                height: '12px',
                border: '2px solid #ffffff',
                zIndex: 100
              }}
            />
           
          </React.Fragment>
        );
      })}
      
      {/* Node header */}
      <div 
        className="text-sm font-bold mb-2 text-center uppercase tracking-wide text-gray-800 relative" 
        style={{textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)', zIndex: 2, pointerEvents: 'none'}}
      >
        Text
      </div>
      
      {/* Node body */}
      <div className="bg-white/70 rounded-lg p-2 backdrop-blur-md flex-1 flex flex-col">
        <label className="flex flex-col gap-1 flex-1">
          <span className="text-[11px] font-semibold text-gray-800">
            Text:
          </span>
          <textarea
            ref={textareaRef}
            value={currText} 
            onChange={handleTextChange}
            className="px-2 py-2 rounded-md border border-gray-300 bg-white text-xs text-gray-800 font-mono resize-none min-h-[40px] w-full"
            style={{
              overflow: 'auto',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
            placeholder="Enter text with {{variables}}..."
          />
        </label>
        
        {/* Display detected variables */}
        {variables.length > 0 && (
          <div className="mt-2 text-[10px] text-gray-600 bg-blue-400/10 px-1.5 py-1.5 rounded border border-dashed border-blue-400"
            style={{
              wordBreak: 'break-all',
              overflowWrap: 'break-word',
              maxWidth: '100%',
            }}
          >
            <strong>Variables:</strong> {variables.join(', ')}
          </div>
        )}
      </div>
      
      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        isConnectable={true}
        style={{
          background: '#4299e1',
          width: '12px',
          height: '12px',
          border: '2px solid #ffffff'
        }}
      />
      {/* Hidden mirror used for precise measurement of textarea content */}
      <div
        ref={mirrorRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: '-10000px',
          left: '-10000px',
          visibility: 'hidden',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '0.75rem', // text-xs
          lineHeight: '1rem',
          padding: '8px 10px', // matches px-2 py-2
          maxWidth: `${dynamicMaxWidth - horizontalPadding}px`,
        }}
      />
    </div>
  );
}
