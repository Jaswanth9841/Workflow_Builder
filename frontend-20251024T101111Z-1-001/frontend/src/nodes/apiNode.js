// apiNode.js - API integration node

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [endpoint, setEndpoint] = useState(data?.endpoint || '');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleEndpointChange = (e) => {
    setEndpoint(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="API"
      inputs={[
        { id: `${id}-params`, top: '33%' },
        { id: `${id}-body`, top: '66%' }
      ]}
      outputs={[{ id: `${id}-response` }]}
      style={{ background: 'linear-gradient(135deg,rgb(98, 126, 170) 70%, #c2e9fb 100%)' }}
      headerTextColor="text-white"
    >
      <div className="flex flex-col gap-2">
        <div className="text-center text-xs mb-1">
          🌐 API Call
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold">Method:</span>
          <select 
            value={method} 
            onChange={handleMethodChange}
            className="px-2 py-1.5 rounded-md border border-white/30 bg-white/90 text-xs text-gray-800"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold">Endpoint:</span>
          <input 
            type="text" 
            value={endpoint} 
            onChange={handleEndpointChange}
            placeholder="/api/endpoint"
            className="px-2 py-1.5 rounded-md border border-white/30 bg-white/90 text-xs text-gray-800"
          />
        </label>
      </div>
    </BaseNode>
  );
};


