import React from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';

export const Canvas = React.memo(({
  reactFlowWrapper,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onDrop,
  onDragOver,
  onInit,
  nodeTypes,
  edgeTypes,
  gridSize,
  showMinimap,
}) => {
  const proOptions = { hideAttribution: true };

  const isValidConnection = React.useCallback((connection) => {
    return true;
  }, []);

  return (
    <div ref={reactFlowWrapper} className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg m-4 ml-0 overflow-hidden border border-gray-200 dark:border-gray-700 relative transition-colors duration-300">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={onInit}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        snapToGrid={true}
        connectionLineType='smoothstep'
        connectionLineStyle={{ stroke: '#667eea', strokeWidth: 3 }}
        translateExtent={[[-1000, -1000], [3000, 3000]]}
        nodeExtent={[[-1000, -1000], [3000, 3000]]}
        minZoom={0.2}
        maxZoom={4}
        defaultViewport={{ x: 100, y: 100, zoom: 1 }}
        fitView={false}
        preventScrolling={false}
        selectNodesOnDrag={false}
        panOnDrag={true}
        panOnScroll={false}
        zoomOnScroll={true}
        elevateNodesOnSelect={true}
        connectionMode="loose"
        isValidConnection={isValidConnection}
      >
        <Background 
          color="gray" 
          gap={gridSize}
          size={2}
        />
        <Controls 
          position="top-left"
          style={{
            button: {
              background: '#667eea',
              border: 'none',
              borderBottom: '2px solid #5a67d8'
            }
          }} 
        />
        {showMinimap && (
          <MiniMap 
            nodeColor={(node) => {
              switch (node.type) {
                case 'customInput':
                  return '#667eea';
                case 'customOutput':
                  return '#f56565';
                case 'llm':
                  return '#48bb78';
                case 'text':
                  return '#4299e1';
                case 'transform':
                  return '#f6ad55';
                case 'filter':
                  return '#9f7aea';
                case 'api':
                  return '#ed8936';
                case 'database':
                  return '#38b2ac';
                case 'aggregator':
                  return '#ed64a6';
                default:
                  return '#a0aec0';
              }
            }}
            nodeStrokeWidth={3}
            nodeBorderRadius={8}
            style={{
              background: '#ffffff',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
            }}
            className="dark:!bg-gray-700 dark:!border-gray-600"
            position="bottom-right"
          />
        )}
      </ReactFlow>
    </div>
  );
});