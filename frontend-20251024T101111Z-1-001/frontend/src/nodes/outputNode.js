// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputs={[{ id: `${id}-value` }]}
      style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
       headerTextColor="text-white"
    >
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-black">Name:</span>
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="px-2 py-1.5 rounded-md border border-white/30 bg-white/90 text-xs text-gray-800"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-black">Type:</span>
          <select 
            value={outputType} 
            onChange={handleTypeChange}
            className="px-2 py-1.5 rounded-md border border-white/30 bg-white/90 text-xs text-gray-800"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
