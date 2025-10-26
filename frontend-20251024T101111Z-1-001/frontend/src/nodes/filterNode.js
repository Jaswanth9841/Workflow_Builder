// filterNode.js - Conditional filtering node

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  const handleValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputs={[{ id: `${id}-input` }]}
      outputs={[
        { id: `${id}-pass`, top: '33%' },
        { id: `${id}-fail`, top: '66%' }
      ]}
      style={{ background: 'linear-gradient(140deg, #ff9a9e 80%, #fecfef 100%)' }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-center text-xs mb-1 text-black">
          🔍 Conditional Filter
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-black">Condition:</span>
          <select 
            value={condition} 
            onChange={handleConditionChange}
            className="px-2 py-1.5 rounded-md border border-white/30 bg-white/90 text-xs text-black"
          >
            <option value="contains">Contains</option>
            <option value="equals">Equals</option>
            <option value="greater">Greater Than</option>
            <option value="less">Less Than</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-black">Value:</span>
          <input 
            type="text" 
            value={filterValue} 
            onChange={handleValueChange}
            placeholder="Filter value..."
            className="px-2 py-1.5 rounded-md border border-white/30 bg-white/90 text-xs text-black"
          />
        </label>
      </div>
    </BaseNode>
  );
};


