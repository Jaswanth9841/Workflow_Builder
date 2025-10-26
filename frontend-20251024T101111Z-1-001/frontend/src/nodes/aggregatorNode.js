// aggregatorNode.js - Data aggregation node

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const AggregatorNode = ({ id, data }) => {
  const [aggregateType, setAggregateType] = useState(data?.aggregateType || 'merge');

  const handleTypeChange = (e) => {
    setAggregateType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Aggregator"
      inputs={[
        { id: `${id}-input1`, top: '25%' },
        { id: `${id}-input2`, top: '50%' },
        { id: `${id}-input3`, top: '75%' }
      ]}
      outputs={[{ id: `${id}-output` }]}
      style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-center text-xs mb-1 text-black">
          📊 Aggregate Data
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-black">Type:</span>
          <select 
            value={aggregateType} 
            onChange={handleTypeChange}
            className="px-2 py-1.5 rounded-md border border-white/30 bg-white/90 text-xs text-black"
          >
            <option value="merge">Merge</option>
            <option value="concat">Concatenate</option>
            <option value="sum">Sum</option>
            <option value="average">Average</option>
            <option value="join">Join</option>
          </select>
        </label>
        <div className="text-[10px] text-black bg-white/90 px-1.5 py-1.5 rounded text-center">
          Combines multiple inputs
        </div>
      </div>
    </BaseNode>
  );
};


