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
            const task = action.payload
            // Find the current project's index
            const projectIndex = state.projects.findIndex(project => project.id === state.current.id);
            const tasks = (state.projects[projectIndex].tasks) ? (state.projects[projectIndex].tasks) : [task]
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
            // state.projects[projectIndex].tasks = (state.projects[projectIndex].tasks) ? [...state.projects[projectIndex].tasks, action.payload] : [action.payload];
            // state.projects[projectID].tasks = [...state.projects[projectID].tasks, action.payload]
        },
        TOGGLE_TASKS: (state) => {
            const current = state.showTasks;
            state.showTasks = !current;
        },
        // Current Project Handlers
        SET_CURRENT_PROJECT: (state, action) => {
            state.current = action.payload;
        },
        CLEAR_CURRENT_PROJECT: (state) => {
            state.current = null;
        }
    }
});

export const { ADD_PROJECT, SET_PROJECTS, TOGGLE_TASKS, SET_TASKS, ADD_TASK, DELETE_PROJECT, SET_CURRENT_PROJECT, CLEAR_CURRENT_PROJECT } = projectSlice.actions;
export default projectSlice.reducer;