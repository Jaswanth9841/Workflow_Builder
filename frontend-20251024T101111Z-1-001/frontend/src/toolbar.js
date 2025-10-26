// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ 
            padding: '15px 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderBottom: '2px solid #5a67d8',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <div style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '12px',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}>
                🚀 VectorShift Pipeline Builder
            </div>
            <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='aggregator' label='Aggregator' />
            </div>
        </div>
    );
};
