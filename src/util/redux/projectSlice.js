import { createSlice } from '@reduxjs/toolkit';

export const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        current: null,
        showTasks: false,
        projects: [],
        tasks: [],
    },
    reducers: {
        // Projects Array Handlers
        ADD_PROJECT: (state, action) => {
            state.projects = [...state.projects, action.payload];
        },
        SET_PROJECTS: (state, action) => {
            state.projects = action.payload;
        },
        DELETE_PROJECT: (state, action) => {
            // delete project
            const projectID = action.payload.id;
            const updatedProjects = state.projects.filter(
                (project) => project.id !== projectID
            );
            state.projects = updatedProjects;
        },
        SET_TASKS: (state, action) => {
            // Assuming action.payload is an array of tasks
            const tasks = action.payload;

            // Find the current project's index
            const projectIndex = state.projects.findIndex(project => project.id === state.current.id);

            if (projectIndex !== -1) {
                // Create a new project object with the updated tasks array
                const updatedProject = {
                    ...state.projects[projectIndex],
                    tasks: tasks,
                };

                // Create a new projects array with the updated project
                state.projects = [
                    ...state.projects.slice(0, projectIndex),
                    updatedProject,
                    ...state.projects.slice(projectIndex + 1),
                ];
            }
        },
        ADD_TASK: (state, action) => {
            const task = action.payload;
        
            // Find the current project's index
            const projectIndex = state.projects.findIndex(project => project.id === state.current.id);
        
            if (projectIndex !== -1) {
                // Create a new project object with the updated tasks array
                const updatedProject = {
                    ...state.projects[projectIndex],
                    tasks: [...state.projects[projectIndex].tasks, task], // Add the new task
                };
        
                // Create a new projects array with the updated project
                state.projects = [
                    ...state.projects.slice(0, projectIndex),
                    updatedProject,
                    ...state.projects.slice(projectIndex + 1),
                ];
        
                // Update the current project to the updated one
                state.current = updatedProject;
            }
        },
        GET_TASKS: (state) => {
            // Find the current project's index
            const projectIndex = state.projects.findIndex(project => project.id === state.current.id);

            if (projectIndex !== -1) {
                return state.projects[projectIndex].tasks;
            } else {
                return -1;
            }
        },      
        TOGGLE_TASKS: (state) => {
            const current = state.showTasks;
            state.showTasks = !current;
        },
        // Current Project Handlers
        SET_CURRENT_PROJECT: (state, action) => {
            const projectId = action.payload.id;
            // Find the project with the matching ID
            const matchingProject = state.projects.find(project => project.id === projectId);
            // Set the current project to the matching project or null if not found
            state.current = matchingProject || null;
        },
        // SET_CURRENT_PROJECT: (state, action) => {
        //     state.current = action.payload;
        // },
        CLEAR_CURRENT_PROJECT: (state) => {
            state.current = null;
        }
    }
});

export const { ADD_PROJECT, SET_PROJECTS, TOGGLE_TASKS, SET_TASKS, GET_TASKS, ADD_TASK, DELETE_PROJECT, SET_CURRENT_PROJECT, CLEAR_CURRENT_PROJECT } = projectSlice.actions;
export default projectSlice.reducer;