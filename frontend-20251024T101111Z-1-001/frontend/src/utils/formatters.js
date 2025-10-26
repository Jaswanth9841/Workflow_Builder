// formatters.js
// Formatting utilities for consistent UI rendering across components
// --------------------------------------------------

import { COLORS, GRADIENTS, NODE_ICONS, ANIMATION_DURATION } from './constants';

// ============ STYLE FORMATTERS ============

/**
 * Generate button style object with gradient background
 * @param {string} fromColor - Starting gradient color
 * @param {string} toColor - Ending gradient color
 * @param {Object} options - Additional style options
 * @returns {Object} - Style object
 */
export const formatButtonGradientStyle = (fromColor, toColor, options = {}) => {
  return {
    background: `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 100%)`,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: `all ${ANIMATION_DURATION.BUTTON_HOVER} ease`,
    ...options,
  };
};

/**
 * Format node gradient style based on node type
 * @param {string} gradientKey - Key from GRADIENTS constant
 * @param {Object} additionalStyles - Additional styles to merge
 * @returns {Object} - Style object
 */
export const formatNodeGradientStyle = (gradientKey, additionalStyles = {}) => {
  return {
    background: GRADIENTS[gradientKey] || GRADIENTS.PURPLE,
    ...additionalStyles,
  };
};

/**
 * Format handle style for inputs/outputs
 * @param {string} type - 'input' or 'output'
 * @param {Object} customStyle - Custom style overrides
 * @returns {Object} - Style object
 */
export const formatHandleStyle = (type = 'input', customStyle = {}) => {
  const baseColor = type === 'input' ? '#48bb78' : '#4299e1';
  return {
    background: baseColor,
    width: '12px',
    height: '12px',
    border: '2px solid #ffffff',
    ...customStyle,
  };
};

/**
 * Format edge style with hover state
 * @param {boolean} isHovered - Whether edge is hovered
 * @returns {Object} - Style object
 */
export const formatEdgeStyle = (isHovered = false) => {
  return {
    strokeWidth: isHovered ? 4 : 3,
    stroke: isHovered ? COLORS.PRIMARY : '#2d3748',
    transition: `all ${ANIMATION_DURATION.HOVER} ease`,
  };
};

// ============ CLASS NAME FORMATTERS ============

/**
 * Format button className with variants
 * @param {string} variant - Button variant (primary, success, danger, etc.)
 * @param {boolean} isActive - Whether button is active
 * @param {string} additionalClasses - Additional CSS classes
 * @returns {string} - Formatted className
 */
export const formatButtonClassName = (variant = 'default', isActive = false, additionalClasses = '') => {
  const baseClasses = 'px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 hover:scale-105 hover:shadow-md';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md hover:shadow-lg',
    success: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600',
    info: 'bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-700',
    default: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
  };
  
  const activeClasses = isActive ? 'ring-2 ring-offset-2 ring-purple-500' : '';
  
  return `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${activeClasses} ${additionalClasses}`.trim();
};

/**
 * Format card className with theme support
 * @param {string} size - Card size (sm, md, lg)
 * @param {string} additionalClasses - Additional CSS classes
 * @returns {string} - Formatted className
 */
export const formatCardClassName = (size = 'md', additionalClasses = '') => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300';
  
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  return `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${additionalClasses}`.trim();
};

/**
 * Format input field className
 * @param {boolean} hasError - Whether input has error
 * @param {string} size - Input size (sm, md, lg)
 * @returns {string} - Formatted className
 */
export const formatInputClassName = (hasError = false, size = 'md') => {
  const baseClasses = 'rounded-md border bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 transition-colors';
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base',
  };
  
  const errorClasses = hasError 
    ? 'border-red-500 focus:ring-red-500' 
    : 'border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500';
  
  return `${baseClasses} ${sizeClasses[size]} ${errorClasses}`.trim();
};

// ============ CONTENT FORMATTERS ============

/**
 * Format node title with icon
 * @param {string} nodeType - Node type
 * @param {string} title - Node title
 * @returns {string} - Formatted title with icon
 */
export const formatNodeTitle = (nodeType, title) => {
  const icon = NODE_ICONS[nodeType] || '📦';
  return `${icon} ${title}`;
};

/**
 * Format notification message with emoji
 * @param {string} message - Message text
 * @param {string} emoji - Emoji to prepend
 * @returns {string} - Formatted message
 */
export const formatNotificationMessage = (message, emoji = '') => {
  return emoji ? `${emoji} ${message}` : message;
};

/**
 * Format count display (e.g., "5 nodes, 3 edges")
 * @param {number} nodeCount - Number of nodes
 * @param {number} edgeCount - Number of edges
 * @returns {string} - Formatted count string
 */
export const formatCountDisplay = (nodeCount, edgeCount) => {
  const nodePlural = nodeCount === 1 ? 'node' : 'nodes';
  const edgePlural = edgeCount === 1 ? 'edge' : 'edges';
  return `${nodeCount} ${nodePlural}, ${edgeCount} ${edgePlural}`;
};

/**
 * Format project name with fallback
 * @param {string} name - Project name
 * @param {string} fallback - Fallback name
 * @returns {string} - Formatted project name
 */
export const formatProjectName = (name, fallback = 'Untitled Project') => {
  return name?.trim() || fallback;
};

// ============ DATA FORMATTERS ============

/**
 * Format node data for API submission
 * @param {Array} nodes - Array of nodes
 * @returns {Array} - Formatted nodes
 */
export const formatNodesForAPI = (nodes) => {
  return nodes.map(node => ({
    id: node.id,
    type: node.type,
    position: node.position,
    data: node.data,
  }));
};

/**
 * Format edge data for API submission
 * @param {Array} edges - Array of edges
 * @returns {Array} - Formatted edges
 */
export const formatEdgesForAPI = (edges) => {
  return edges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle,
  }));
};

/**
 * Format pipeline data for submission
 * @param {Array} nodes - Array of nodes
 * @param {Array} edges - Array of edges
 * @returns {Object} - Formatted pipeline data
 */
export const formatPipelineData = (nodes, edges) => {
  return {
    nodes: formatNodesForAPI(nodes),
    edges: formatEdgesForAPI(edges),
  };
};

// ============ ANIMATION FORMATTERS ============

/**
 * Format transition style
 * @param {string} property - CSS property to animate
 * @param {string} duration - Animation duration
 * @param {string} easing - Easing function
 * @returns {string} - Formatted transition string
 */
export const formatTransition = (property = 'all', duration = '0.2s', easing = 'ease') => {
  return `${property} ${duration} ${easing}`;
};

/**
 * Format hover scale transform
 * @param {number} scale - Scale value
 * @returns {Object} - Transform style object
 */
export const formatHoverScale = (scale = 1.05) => {
  return {
    transform: `scale(${scale})`,
    transition: formatTransition('transform'),
  };
};

// ============ RESPONSIVE FORMATTERS ============

/**
 * Format grid columns based on screen size
 * @param {string} size - Screen size (sm, md, lg, xl)
 * @returns {string} - Grid columns className
 */
export const formatGridColumns = (size = 'md') => {
  const gridMap = {
    sm: 'grid-cols-1',
    md: 'grid-cols-2',
    lg: 'grid-cols-3',
    xl: 'grid-cols-4',
  };
  return gridMap[size] || gridMap.md;
};

// ============ VALIDATION FORMATTERS ============

/**
 * Format error message for display
 * @param {string} error - Error message
 * @returns {string} - Formatted error message
 */
export const formatErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  return 'An unknown error occurred';
};

/**
 * Format validation feedback
 * @param {boolean} isValid - Whether value is valid
 * @param {string} validMessage - Message for valid state
 * @param {string} invalidMessage - Message for invalid state
 * @returns {Object} - Validation feedback object
 */
export const formatValidationFeedback = (isValid, validMessage = 'Valid', invalidMessage = 'Invalid') => {
  return {
    isValid,
    message: isValid ? validMessage : invalidMessage,
    className: isValid ? 'text-green-600' : 'text-red-600',
    icon: isValid ? '✓' : '✗',
  };
};

// ============ NUMBER FORMATTERS ============

/**
 * Format large numbers with K/M suffix
 * @param {number} num - Number to format
 * @returns {string} - Formatted number string
 */
export const formatLargeNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Format percentage
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted percentage string
 */
export const formatPercentage = (value, decimals = 0) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

// ============ TIME FORMATTERS ============

/**
 * Format time duration in milliseconds to readable string
 * @param {number} ms - Duration in milliseconds
 * @returns {string} - Formatted duration string
 */
export const formatDuration = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
};

/**
 * Format timestamp to relative time (e.g., "2 hours ago")
 * @param {number} timestamp - Timestamp in milliseconds
 * @returns {string} - Relative time string
 */
export const formatRelativeTime = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
};

