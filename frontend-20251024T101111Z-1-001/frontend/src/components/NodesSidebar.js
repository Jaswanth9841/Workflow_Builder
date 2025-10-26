// NodesSidebar.js - Left sidebar with node categories
import { useState } from 'react';

export const NodesSidebar = ({ addNodeOnClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const basicNodes = [
    { type: 'customInput', label: 'Input', icon: '🌱' },
    { type: 'text', label: 'Text', icon: '📝' },
    { type: 'customOutput', label: 'Output', icon: '🎯' },
  ];

  const aiToolNodes = [
    { type: 'llm', label: 'LLM', icon: '🤖' },
    { type: 'api', label: 'HTTP Request', icon: '🌐' },
    { type: 'transform', label: 'Transform', icon: '⚡' },
    { type: 'filter', label: 'Filter', icon: '🔍' },
    { type: 'database', label: 'Database', icon: '🗄️' },
    { type: 'aggregator', label: 'Aggregator', icon: '📊' },
  ];

  // Filter nodes based on search query
  const filterNodes = (nodes) => {
    if (!searchQuery.trim()) return nodes;
    return nodes.filter(node => 
      node.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredBasicNodes = filterNodes(basicNodes);
  const filteredAiToolNodes = filterNodes(aiToolNodes);

  return (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col m-4 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Nodes</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search nodes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 pl-9 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {/* Show message if no results */}
        {searchQuery && filteredBasicNodes.length === 0 && filteredAiToolNodes.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-sm">No nodes found for "{searchQuery}"</p>
          </div>
        )}

        {/* BASICS Section */}
        {filteredBasicNodes.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">BASICS</h3>
            <div className="space-y-2">
              {filteredBasicNodes.map((node) => (
                <div 
                  key={node.type}
                  onClick={() => addNodeOnClick(node.type)}
                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-all hover:scale-102 hover:shadow-md"
                >
                  <span>{node.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{node.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* AI / TOOLS Section */}
        {filteredAiToolNodes.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">AI / TOOLS</h3>
            <div className="space-y-2">
              {filteredAiToolNodes.map((node) => (
                <div 
                  key={node.type}
                  onClick={() => addNodeOnClick(node.type)}
                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-all hover:scale-102 hover:shadow-md"
                >
                  <span>{node.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{node.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

