// transformNode.js - Data transformation node

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
      style={{ background: 'linear-gradient(135deg,rgb(248, 152, 78) 70%, #fcb69f 100%)' }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-center text-xs mb-1">
          ⚡ Data Transformation
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold">Operation:</span>
          <select 
            value={operation} 
            onChange={handleOperationChange}
            className="px-2 py-1.5 rounded-md border border-white/30 bg-white/90 text-xs text-gray-800"
          >
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="trim">Trim</option>
            <option value="reverse">Reverse</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};


