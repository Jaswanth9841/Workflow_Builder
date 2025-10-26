// projectsSlice.js - Redux slice for managing projects
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  currentProject: {
    id: null,
    name: 'Untitled Workflow',
    nodes: [],
    edges: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Save current project
    saveProject: (state) => {
      const existingIndex = state.projects.findIndex(p => p.id === state.currentProject.id);
      const projectToSave = {
        ...state.currentProject,
        updatedAt: new Date().toISOString(),
      };

      if (existingIndex !== -1) {
        // Update existing project
        state.projects[existingIndex] = projectToSave;
      } else {
        // Create new project with unique ID
        const newProject = {
          ...projectToSave,
          id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        };
        state.projects.unshift(newProject);
        state.currentProject.id = newProject.id;
      }
    },

    // Load a project
    loadProject: (state, action) => {
      const project = state.projects.find(p => p.id === action.payload);
      if (project) {
        state.currentProject = { ...project };
      }
    },

    // Delete a project
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
      // If deleted current project, create new one
      if (state.currentProject.id === action.payload) {
        state.currentProject = {
          id: null,
          name: 'Untitled Workflow',
          nodes: [],
          edges: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // Update current project name
    updateProjectName: (state, action) => {
      state.currentProject.name = action.payload;
      state.currentProject.updatedAt = new Date().toISOString();
    },

    // Update current project nodes and edges
    updateProjectData: (state, action) => {
      state.currentProject.nodes = action.payload.nodes;
      state.currentProject.edges = action.payload.edges;
      state.currentProject.updatedAt = new Date().toISOString();
    },

    // Clear all projects
    clearAllProjects: (state) => {
      state.projects = [];
      state.currentProject = {
        id: null,
        name: 'Untitled Workflow 1',
        nodes: [],
        edges: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    },

    // Create new project
    createNewProject: (state) => {
      // Auto-save current project if it has content
      if (state.currentProject.id && (state.currentProject.nodes.length > 0 || state.currentProject.edges.length > 0)) {
        const existingIndex = state.projects.findIndex(p => p.id === state.currentProject.id);
        const projectToSave = {
          ...state.currentProject,
          updatedAt: new Date().toISOString(),
        };

        if (existingIndex !== -1) {
          state.projects[existingIndex] = projectToSave;
        } else {
          state.projects.unshift(projectToSave);
        }
      }

      // Generate unique workflow name with incremental suffix
      const baseNamePattern = /^Untitled Workflow (\d+)$/;
      const existingNumbers = state.projects
        .map(p => p.name)
        .filter(name => baseNamePattern.test(name))
        .map(name => {
          const match = name.match(baseNamePattern);
          return match[1] ? parseInt(match[1], 10) : 0;
        });
      
      // Find the next available number (handles gaps in sequence)
      let nextNumber = 1;
      if (existingNumbers.length > 0) {
        const sortedNumbers = [...existingNumbers].sort((a, b) => a - b);
        // Find first gap in sequence, or use max + 1
        for (let i = 1; i <= sortedNumbers[sortedNumbers.length - 1] + 1; i++) {
          if (!sortedNumbers.includes(i)) {
            nextNumber = i;
            break;
          }
        }
        if (nextNumber === 1) {
          nextNumber = Math.max(...existingNumbers) + 1;
        }
      }
      
      const newName = `Untitled Workflow ${nextNumber}`;
      
      // Generate unique ID for new project immediately
      const newProjectId = `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create new empty project with ID
      const newProject = {
        id: newProjectId,
        name: newName,
        nodes: [],
        edges: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Add to projects list immediately (even if empty)
      state.projects.unshift(newProject);
      
      // Set as current project
      state.currentProject = newProject;
    },
  },
});

export const {
  saveProject,
  loadProject,
  deleteProject,
  updateProjectName,
  updateProjectData,
  createNewProject,
  clearAllProjects,
} = projectsSlice.actions;

export default projectsSlice.reducer;

