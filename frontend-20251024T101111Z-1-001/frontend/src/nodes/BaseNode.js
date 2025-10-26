// BaseNode.js - Abstract base component for all nodes

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A flexible, reusable node component that reduces code duplication
 * @param {Object} props
 * @param {string} props.id - Node ID
 * @param {Object} props.data - Node data
 * @param {string} props.title - Node title/label
 * @param {Array} props.inputs - Array of input handle configurations
 * @param {Array} props.outputs - Array of output handle configurations
 * @param {Function} props.children - Child content to render in the node body
 * @param {Object} props.style - Additional styles for the node container
 */
export const BaseNode = ({ 
  id, 
  data, 
  title, 
  inputs = [], 
  outputs = [], 
  children, 
  style = {},
  className = '',
  headerTextColor = 'text-black'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.reactFlowStore) {
      const { onNodesChange } = window.reactFlowStore.getState();
      onNodesChange([{ type: 'remove', id }]);
    }
  };

  return (
    <div 
      className={`base-node ${className} min-w-[200px] min-h-[80px] bg-gradient-purple border-2 border-purple-darker rounded-xl p-3 shadow-md text-white font-sans relative`}
      style={style}
    >
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
      {/* Render input handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${input.id || index}`}
          type="target"
          position={input.position || Position.Left}
          id={input.id || `${id}-input-${index}`}
          style={{
            top: input.top || `${((index + 1) * 100) / (inputs.length + 1)}%`,
            background: '#48bb78',
            width: '12px',
            height: '12px',
            border: '2px solid #ffffff',
            ...input.style
          }}
        />
      ))}
      
      {/* Node header */}
      <div 
        className={`text-sm font-bold mb-2 text-center uppercase tracking-wide ${headerTextColor} relative`}
        style={{textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)', zIndex: 2, pointerEvents: 'none'}}
      >
        {title}
      </div>
      
      {/* Node body - custom content */}
      <div className="text-[13px] bg-white/10 rounded-lg p-2 backdrop-blur-md">
        {children}
      </div>
      
      {/* Render output handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${output.id || index}`}
          type="source"
          position={output.position || Position.Right}
          id={output.id || `${id}-output-${index}`}
          style={{
            top: output.top || `${((index + 1) * 100) / (outputs.length + 1)}%`,
            background: '#4299e1',
            width: '12px',
            height: '12px',
            border: '2px solid #ffffff',
            ...output.style
          }}
        />
      ))}
    </div>
  );
};


