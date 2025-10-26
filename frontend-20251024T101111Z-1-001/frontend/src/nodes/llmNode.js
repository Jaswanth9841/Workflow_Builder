// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputs={[
        { id: `${id}-system`, top: '33%' },
        { id: `${id}-prompt`, top: '66%' }
      ]}
      outputs={[{ id: `${id}-response` }]}
      style={{ background: 'linear-gradient(135deg, #4facfe 70%, #00f2fe 100%)' }}
    >
      <div className="text-center p-2 bg-blue-200/90 rounded-md">
        <div className="text-xs mb-1 text-black">
          🤖 Language Model
        </div>
        <div className="text-[10px] opacity-80 text-black">
          System • Prompt → Response
        </div>
      </div>
    </BaseNode>
  );
}
