// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputs={[{ id: `${id}-value` }]}
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      headerTextColor="text-white"
    >
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold">Name:</span>
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="px-2 py-1.5 rounded-md border border-white/30 bg-white/90 text-xs text-gray-800"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold">Type:</span>
          <select 
            value={inputType} 
            onChange={handleTypeChange}
            className="px-2 py-1.5 rounded-md border border-white/30 bg-white/90 text-xs text-gray-800"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
