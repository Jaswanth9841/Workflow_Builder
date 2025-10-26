// helpers.js
// Central repository for all utility/helper functions
// --------------------------------------------------

import { RANDOM_OFFSET_RANGE, NODE_LABELS } from './constants';

// ============ NODE HELPERS ============

/**
 * Get the display label for a node type
 * @param {string} nodeType - The node type identifier
 * @returns {string} - The display label
 */
export const getNodeLabel = (nodeType) => {
  return NODE_LABELS[nodeType] || nodeType;
};

/**
 * Generate a random offset for node positioning
 * @returns {Object} - Object with x and y offsets
 */
export const getRandomOffset = () => {
  return {
    x: (Math.random() - 0.5) * RANDOM_OFFSET_RANGE,
    y: (Math.random() - 0.5) * RANDOM_OFFSET_RANGE,
  };
};

/**
 * Calculate the center position of the current viewport
 * @param {Object} reactFlowBounds - The bounding client rect of ReactFlow wrapper
 * @param {Object} viewport - Current viewport state
 * @returns {Object} - Center position {x, y}
 */
export const getViewportCenter = (reactFlowBounds, viewport) => {
  const centerX = (reactFlowBounds.width / 2 - viewport.x) / viewport.zoom;
  const centerY = (reactFlowBounds.height / 2 - viewport.y) / viewport.zoom;
  return { x: centerX, y: centerY };
};

/**
 * Initialize node data with default values
 * @param {string} nodeID - Node identifier
 * @param {string} type - Node type
 * @returns {Object} - Initial node data
 */
export const getInitNodeData = (nodeID, type) => {
  return { 
    id: nodeID, 
    nodeType: type 
  };
};

// ============ GRAPH ALGORITHMS ============

/**
 * Build adjacency map and incoming edges count for nodes
 * @param {Array} nodes - Array of nodes
 * @param {Array} edges - Array of edges
 * @returns {Object} - Object with adjacencyMap and incomingCount
 */
export const buildGraphStructure = (nodes, edges) => {
  const adjacencyMap = new Map();
  const incomingCount = new Map();
  
  // Initialize all nodes
  nodes.forEach(node => {
    adjacencyMap.set(node.id, []);
    incomingCount.set(node.id, 0);
  });
  
  // Build graph structure
  edges.forEach(edge => {
    adjacencyMap.get(edge.source).push(edge.target);
    incomingCount.set(edge.target, incomingCount.get(edge.target) + 1);
  });
  
  return { adjacencyMap, incomingCount };
};

/**
 * Find root nodes (nodes with no incoming edges)
 * @param {Array} nodes - Array of nodes
 * @param {Map} incomingCount - Map of incoming edge counts
 * @returns {Array} - Array of root nodes
 */
export const findRootNodes = (nodes, incomingCount) => {
  return nodes.filter(node => incomingCount.get(node.id) === 0);
};

/**
 * Perform topological sort using Kahn's algorithm
 * @param {Array} nodes - Array of nodes
 * @param {Map} adjacencyMap - Adjacency map
 * @param {Map} incomingCount - Incoming edge count map
 * @returns {Map} - Map of node levels
 */
export const topologicalSort = (nodes, adjacencyMap, incomingCount) => {
  const levels = new Map();
  const queue = [];
  const tempIncomingCount = new Map(incomingCount);
  
  // Find root nodes and initialize queue
  const rootNodes = findRootNodes(nodes, incomingCount);
  rootNodes.forEach(node => queue.push({ id: node.id, level: 0 }));
  
  // If no root nodes exist (all nodes in cycles), start with first node
  if (queue.length === 0 && nodes.length > 0) {
    queue.push({ id: nodes[0].id, level: 0 });
    tempIncomingCount.set(nodes[0].id, 0);
  }
  
  // BFS with proper queue handling
  let queueIndex = 0;
  while (queueIndex < queue.length) {
    const { id, level } = queue[queueIndex++];
    
    // Skip if already processed at a better level
    if (levels.has(id) && levels.get(id) <= level) continue;
    
    levels.set(id, level);
    
    // Process children
    const children = adjacencyMap.get(id) || [];
    children.forEach(childId => {
      const newCount = tempIncomingCount.get(childId) - 1;
      tempIncomingCount.set(childId, newCount);
      
      // Add to queue when all incoming edges processed
      if (newCount <= 0) {
        queue.push({ id: childId, level: level + 1 });
      }
    });
  }
  
  // Handle any remaining unvisited nodes (disconnected components)
  nodes.forEach(node => {
    if (!levels.has(node.id)) {
      levels.set(node.id, 0);
    }
  });
  
  return levels;
};

/**
 * Group nodes by their level
 * @param {Array} nodes - Array of nodes
 * @param {Map} levels - Map of node levels
 * @returns {Map} - Map of level groups
 */
export const groupNodesByLevel = (nodes, levels) => {
  const levelGroups = new Map();
  nodes.forEach(node => {
    const level = levels.get(node.id);
    if (!levelGroups.has(level)) levelGroups.set(level, []);
    levelGroups.get(level).push(node);
  });
  return levelGroups;
};

// ============ LAYOUT CALCULATIONS ============

/**
 * Calculate node positions with vertical centering
 * @param {Map} levelGroups - Map of nodes grouped by level
 * @param {Object} config - Layout configuration
 * @returns {Array} - Array of nodes with calculated positions
 */
export const calculateNodePositions = (levelGroups, config) => {
  const { nodeWidth, nodeHeight, horizontalGap, verticalGap, startX, startY } = config;
  const arrangedNodes = [];
  const maxNodesInLevel = Math.max(...Array.from(levelGroups.values()).map(g => g.length));
  
  levelGroups.forEach((nodesInLevel, level) => {
    const levelHeight = nodesInLevel.length * (nodeHeight + verticalGap);
    const calculatedStartY = startY + (maxNodesInLevel * (nodeHeight + verticalGap) - levelHeight) / 2;
    
    nodesInLevel.forEach((node, index) => {
      arrangedNodes.push({
        ...node,
        position: {
          x: startX + level * (nodeWidth + horizontalGap),
          y: calculatedStartY + index * (nodeHeight + verticalGap),
        },
      });
    });
  });
  
  return arrangedNodes;
};

// ============ API HELPERS ============

/**
 * Submit pipeline data to backend
 * @param {Array} nodes - Array of nodes
 * @param {Array} edges - Array of edges
 * @param {string} apiUrl - API endpoint URL
 * @returns {Promise} - API response
 */
export const submitPipeline = async (nodes, edges, apiUrl) => {
  const pipelineData = {
    nodes: nodes,
    edges: edges
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pipelineData)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// ============ STRING FORMATTERS ============

/**
 * Format pipeline analysis result message
 * @param {Object} result - Pipeline analysis result
 * @returns {string} - Formatted message
 */
export const formatPipelineResult = (result) => {
  return `
Pipeline Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━

📊 Number of Nodes: ${result.num_nodes}
🔗 Number of Edges: ${result.num_edges}
${result.is_dag ? '✅' : '❌'} Is Valid DAG: ${result.is_dag ? 'Yes' : 'No'}

${result.is_dag 
    ? '✓ Your pipeline is a valid Directed Acyclic Graph!' 
    : '✗ Warning: Your pipeline contains cycles or is not a valid DAG.'}
  `.trim();
};

/**
 * Format notification message for node addition
 * @param {string} nodeType - Node type
 * @returns {string} - Formatted message
 */
export const formatNodeAddedMessage = (nodeType) => {
  const label = getNodeLabel(nodeType);
  return `✨ ${label} node added!`;
};

/**
 * Format notification message for canvas clear
 * @param {number} nodeCount - Number of nodes
 * @param {number} edgeCount - Number of edges
 * @returns {string} - Formatted message
 */
export const formatCanvasClearedMessage = (nodeCount, edgeCount) => {
  return `🗑️ Canvas cleared! Removed ${nodeCount} nodes and ${edgeCount} connections`;
};

// ============ VALIDATION HELPERS ============

/**
 * Check if canvas is empty
 * @param {Array} nodes - Array of nodes
 * @param {Array} edges - Array of edges
 * @returns {boolean} - True if canvas is empty
 */
export const isCanvasEmpty = (nodes, edges) => {
  return nodes.length === 0 && edges.length === 0;
};

/**
 * Check if project has content
 * @param {Array} nodes - Array of nodes
 * @param {Array} edges - Array of edges
 * @returns {boolean} - True if project has content
 */
export const hasProjectContent = (nodes, edges) => {
  return nodes.length > 0 || edges.length > 0;
};

// ============ ARRAY HELPERS ============

/**
 * Create remove changes for all nodes
 * @param {Array} nodes - Array of nodes
 * @returns {Array} - Array of remove changes
 */
export const createNodeRemoveChanges = (nodes) => {
  return nodes.map(node => ({ type: 'remove', id: node.id }));
};

/**
 * Create remove changes for all edges
 * @param {Array} edges - Array of edges
 * @returns {Array} - Array of remove changes
 */
export const createEdgeRemoveChanges = (edges) => {
  return edges.map(edge => ({ type: 'remove', id: edge.id }));
};

/**
 * Create position changes for nodes
 * @param {Array} nodes - Array of nodes with positions
 * @returns {Array} - Array of position changes
 */
export const createNodePositionChanges = (nodes) => {
  return nodes.map((node) => ({
    id: node.id,
    type: 'position',
    position: node.position,
  }));
};

// ============ DRAG & DROP HELPERS ============

/**
 * Parse dragged node data
 * @param {Event} event - Drag event
 * @returns {string|null} - Node type or null
 */
export const parseDraggedNodeType = (event) => {
  if (!event?.dataTransfer?.getData('application/reactflow')) {
    return null;
  }
  
  const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
  return appData?.nodeType || null;
};

// ============ DATE/TIME HELPERS ============

/**
 * Get current timestamp
 * @returns {number} - Current timestamp in milliseconds
 */
export const getCurrentTimestamp = () => {
  return Date.now();
};

/**
 * Format date to readable string
 * @param {number} timestamp - Timestamp in milliseconds
 * @returns {string} - Formatted date string
 */
export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

// ============ DEBOUNCE HELPER ============

/**
 * Create a debounced function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

