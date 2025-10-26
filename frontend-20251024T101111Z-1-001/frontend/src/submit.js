import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            const pipelineData = {
                nodes: nodes,
                edges: edges
            };

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Display results in a user-friendly alert
            const message = `
Pipeline Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━

📊 Number of Nodes: ${result.num_nodes}
🔗 Number of Edges: ${result.num_edges}
${result.is_dag ? '✅' : '❌'} Is Valid DAG: ${result.is_dag ? 'Yes' : 'No'}

${result.is_dag 
    ? '✓ Your pipeline is a valid Directed Acyclic Graph!' 
    : '✗ Warning: Your pipeline contains cycles or is not a valid DAG.'}
            `.trim();

            alert(message);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error: Failed to submit pipeline.\n${error.message}`);
        }
    };

    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px',
            gap: '10px'
        }}>
            <button 
                type="button"
                onClick={handleSubmit}
                style={{
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}
                onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
            >
                🚀 Submit Workflow
            </button>
            <div style={{
                fontSize: '12px',
                color: '#718096',
                maxWidth: '300px',
                textAlign: 'center'
            }}>
                Click to analyze your pipeline structure
            </div>
        </div>
    );
}
