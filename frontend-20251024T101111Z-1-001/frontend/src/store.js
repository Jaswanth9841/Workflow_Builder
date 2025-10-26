import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      const edges = get().edges;
      
      const isDuplicate = edges.some(edge => 
        edge.source === connection.source && 
        edge.sourceHandle === connection.sourceHandle &&
        edge.target === connection.target && 
        edge.targetHandle === connection.targetHandle
      );
      
      if (isDuplicate) return;
      
      const edgeId = `${connection.source}${connection.sourceHandle || ''}-${connection.target}${connection.targetHandle || ''}-${Date.now()}`;
      
      const newEdge = {
        ...connection,
        id: edgeId,
        type: 'default', 
        animated: true, 
        style: { stroke: '#2d3748', strokeWidth: 3 },
        markerEnd: {
          type: MarkerType.Arrow, 
          color: '#2d3748',
          width: 20,
          height: 20
        }
      };
      
      set({
        edges: [...edges, newEdge],
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
  }));
