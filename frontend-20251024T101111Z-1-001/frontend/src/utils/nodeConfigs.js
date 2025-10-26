// nodeConfigs.js
// Configuration for all node types in the workflow builder
// --------------------------------------------------

import { Position } from 'reactflow';
import { GRADIENTS, NODE_TYPES_CONFIG, NODE_LABELS, NODE_ICONS } from './constants';

// ============ NODE TYPE CONFIGURATIONS ============

/**
 * Base configuration template for nodes
 */
const baseNodeConfig = {
  minWidth: 200,
  minHeight: 80,
  draggable: true,
  selectable: true,
  deletable: true,
};

/**
 * Input/Output handle configurations
 */
export const handleConfigs = {
  singleInput: [
    {
      id: 'input',
      position: Position.Left,
      style: { background: '#48bb78' },
    }
  ],
  singleOutput: [
    {
      id: 'output',
      position: Position.Right,
      style: { background: '#4299e1' },
    }
  ],
  dualInput: [
    {
      id: 'input-1',
      position: Position.Left,
      top: '33%',
      style: { background: '#48bb78' },
    },
    {
      id: 'input-2',
      position: Position.Left,
      top: '66%',
      style: { background: '#48bb78' },
    }
  ],
  dualOutput: [
    {
      id: 'output-1',
      position: Position.Right,
      top: '33%',
      style: { background: '#4299e1' },
    },
    {
      id: 'output-2',
      position: Position.Right,
      top: '66%',
      style: { background: '#4299e1' },
    }
  ],
  multipleInputs: (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `input-${i + 1}`,
      position: Position.Left,
      top: `${((i + 1) * 100) / (count + 1)}%`,
      style: { background: '#48bb78' },
    }));
  },
  multipleOutputs: (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `output-${i + 1}`,
      position: Position.Right,
      top: `${((i + 1) * 100) / (count + 1)}%`,
      style: { background: '#4299e1' },
    }));
  },
};

/**
 * Individual node type configurations
 */
export const nodeConfigs = {
  [NODE_TYPES_CONFIG.INPUT]: {
    ...baseNodeConfig,
    label: NODE_LABELS[NODE_TYPES_CONFIG.INPUT],
    icon: NODE_ICONS[NODE_TYPES_CONFIG.INPUT],
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%)', // Very dark purple
    inputs: [],
    outputs: handleConfigs.singleOutput,
    description: 'Input node for data ingestion',
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: 'input_',
        placeholder: 'Enter input name',
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'File', 'Number', 'JSON'],
        defaultValue: 'Text',
      }
    ],
  },
  
  [NODE_TYPES_CONFIG.OUTPUT]: {
    ...baseNodeConfig,
    label: NODE_LABELS[NODE_TYPES_CONFIG.OUTPUT],
    icon: NODE_ICONS[NODE_TYPES_CONFIG.OUTPUT],
    gradient: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)', // Very dark red
    inputs: handleConfigs.singleInput,
    outputs: [],
    description: 'Output node for data export',
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: 'output_',
        placeholder: 'Enter output name',
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'File', 'Image'],
        defaultValue: 'Text',
      }
    ],
  },
  
  [NODE_TYPES_CONFIG.LLM]: {
    ...baseNodeConfig,
    label: NODE_LABELS[NODE_TYPES_CONFIG.LLM],
    icon: NODE_ICONS[NODE_TYPES_CONFIG.LLM],
    gradient: 'linear-gradient(135deg, #0e7490 0%, #0f766e 100%)', // Very dark cyan/teal
    inputs: handleConfigs.dualInput,
    outputs: handleConfigs.singleOutput,
    description: 'Large Language Model processing node',
    fields: [
      {
        name: 'modelName',
        label: 'Model',
        type: 'text',
        defaultValue: 'gpt-3.5-turbo',
        placeholder: 'Enter model name',
      }
    ],
  },
  
  [NODE_TYPES_CONFIG.TEXT]: {
    ...baseNodeConfig,
    label: NODE_LABELS[NODE_TYPES_CONFIG.TEXT],
    icon: NODE_ICONS[NODE_TYPES_CONFIG.TEXT],
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', // Very dark blue
    inputs: [],
    outputs: handleConfigs.singleOutput,
    description: 'Text input and manipulation node',
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'textarea',
        defaultValue: '',
        placeholder: 'Enter text content',
        rows: 4,
      }
    ],
  },
  
  [NODE_TYPES_CONFIG.TRANSFORM]: {
    ...baseNodeConfig,
    label: NODE_LABELS[NODE_TYPES_CONFIG.TRANSFORM],
    icon: NODE_ICONS[NODE_TYPES_CONFIG.TRANSFORM],
    gradient: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)', // Very dark red-orange
    inputs: handleConfigs.singleInput,
    outputs: handleConfigs.singleOutput,
    description: 'Transform and process data',
    fields: [
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        options: ['Uppercase', 'Lowercase', 'Trim', 'Replace', 'Extract'],
        defaultValue: 'Uppercase',
      },
      {
        name: 'parameters',
        label: 'Parameters',
        type: 'text',
        defaultValue: '',
        placeholder: 'Operation parameters',
      }
    ],
  },
  
  [NODE_TYPES_CONFIG.FILTER]: {
    ...baseNodeConfig,
    label: NODE_LABELS[NODE_TYPES_CONFIG.FILTER],
    icon: NODE_ICONS[NODE_TYPES_CONFIG.FILTER],
    gradient: 'linear-gradient(135deg, #701a75 0%, #581c87 100%)', // Very dark fuchsia/magenta
    inputs: handleConfigs.singleInput,
    outputs: handleConfigs.dualOutput,
    description: 'Filter and route data based on conditions',
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'text',
        defaultValue: '',
        placeholder: 'Filter condition',
      },
      {
        name: 'operator',
        label: 'Operator',
        type: 'select',
        options: ['equals', 'contains', 'greater_than', 'less_than'],
        defaultValue: 'equals',
      }
    ],
  },
  
  [NODE_TYPES_CONFIG.API]: {
    ...baseNodeConfig,
    label: NODE_LABELS[NODE_TYPES_CONFIG.API],
    icon: NODE_ICONS[NODE_TYPES_CONFIG.API],
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', // Very dark blue
    inputs: handleConfigs.singleInput,
    outputs: handleConfigs.singleOutput,
    description: 'Make API calls and handle responses',
    fields: [
      {
        name: 'endpoint',
        label: 'Endpoint',
        type: 'text',
        defaultValue: '',
        placeholder: 'https://api.example.com/endpoint',
      },
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        defaultValue: 'GET',
      },
      {
        name: 'headers',
        label: 'Headers',
        type: 'textarea',
        defaultValue: '{}',
        placeholder: 'JSON headers',
        rows: 2,
      }
    ],
  },
  
  [NODE_TYPES_CONFIG.DATABASE]: {
    ...baseNodeConfig,
    label: NODE_LABELS[NODE_TYPES_CONFIG.DATABASE],
    icon: NODE_ICONS[NODE_TYPES_CONFIG.DATABASE],
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%)', // Very dark purple/violet
    inputs: handleConfigs.singleInput,
    outputs: handleConfigs.singleOutput,
    description: 'Database operations and queries',
    fields: [
      {
        name: 'query',
        label: 'Query',
        type: 'textarea',
        defaultValue: 'SELECT * FROM table',
        placeholder: 'SQL query',
        rows: 3,
      },
      {
        name: 'database',
        label: 'Database',
        type: 'select',
        options: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'],
        defaultValue: 'PostgreSQL',
      }
    ],
  },
  
  [NODE_TYPES_CONFIG.AGGREGATOR]: {
    ...baseNodeConfig,
    label: NODE_LABELS[NODE_TYPES_CONFIG.AGGREGATOR],
    icon: NODE_ICONS[NODE_TYPES_CONFIG.AGGREGATOR],
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #6b2710 100%)', // Very dark orange
    inputs: handleConfigs.multipleInputs(3),
    outputs: handleConfigs.singleOutput,
    description: 'Aggregate multiple data sources',
    fields: [
      {
        name: 'operation',
        label: 'Aggregation',
        type: 'select',
        options: ['Merge', 'Concat', 'Join', 'Union'],
        defaultValue: 'Merge',
      },
      {
        name: 'separator',
        label: 'Separator',
        type: 'text',
        defaultValue: ', ',
        placeholder: 'Separator for concat',
      }
    ],
  },
};

/**
 * Get node configuration by type
 * @param {string} nodeType - Node type identifier
 * @returns {Object} - Node configuration
 */
export const getNodeConfig = (nodeType) => {
  return nodeConfigs[nodeType] || null;
};

/**
 * Get default field value for a node
 * @param {string} nodeType - Node type identifier
 * @param {string} fieldName - Field name
 * @returns {*} - Default value
 */
export const getDefaultFieldValue = (nodeType, fieldName) => {
  const config = getNodeConfig(nodeType);
  if (!config || !config.fields) return undefined;
  
  const field = config.fields.find(f => f.name === fieldName);
  return field?.defaultValue;
};

/**
 * Get all node types as array
 * @returns {Array} - Array of node type configurations
 */
export const getAllNodeTypes = () => {
  return Object.keys(nodeConfigs).map(key => ({
    type: key,
    ...nodeConfigs[key],
  }));
};

/**
 * Check if node type exists
 * @param {string} nodeType - Node type identifier
 * @returns {boolean} - True if node type exists
 */
export const isValidNodeType = (nodeType) => {
  return nodeType in nodeConfigs;
};

/**
 * Get node color for minimap
 * @param {string} nodeType - Node type identifier
 * @returns {string} - Color code
 */
export const getNodeMinimapColor = (nodeType) => {
  const colorMap = {
    [NODE_TYPES_CONFIG.INPUT]: '#667eea',
    [NODE_TYPES_CONFIG.OUTPUT]: '#f56565',
    [NODE_TYPES_CONFIG.LLM]: '#48bb78',
    [NODE_TYPES_CONFIG.TEXT]: '#4299e1',
    [NODE_TYPES_CONFIG.TRANSFORM]: '#f6ad55',
    [NODE_TYPES_CONFIG.FILTER]: '#9f7aea',
    [NODE_TYPES_CONFIG.API]: '#ed8936',
    [NODE_TYPES_CONFIG.DATABASE]: '#38b2ac',
    [NODE_TYPES_CONFIG.AGGREGATOR]: '#ed64a6',
  };
  return colorMap[nodeType] || '#a0aec0';
};

// ============ NODE CATEGORIES ============

/**
 * Node categories for sidebar organization
 */
export const nodeCategories = {
  IO: {
    label: 'Input / Output',
    icon: '📥📤',
    nodes: [NODE_TYPES_CONFIG.INPUT, NODE_TYPES_CONFIG.OUTPUT],
  },
  PROCESSING: {
    label: 'Processing',
    icon: '⚙️',
    nodes: [NODE_TYPES_CONFIG.TRANSFORM, NODE_TYPES_CONFIG.FILTER, NODE_TYPES_CONFIG.LLM],
  },
  DATA: {
    label: 'Data Sources',
    icon: '💾',
    nodes: [NODE_TYPES_CONFIG.TEXT, NODE_TYPES_CONFIG.DATABASE, NODE_TYPES_CONFIG.API],
  },
  UTILITIES: {
    label: 'Utilities',
    icon: '🔧',
    nodes: [NODE_TYPES_CONFIG.AGGREGATOR],
  },
};

/**
 * Get nodes by category
 * @param {string} category - Category key
 * @returns {Array} - Array of node configurations in category
 */
export const getNodesByCategory = (category) => {
  const categoryData = nodeCategories[category];
  if (!categoryData) return [];
  
  return categoryData.nodes.map(nodeType => ({
    type: nodeType,
    ...nodeConfigs[nodeType],
  }));
};

