// databaseNode.js - Database operations node

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'SELECT');
  const [table, setTable] = useState(data?.table || '');

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handleTableChange = (e) => {
    setTable(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Database"
      inputs={[
        { id: `${id}-query`, top: '33%' },
        { id: `${id}-data`, top: '66%' }
      ]}
      outputs={[{ id: `${id}-result` }]}
      style={{ background: 'linear-gradient(135deg,rgb(201, 125, 180) 100%, #fef9d7 100%)' }}
    >
      <div className="flex flex-col gap-2">
        <div className="text-center text-xs mb-1 text-black">
          🗄️ Database Op
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-black">Operation:</span>
          <select 
            value={operation} 
            onChange={handleOperationChange}
            className="px-2 py-1.5 rounded-md border border-white/30 bg-white/90 text-xs text-black"
          >
            <option value="SELECT">SELECT</option>
            <option value="INSERT">INSERT</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-black">Table:</span>
          <input 
            type="text" 
            value={table} 
            onChange={handleTableChange}
            placeholder="table_name"
            className="px-2 py-1.5 rounded-md border border-white/30 bg-white/90 text-xs text-black"
          />
        </label>
      </div>
    </BaseNode>
  );
};


