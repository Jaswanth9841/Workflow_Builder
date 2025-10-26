# Quick Start Guide

## Project Description

This is a visual workflow builder application that allows users to design and validate data pipelines through a drag-and-drop interface. Built with React and FastAPI, it provides an intuitive canvas where you can create nodes (input, output, LLM, transformers, filters, etc.), connect them together, and validate whether your workflow forms a valid Directed Acyclic Graph (DAG). The application includes project management features to save and load your workflows, dark mode support, auto-arrange functionality, and real-time validation feedback.

## Project Structure

## Backend Setup & Start

### Requirements
- Python 3.8+

### Steps

1. Navigate to backend directory:
```bash
cd backend-20251024T101128Z-1-001/backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the FastAPI server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will run on: http://localhost:8000

### Backend API Endpoints

- `GET /` - Health check (returns "Ping": "Pong")
- `POST /pipelines/parse` - Validate pipeline
  - Input: `{ "nodes": [...], "edges": [...] }`
  - Output: `{ "num_nodes": int, "num_edges": int, "is_dag": bool }`

### Main Backend Files

**main.py** - FastAPI application with CORS middleware and pipeline validation
- `is_dag()` - Validates if pipeline is a DAG using Kahn's algorithm
- `parse_pipeline()` - Endpoint to analyze pipeline structure

## Frontend Setup & Start

### Requirements
- Node.js 14+
- npm or yarn

### Steps

1. Navigate to frontend directory:
```bash
cd frontend-20251024T101111Z-1-001/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will run on: http://localhost:3000

### Main Frontend Files

**App.js** - Application entry point with providers (Redux, Theme, Snackbar)

**ui.js** - Main UI component orchestrating the workflow builder
- State management for nodes, edges, projects
- Auto-arrange algorithm for node layout
- Canvas reset, node addition, project management
- Pipeline submission to backend

**store.js** - Zustand store for real-time node/edge state
- Node ID generation
- Node/edge CRUD operations
- Connection validation

**submit.js** - Pipeline submission component
- Sends nodes/edges to backend for validation
- Displays DAG validation results

**Canvas.js** - ReactFlow canvas wrapper
- Drag & drop support
- Minimap and controls
- Grid snapping
- Connection handling

**components/** - Reusable UI components
- Header: App branding and navigation
- ControlBar: Pipeline actions (submit, arrange, reset, save)
- NodesSidebar: Available node types
- ProjectsSidebar: Project management (save/load/delete)

**nodes/** - Node type implementations
- BaseNode: Shared node component logic
- Specific nodes (input, output, LLM, text, transform, filter, API, database, aggregator)

**redux/** - Redux state management
- store.js: Redux store with redux-persist
- projectsSlice.js: Project CRUD operations with localStorage persistence

## Usage

1. Start backend server (port 8000)
2. Start frontend server (port 3000)
3. Open http://localhost:3000 in browser
4. Drag nodes from left sidebar to canvas
5. Connect nodes by dragging from output handles to input handles
6. Click "Submit" to validate pipeline as DAG
7. Use "Auto Arrange" to organize nodes
8. Save projects using the save button in control bar

## Features

- Visual workflow builder with ReactFlow
- 9 different node types
- Project persistence (save/load/delete)
- DAG validation via backend
- Auto-arrange layout algorithm
- Dark mode support
- Real-time notifications
- Drag & drop node creation
- Multiple handle connections per node

