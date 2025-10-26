import { useState, useRef, useCallback, useEffect } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useSelector, useDispatch } from 'react-redux';
import { updateProjectData, updateProjectName, saveProject, createNewProject } from './redux/projectsSlice';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { TransformNode } from './nodes/transformNode';
import { FilterNode } from './nodes/filterNode';
import { APINode } from './nodes/apiNode';
import { DatabaseNode } from './nodes/databaseNode';
import { AggregatorNode } from './nodes/aggregatorNode';
import { CustomEdge } from './customEdge';
import { useStore as useReactFlowStore } from './store';

import { Header } from './components/Header';
import { ControlBar } from './components/ControlBar';
import { NodesSidebar } from './components/NodesSidebar';
import { Canvas } from './components/Canvas';
import { DocsPage } from './components/DocsPage';
import { ProjectsSidebar } from './components/ProjectsSidebar';

import { useSnackbar } from 'notistack';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  transform: TransformNode,
  filter: FilterNode,
  api: APINode,
  database: DatabaseNode,
  aggregator: AggregatorNode,
};

const edgeTypes = {
  default: CustomEdge,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [showNodeToolbar, setShowNodeToolbar] = useState(true);
    const [showMinimap, setShowMinimap] = useState(true);
    const [showDocs, setShowDocs] = useState(false);
    const [showProjects, setShowProjects] = useState(false);
    
    const dispatch = useDispatch();
    const currentProject = useSelector(state => state.projects.currentProject);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange: originalOnNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const isBulkOperation = useRef(false);

    const onNodesChange = useCallback((changes) => {
      const deleteChanges = changes.filter(change => change.type === 'remove');
      if (deleteChanges.length === 1 && !isBulkOperation.current) {
        enqueueSnackbar('🗑️ Node deleted', { variant: 'info' });
      }
      originalOnNodesChange(changes);
    }, [originalOnNodesChange, enqueueSnackbar]);

    useEffect(() => {
      window.reactFlowStore = useStore;
    }, []);

    useEffect(() => {
      if (nodes.length > 0 || edges.length > 0) {
        const timer = setTimeout(() => {
          dispatch(updateProjectData({ nodes, edges }));
        }, 300);
        
        return () => clearTimeout(timer);
      }
    }, [nodes, edges, dispatch]);

    useEffect(() => {
      const handleBeforeUnload = () => {
        if (nodes.length > 0 || edges.length > 0) {
          dispatch(updateProjectData({ nodes, edges }));
          dispatch(saveProject());
        }
      };

      const handleVisibilityChange = () => {
        if (document.hidden && (nodes.length > 0 || edges.length > 0)) {
          dispatch(updateProjectData({ nodes, edges }));
          dispatch(saveProject());
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, [nodes, edges, dispatch]);

    const prevProjectIdRef = useRef(null);
    const isLoadingProjectRef = useRef(false);
    
    useEffect(() => {
      if (currentProject.id && 
          currentProject.id !== prevProjectIdRef.current &&
          !isLoadingProjectRef.current &&
          (currentProject.nodes.length > 0 || currentProject.edges.length > 0)) {
        
        prevProjectIdRef.current = currentProject.id;
        isLoadingProjectRef.current = true;
        
        if (nodes.length > 0) {
          onNodesChange(nodes.map(node => ({ type: 'remove', id: node.id })));
        }
        if (edges.length > 0) {
          onEdgesChange(edges.map(edge => ({ type: 'remove', id: edge.id })));
        }
        
        setTimeout(() => {
          currentProject.nodes.forEach(node => addNode(node));
          
          setTimeout(() => {
            currentProject.edges.forEach(edge => {
              onEdgesChange([{
                type: 'add',
                item: edge
              }]);
            });
            
            setTimeout(() => {
              if (reactFlowInstance) {
                autoArrangeNodes();
              }
              isLoadingProjectRef.current = false;
            }, 300);
          }, 200);
        }, 100);
      }
    }, [currentProject.id]);

    const autoArrangeNodes = useCallback(() => {
      if (!nodes.length || !reactFlowInstance) return;
      
      const nodeWidth = 250;
      const nodeHeight = 150;
      const horizontalGap = 200;
      const verticalGap = 100;
      
      if (edges.length === 0) {
        const nodeTypePriority = {
          'customInput': 1,
          'text': 2,
          'api': 3,
          'database': 3,
          'llm': 4,
          'transform': 5,
          'filter': 5,
          'aggregator': 6,
          'customOutput': 7,
        };
        
        const sortedNodes = [...nodes].sort((a, b) => {
          const priorityA = nodeTypePriority[a.type] || 99;
          const priorityB = nodeTypePriority[b.type] || 99;
          return priorityA - priorityB;
        });
        
        const columnsPerRow = 4;
        const arrangedNodes = sortedNodes.map((node, index) => {
          const row = Math.floor(index / columnsPerRow);
          const col = index % columnsPerRow;
          
          return {
            ...node,
            position: {
              x: 100 + col * (nodeWidth + horizontalGap),
              y: 100 + row * (nodeHeight + verticalGap),
            },
          };
        });
        
        onNodesChange(
          arrangedNodes.map((node) => ({
            id: node.id,
            type: 'position',
            position: node.position,
          }))
        );

        setTimeout(() => {
          reactFlowInstance.fitView({ 
            padding: 0.2, 
            duration: 800,
            maxZoom: 1.5 
          });
        }, 50);
        
        return;
      }
      
      const adjacencyMap = new Map();
      const incomingCount = new Map();
      
      nodes.forEach(node => {
        adjacencyMap.set(node.id, []);
        incomingCount.set(node.id, 0);
      });
      
      edges.forEach(edge => {
        if (adjacencyMap.has(edge.source) && adjacencyMap.has(edge.target)) {
          adjacencyMap.get(edge.source).push(edge.target);
          incomingCount.set(edge.target, incomingCount.get(edge.target) + 1);
        }
      });
      
      const connectedNodeIds = new Set();
      edges.forEach(edge => {
        connectedNodeIds.add(edge.source);
        connectedNodeIds.add(edge.target);
      });
      
      const connectedNodes = nodes.filter(node => connectedNodeIds.has(node.id));
      const disconnectedNodes = nodes.filter(node => !connectedNodeIds.has(node.id));
      
      const rootNodes = connectedNodes.filter(node => incomingCount.get(node.id) === 0);
      
      const levels = new Map();
      const queue = [];
      const tempIncomingCount = new Map(incomingCount);
      
      rootNodes.forEach(node => queue.push({ id: node.id, level: 0 }));
      
      if (queue.length === 0 && connectedNodes.length > 0) {
        queue.push({ id: connectedNodes[0].id, level: 0 });
        tempIncomingCount.set(connectedNodes[0].id, 0);
      }
      
      let queueIndex = 0;
      while (queueIndex < queue.length) {
        const { id, level } = queue[queueIndex++];
        
        if (levels.has(id) && levels.get(id) <= level) continue;
        
        levels.set(id, level);
        
        const children = adjacencyMap.get(id) || [];
        children.forEach(childId => {
          const newCount = tempIncomingCount.get(childId) - 1;
          tempIncomingCount.set(childId, newCount);
          
          if (newCount <= 0) {
            queue.push({ id: childId, level: level + 1 });
          }
        });
      }
      
      connectedNodes.forEach(node => {
        if (!levels.has(node.id)) {
          levels.set(node.id, 0);
        }
      });
      
      const levelGroups = new Map();
      connectedNodes.forEach(node => {
        const level = levels.get(node.id);
        if (!levelGroups.has(level)) levelGroups.set(level, []);
        levelGroups.get(level).push(node);
      });
      
      const arrangedNodes = [];
      const maxNodesInLevel = Math.max(...Array.from(levelGroups.values()).map(g => g.length));
      
      let maxYPosition = 0;
      
      levelGroups.forEach((nodesInLevel, level) => {
        const levelHeight = nodesInLevel.length * (nodeHeight + verticalGap);
        const startY = 100 + (maxNodesInLevel * (nodeHeight + verticalGap) - levelHeight) / 2;
        
        nodesInLevel.forEach((node, index) => {
          const yPos = startY + index * (nodeHeight + verticalGap);
          arrangedNodes.push({
            ...node,
            position: {
              x: 100 + level * (nodeWidth + horizontalGap),
              y: yPos,
            },
          });
          maxYPosition = Math.max(maxYPosition, yPos);
        });
      });
      
      if (disconnectedNodes.length > 0) {
        const nodeTypePriority = {
          'customInput': 1,
          'text': 2,
          'api': 3,
          'database': 3,
          'llm': 4,
          'transform': 5,
          'filter': 5,
          'aggregator': 6,
          'customOutput': 7,
        };
        
        const sortedDisconnectedNodes = [...disconnectedNodes].sort((a, b) => {
          const priorityA = nodeTypePriority[a.type] || 99;
          const priorityB = nodeTypePriority[b.type] || 99;
          return priorityA - priorityB;
        });
        
        const columnsPerRow = 4;
        const startYForDisconnected = maxYPosition + nodeHeight + verticalGap * 2;
        
        sortedDisconnectedNodes.forEach((node, index) => {
          const row = Math.floor(index / columnsPerRow);
          const col = index % columnsPerRow;
          
          arrangedNodes.push({
            ...node,
            position: {
              x: 100 + col * (nodeWidth + horizontalGap),
              y: startYForDisconnected + row * (nodeHeight + verticalGap),
            },
          });
        });
      }
      
      onNodesChange(
        arrangedNodes.map((node) => ({
          id: node.id,
          type: 'position',
          position: node.position,
        }))
      );

      setTimeout(() => {
        reactFlowInstance.fitView({ 
          padding: 0.2, 
          duration: 800,
          maxZoom: 1.5 
        });
      }, 50);
    }, [nodes, edges, onNodesChange, reactFlowInstance]);

    const resetCanvas = useCallback(() => {
      const nodeCount = nodes.length;
      const edgeCount = edges.length;
      
      if (nodeCount === 0 && edgeCount === 0) {
        enqueueSnackbar('Canvas is already empty!', { variant: 'info' });
        return;
      }
      
      const snackbarKey = enqueueSnackbar(
        <div>
          <strong>⚠️ Clear all nodes and connections?</strong>
          <p style={{ fontSize: '0.9em', marginTop: '8px' }}>This will remove {nodeCount} nodes and {edgeCount} connections.</p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                isBulkOperation.current = true;
                onNodesChange(nodes.map(node => ({ type: 'remove', id: node.id })));
                onEdgesChange(edges.map(edge => ({ type: 'remove', id: edge.id })));
                isBulkOperation.current = false;
                closeSnackbar(snackbarKey);
                enqueueSnackbar(`🗑️ Canvas cleared! Removed ${nodeCount} nodes and ${edgeCount} connections`, {
                  variant: 'success',
                });
              }}
              style={{
                padding: '6px 16px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.875rem'
              }}
            >
              Clear All
            </button>
            <button
              onClick={() => closeSnackbar(snackbarKey)}
              style={{
                padding: '6px 16px',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.875rem'
              }}
            >
              Cancel
            </button>
          </div>
        </div>,
        {
          variant: 'warning',
          persist: true,
        }
      );
    }, [nodes, edges, onNodesChange, onEdgesChange, enqueueSnackbar, closeSnackbar]);

    const addNodeOnClick = useCallback((nodeType) => {
      if (!reactFlowInstance) return;

      const viewport = reactFlowInstance.getViewport();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      
      const centerX = (reactFlowBounds.width / 2 - viewport.x) / viewport.zoom;
      const centerY = (reactFlowBounds.height / 2 - viewport.y) / viewport.zoom;
      
      const randomOffsetX = (Math.random() - 0.5) * 40;
      const randomOffsetY = (Math.random() - 0.5) * 40;

      const nodeID = getNodeID(nodeType);
      const newNode = {
        id: nodeID,
        type: nodeType,
        position: {
          x: centerX + randomOffsetX,
          y: centerY + randomOffsetY,
        },
        data: { id: nodeID, nodeType: `${nodeType}` },
      };

      addNode(newNode);
      
      const nodeLabels = {
        customInput: 'Input',
        llm: 'LLM',
        customOutput: 'Output',
        text: 'Text',
        transform: 'Transform',
        filter: 'Filter',
        api: 'API',
        database: 'Database',
        aggregator: 'Aggregator'
      };
      const nodeLabel = nodeLabels[nodeType] || nodeType;
      
      enqueueSnackbar(`✨ ${nodeLabel} node added!`, { variant: 'success' });
    }, [reactFlowInstance, reactFlowWrapper, getNodeID, addNode, enqueueSnackbar]);

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

            if (result.is_dag) {
              enqueueSnackbar(`✅ Pipeline validated! ${result.num_nodes} nodes, ${result.num_edges} edges - Valid DAG`, {
                variant: 'success',
                autoHideDuration: 4000,
              });
            } else {
              enqueueSnackbar(`❌ Pipeline contains cycles! ${result.num_nodes} nodes, ${result.num_edges} edges - Not a DAG`, {
                variant: 'error',
                autoHideDuration: 5000,
              });
            }
            alert(message);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            enqueueSnackbar(`🚫 Failed to submit pipeline: ${error.message}`, {
              variant: 'error',
              autoHideDuration: 4000,
            });
            alert(`Error: Failed to submit pipeline.\n${error.message}`);
        }
    };

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // Handle new project creation
    const handleNewProject = useCallback(() => {
      // If current project is empty, ask for confirmation
      if (nodes.length === 0 && edges.length === 0) {
        const confirmKey = enqueueSnackbar(
          <div style={{ 
            padding: '4px',
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            borderRadius: '8px',
            border: '1px solid #d1d5db'
          }}>
            <div style={{ padding: '12px' }}>
              <strong style={{ color: '#374151', fontSize: '0.95rem' }}>💡 Current project is empty</strong>
              <p style={{ fontSize: '0.85em', marginTop: '6px', color: '#6b7280' }}>Do you want to create a new project or continue with this one?</p>
              <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    closeSnackbar(confirmKey);
                    // Proceed with creating new project
                    dispatch(createNewProject());
                    enqueueSnackbar('🎉 New project created! Start building your workflow', { variant: 'success' });
                  }}
                  style={{
                    padding: '8px 18px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)',
                    transition: 'transform 0.1s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Create New
                </button>
                <button
                  onClick={() => closeSnackbar(confirmKey)}
                  style={{
                    padding: '8px 18px',
                    background: '#f3f4f6',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.1s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#e5e7eb';
                    e.target.style.borderColor = '#9ca3af';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#f3f4f6';
                    e.target.style.borderColor = '#d1d5db';
                  }}
                >
                  Continue Here
                </button>
              </div>
            </div>
          </div>,
          {
            variant: 'default',
            persist: true,
            style: {
              background: 'transparent',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            }
          }
        );
        return;
      }
      
      // Current project has content, save it before creating new one
      if (nodes.length > 0 || edges.length > 0) {
        dispatch(saveProject());
      }
      
      dispatch(createNewProject());
      
      // Clear canvas (bulk operation)
      isBulkOperation.current = true;
      onNodesChange(nodes.map(node => ({ type: 'remove', id: node.id })));
      onEdgesChange(edges.map(edge => ({ type: 'remove', id: edge.id })));
      isBulkOperation.current = false;
      
      enqueueSnackbar('🎉 New project created! Start building your workflow', { variant: 'success' });
    }, [dispatch, nodes, edges, onNodesChange, onEdgesChange, enqueueSnackbar, closeSnackbar]);

    // Handle project load
    const handleLoadProject = useCallback((projectId) => {
      // Save current project before loading another
      if (nodes.length > 0 || edges.length > 0) {
        dispatch(saveProject());
      }
      
      enqueueSnackbar('📂 Project loaded successfully!', { 
        variant: 'info',
        autoHideDuration: 2500,
      });
      
      // Switch back to nodes view
      setShowProjects(false);
      setShowNodeToolbar(true);
    }, [nodes, edges, dispatch, enqueueSnackbar]);

    // Handle project deletion (clear canvas if active project deleted)
    const handleDeleteProject = useCallback(() => {
      // Clear canvas when active project is deleted
      isBulkOperation.current = true;
      onNodesChange(nodes.map(node => ({ type: 'remove', id: node.id })));
      onEdgesChange(edges.map(edge => ({ type: 'remove', id: edge.id })));
      isBulkOperation.current = false;
      
      enqueueSnackbar('🗑️ Active project deleted and canvas cleared', { 
        variant: 'warning',
        autoHideDuration: 3000,
      });
    }, [nodes, edges, onNodesChange, onEdgesChange, enqueueSnackbar]);

    // If showing docs, render docs component
    if (showDocs) {
      return <DocsPage onClose={() => setShowDocs(false)} />;
    }

    return (
        <div className="h-screen flex flex-col">
        {/* Header Component */}
        <Header 
          onDocsClick={() => setShowDocs(true)}
        />

        {/* Control Bar Component */}
        <ControlBar 
            autoArrangeNodes={autoArrangeNodes}
            resetCanvas={resetCanvas}
            showNodeToolbar={showNodeToolbar}
            setShowNodeToolbar={setShowNodeToolbar}
            showMinimap={showMinimap}
            setShowMinimap={setShowMinimap}
            showProjects={showProjects}
            setShowProjects={setShowProjects}
            projectName={currentProject.name}
            onProjectNameChange={(name) => dispatch(updateProjectName(name))}
            onSaveProject={() => dispatch(saveProject())}
            onNewProject={handleNewProject}
            nodes={nodes}
            edges={edges}
            handleSubmit={handleSubmit}
        />

        {/* Two-Column Layout with Card-based Design */}
        <div className="flex h-[calc(100vh-140px)] bg-gray-100 dark:bg-gray-900 px-2 transition-colors duration-300">
            {/* Left Sidebar - Nodes or Projects Panel */}
            {showNodeToolbar && !showProjects && (
              <NodesSidebar 
                addNodeOnClick={addNodeOnClick}
              />
            )}
            {showNodeToolbar && showProjects && (
              <ProjectsSidebar 
                onLoadProject={handleLoadProject}
                onDeleteProject={handleDeleteProject}
              />
            )}

            {/* Main Canvas */}
            <Canvas 
              reactFlowWrapper={reactFlowWrapper}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onInit={setReactFlowInstance}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              gridSize={gridSize}
              showMinimap={showMinimap}
            />
        </div>
        </div>
    )
}
