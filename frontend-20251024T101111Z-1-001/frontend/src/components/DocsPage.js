// DocsPage.js - Documentation and Creator Info
import { useTheme } from '../context/ThemeContext';

export const DocsPage = ({ onClose }) => {
  const { isDark } = useTheme();

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 overflow-y-auto transition-colors duration-300">
      {/* Header with back button */}
      <div 
        className="px-6 py-4 flex items-center justify-between transition-all duration-300 sticky top-0 z-10"
        style={{
          background: isDark ? 'linear-gradient(to right, #1f2937, #374151)' : 'linear-gradient(to right, #6D28D9, #C026D3)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
            title="Back to Workflow"
          >
            <span className="text-2xl">←</span>
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">📚 Documentation</h1>
            <p className="text-sm font-semibold text-white/90 dark:text-gray-300">Application Guide & Creator Info</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        
        {/* Application Flow Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🚀</span>
            <span>Mini Workflow Builder</span>
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3">📋 Overview</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Mini Workflow Builder is a powerful visual workflow design tool that allows you to create, 
                connect, and validate complex data pipelines. Built with React and ReactFlow, it provides 
                an intuitive drag-and-drop interface for building sophisticated node-based workflows.
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">🎯 Key Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Multiple Node Types</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Input, Output, Text (with dynamic variables), LLM, API, Transform, Filter, Database, Aggregator</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📝</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Dynamic Text Node</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Auto-resizing + dynamic handles for {`{{variables}}`} with edge cleanup</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🖱️</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">One-Click Node Adding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click any node to instantly add it to top-left corner</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💾</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Auto-Save Projects</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Every change automatically saved to Redux + LocalStorage</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📂</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Project Management</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Save, load, search, and delete unlimited projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">◀▶</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Smart Sidebar Toggle</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Hide/show sidebar, switch between Nodes and Projects views</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Smart Auto-Arrange</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Hierarchical layout based on connections + auto-arrange on load</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🗺️</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Minimap Navigation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Toggle color-coded minimap for canvas overview</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🌗</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Dark/Light Mode</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Seamless theme switching with localStorage persistence</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">DAG Validation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Real-time validation if pipeline is a valid Directed Acyclic Graph</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✏️</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Inline Name Editing</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Edit project names directly with fixed-width input (max 50 chars)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">🔄 Application Flow</h3>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Start a Project</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Begin with "Untitled Workflow" or click "➕ New" button to create fresh project</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Name Your Project</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click ✏️ to edit project name (fixed 256px width, max 50 chars)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Add Nodes</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click any node type to add at top-left corner (auto-stacked)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Configure & Connect</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fill node properties and drag connections. Use {`{{variable}}`} in Text nodes for dynamic handles</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">5</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Auto-Arrange (Optional)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click ⚡ to arrange nodes hierarchically based on connections</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">6</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Auto-Save</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Project auto-saves every 1 second + when creating new or loading projects</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">7</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Submit & Validate</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click 🚀 Submit to validate if workflow is a valid DAG</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">⌨️ Actions & Controls</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Add Node</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm font-mono">Click Node</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Delete Node</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm font-mono">Hover Header + X</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Delete Connection</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm font-mono">Hover Edge + X</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Toggle Sidebar</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm font-mono">◀ / ▶ Button</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Switch to Nodes View</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm font-mono">📦 Nodes</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Switch to Projects</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm font-mono">📂 Projects</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Edit Project Name</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm font-mono">✏️ Button</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Create New Project</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm font-mono">➕ New</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Pan Canvas</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm font-mono">Click + Drag</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Zoom In/Out</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm font-mono">Scroll Wheel</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Add Variable to Text</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm font-mono">{`{{name}}`}</kbd>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Connect to Variable</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm font-mono">Drag to Labeled Handle</kbd>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">📝 Text Node - Dynamic Variables</h3>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-6 space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The Text node is a powerful component that supports dynamic variables and auto-resizing:
                </p>
                
                <div className="space-y-3">
                  <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">🔤 Variable Syntax</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Use double curly braces to define variables: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">{`{{variableName}}`}</code>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                      Example: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{`Hello {{firstName}} {{lastName}}!`}</code>
                    </p>
                  </div>

                  <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">🔌 Dynamic Handles</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Each variable automatically creates a labeled handle on the left side. Connect other nodes to these handles to pass data.
                    </p>
                  </div>

                  <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">📏 Auto-Resize</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      The node automatically adjusts width (250-700px) and height based on text content. Type multiple lines or long text to see it grow!
                    </p>
                  </div>

                  <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">🗑️ Smart Edge Cleanup</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      When you delete a variable from the text, its handle and any connected edges are automatically removed.
                    </p>
                  </div>

                  <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">✅ Variable Rules</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      • Must start with letter, underscore, or $ <br/>
                      • Can contain letters, numbers, underscores, $ <br/>
                      • Duplicates are automatically merged <br/>
                      • Invalid syntax like {`{{123abc}}`} is ignored
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">💡 Pro Tips</h3>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Auto-Save is Always On</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Changes are saved automatically every 1 second - no manual save needed!</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Smart Project Switching</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Current project auto-saves when loading another or creating new</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Auto-Arrange on Load</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Projects automatically arrange when loaded for perfect organization</p>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Efficient Sidebar Navigation</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Use ◀ to hide sidebar for more canvas space, then ▶ to show again</p>
                </div>
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border-l-4 border-teal-500">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Text Node Variables</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Use {`{{variable}}`} syntax in Text nodes to create dynamic connection points with labeled handles</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creator Info Section */}
        <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 dark:from-purple-800 dark:to-fuchsia-800 rounded-2xl shadow-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">👨‍💻</span>
            <span>About the Creator</span>
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold mb-2">Jaswanth N</h3>
              <p className="text-purple-100 mb-6">React Developer</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="font-semibold">Experience</p>
                    <p className="text-purple-100">3.5+ years in professional React development</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="font-semibold">Expertise</p>
                    <p className="text-purple-100">React.js • JavaScript • HTML5 • CSS3 • UI/UX Design</p>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4 mt-4">
                  <p className="font-semibold mb-3">📫 Contact Information</p>
                  <div className="space-y-2">
                    <a 
                      href="mailto:Jaswanth9841@gmail.com" 
                      className="flex items-center gap-2 text-purple-100 hover:text-white transition-colors group"
                    >
                      <span className="text-xl">📧</span>
                      <span className="group-hover:underline">Jaswanth9841@gmail.com</span>
                    </a>
                    <a 
                      href="tel:+919551344553" 
                      className="flex items-center gap-2 text-purple-100 hover:text-white transition-colors group"
                    >
                      <span className="text-xl">📱</span>
                      <span className="group-hover:underline">+91 9551344553</span>
                    </a>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4 mt-4">
                  <p className="font-semibold mb-2">🎯 Objective</p>
                  <p className="text-purple-100 leading-relaxed">
                    Passionate about creating exceptional user experiences through clean, 
                    maintainable code and modern design principles. Specialized in building 
                    scalable React applications with focus on performance and user satisfaction.
                  </p>
                </div>
              </div>
            </div>

             <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4">🛠️ Technical Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'ReactFlow', 'Redux Toolkit', 'REST APIs'].map(skill => (
                  <div key={skill} className="bg-white/10 rounded-lg px-3 py-2 text-center text-sm font-medium backdrop-blur-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 dark:text-gray-400 pb-8">
          <p className="text-sm">Built with ❤️ using React, ReactFlow, and Tailwind CSS</p>
          <p className="text-xs mt-2">© 2025 Jaswanth N. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

