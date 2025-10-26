// ProjectsSidebar.js - Sidebar showing saved projects
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadProject, deleteProject, clearAllProjects } from '../redux/projectsSlice';
import { useSnackbar } from 'notistack';

export const ProjectsSidebar = ({ onLoadProject, onDeleteProject }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const projects = useSelector(state => state.projects.projects);
  const currentProjectId = useSelector(state => state.projects.currentProject.id);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Filter projects based on search query
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLoadProject = (projectId) => {
    if (projectId !== currentProjectId) {
      dispatch(loadProject(projectId));
      onLoadProject(projectId);
    } else {
      // If clicking already loaded project, just switch to nodes view
      onLoadProject(projectId);
    }
  };

  const handleDeleteProject = (projectId, e) => {
    e.stopPropagation();
    const isActiveProject = projectId === currentProjectId;
    dispatch(deleteProject(projectId));
    
    enqueueSnackbar('🗑️ Project deleted', { variant: 'success' });
    
    // If deleting active project, notify parent to clear canvas
    if (isActiveProject && onDeleteProject) {
      onDeleteProject();
    }
  };

  const handleClearAll = () => {
    if (projects.length === 0) {
      enqueueSnackbar('No projects to clear', { variant: 'info' });
      return;
    }
    
    const count = projects.length;
    dispatch(clearAllProjects());
    onDeleteProject(); // Clear canvas
    enqueueSnackbar(`🗑️ Cleared ${count} project${count > 1 ? 's' : ''}`, { 
      variant: 'warning',
      autoHideDuration: 3000,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col m-4 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">My Projects</h2>
          {projects.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3 py-1 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all hover:scale-105 shadow-sm"
              title="Clear all projects"
            >
              🗑️ Clear All
            </button>
          )}
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search projects..." 
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
        {filteredProjects.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">📁</div>
            <p className="text-sm">
              {projects.length === 0 
                ? 'No saved projects yet' 
                : `No projects found for "${searchQuery}"`}
            </p>
            <p className="text-xs mt-2">Create your first workflow!</p>
          </div>
        )}

        <div className="space-y-2">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => handleLoadProject(project.id)}
              className={`
                group relative p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md
                ${currentProjectId === project.id
                  ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-400 dark:border-purple-500'
                  : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600'
                }
              `}
            >
              {/* Delete button */}
              <button
                onClick={(e) => handleDeleteProject(project.id, e)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                title="Delete project"
              >
                ✕
              </button>

              <div className="pr-8">
                <div className="flex items-center gap-2 mb-1">
                  {currentProjectId === project.id && (
                    <span className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full text-white text-xs font-bold animate-pulse" title="Currently Loaded">
                      ✓
                    </span>
                  )}
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 truncate flex-1">
                    {project.name}
                  </h3>
                  {currentProjectId === project.id && (
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded-full whitespace-nowrap">
                      Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <span>📦</span>
                    <span>{project.nodes.length} nodes</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>🔗</span>
                    <span>{project.edges.length} edges</span>
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Updated: {formatDate(project.updatedAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

