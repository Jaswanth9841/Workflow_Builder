// ControlBar.js - Control buttons and actions bar
import { useState } from 'react';

export const ControlBar = ({ 
  autoArrangeNodes, 
  resetCanvas, 
  showNodeToolbar,
  setShowNodeToolbar,
  showMinimap,
  setShowMinimap,
  showProjects,
  setShowProjects,
  projectName,
  onProjectNameChange,
  onSaveProject,
  onNewProject,
  nodes, 
  edges, 
  handleSubmit 
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(projectName);

  const handleNameEdit = () => {
    if (isEditingName) {
      onProjectNameChange(tempName);
      onSaveProject();
    } else {
      setTempName(projectName);
    }
    setIsEditingName(!isEditingName);
  };

  const handleBlur = (e) => {
    // Prevent blur from interfering with button click
    if (e.relatedTarget && e.relatedTarget.closest('button')) {
      return;
    }
    if (isEditingName) {
      onProjectNameChange(tempName);
      onSaveProject();
      setIsEditingName(false);
    }
  };

  const handleToggleSidebar = (view) => {
    if (view === 'nodes') {
      setShowProjects(false);
      setShowNodeToolbar(true);
    } else if (view === 'projects') {
      setShowProjects(true);
      setShowNodeToolbar(true);
    } else {
      // Toggle sidebar visibility
      setShowNodeToolbar(!showNodeToolbar);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between shadow-sm transition-colors duration-300">
      {/* Left Section - Navigation & Actions */}
      <div className="flex items-center gap-2">
        {/* Sidebar Toggle Button */}
        <button 
          onClick={() => handleToggleSidebar('toggle')} 
          className="px-3 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all flex items-center gap-1 hover:scale-105"
          title={showNodeToolbar ? "Hide Sidebar" : "Show Sidebar"}
        >
          <span className="text-base">{showNodeToolbar ? '◀' : '▶'}</span>
        </button>

        {/* Sidebar View Selector - Only show when sidebar is visible */}
        {showNodeToolbar && (
          <>
            <button 
              onClick={() => handleToggleSidebar('nodes')} 
              className={`
                px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200
                ${!showProjects
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md hover:shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
                flex items-center gap-2 hover:scale-105
              `}
              title="Show Nodes"
            >
              <span className="text-base">📦</span>
              <span>Nodes</span>
            </button>

            <button 
              onClick={() => handleToggleSidebar('projects')} 
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 hover:scale-105 hover:shadow-md
                ${showProjects 
                  ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700 shadow-md' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
              title="Show My Projects"
            >
              <span className="text-base">📂</span>
              <span>Projects</span>
            </button>
          </>
        )}

        {/* Separator */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-1"></div>

        {/* Action Buttons with Innovative Styling */}
        <button 
          onClick={autoArrangeNodes} 
          className="px-4 py-2 text-sm font-medium bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-400 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-800/40 dark:hover:to-teal-800/40 rounded-lg transition-all flex items-center gap-2 border border-emerald-200 dark:border-emerald-700 hover:scale-105 hover:shadow-md" 
          title="Arrange nodes"
        >
          <span className="text-base">⚡</span>
          <span>Auto-Arrange</span>
        </button>
        
        <button 
          onClick={resetCanvas} 
          className="px-4 py-2 text-sm font-medium bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30 text-sky-700 dark:text-sky-400 hover:from-sky-100 hover:to-blue-100 dark:hover:from-sky-800/40 dark:hover:to-blue-800/40 rounded-lg transition-all flex items-center gap-2 border border-sky-200 dark:border-sky-700 hover:scale-105 hover:shadow-md" 
          title="Reset canvas"
        >
          <span className="text-base">🔄</span>
          <span>Reset</span>
        </button>
        
        <button 
          onClick={() => setShowMinimap(!showMinimap)} 
          className={`
            px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 hover:scale-105 hover:shadow-md
            ${showMinimap 
              ? 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 text-violet-700 dark:text-violet-400 hover:from-violet-100 hover:to-purple-100 dark:hover:from-violet-800/40 dark:hover:to-purple-800/40 border border-violet-200 dark:border-violet-700' 
              : 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/30 dark:to-slate-900/30 text-gray-600 dark:text-gray-400 hover:from-gray-100 hover:to-slate-100 dark:hover:from-gray-800/40 dark:hover:to-slate-800/40 border border-gray-200 dark:border-gray-700'
            }
          `}
          title={showMinimap ? "Hide Minimap" : "Show Minimap"}
        >
          <span className="text-base">🗺️</span>
          <span>{showMinimap ? 'Hide' : 'Show'} Map</span>
        </button>
      </div>

      {/* Center Section - Project Name & New Button */}
      <div className="flex items-center gap-2">
        {/* Project Name with Edit */}
        <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border-2 border-indigo-200 dark:border-indigo-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors shadow-sm">
          {isEditingName ? (
            <input 
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNameEdit()}
              onBlur={handleBlur}
              className="w-64 px-3 py-1.5 text-sm font-semibold bg-white dark:bg-gray-700 border-2 border-indigo-400 dark:border-indigo-500 rounded text-indigo-700 dark:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              autoFocus
              maxLength={50}
            />
          ) : (
            <div className="w-64 px-3 py-1.5 text-sm font-semibold text-indigo-700 dark:text-indigo-300 truncate bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded border border-indigo-100 dark:border-indigo-800">
              {projectName}
            </div>
          )}
          <button
            onClick={handleNameEdit}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors text-lg hover:scale-110"
            title={isEditingName ? "Save name" : "Edit name"}
          >
            {isEditingName ? '✓' : '✏️'}
          </button>
        </div>

        {/* New Project Button */}
        <button
          onClick={onNewProject}
          className="group relative px-4 py-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 active:scale-95 flex items-center gap-2"
          title="Create new project (auto-saves current)"
        >
          <span className="text-base group-hover:rotate-90 transition-transform duration-300">✨</span>
          <span>New</span>
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </button>
      </div>
      
      {/* Right Section - Stats & Submit */}
      <div className="flex items-center gap-3">
      
        {/* Stats Badge */}
        <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold border border-blue-200 dark:border-blue-700">
          <span className="opacity-75">Nodes:</span> <span className="font-bold">{nodes.length}</span>
          <span className="mx-2 opacity-50">|</span>
          <span className="opacity-75">Edges:</span> <span className="font-bold">{edges.length}</span>
        </div>

        {/* Submit Button with Premium Styling */}
        <button 
          onClick={handleSubmit} 
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 border border-blue-500" 
          title="Submit workflow"
        >
          <span className="text-base">🚀</span>
          <span>Submit Workflow</span>
        </button>
      </div>
    </div>
  );
};

